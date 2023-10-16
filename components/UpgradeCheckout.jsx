import { useEffect, useState } from "react";
import { useContext } from "react";

import Image from "next/legacy/image";
import { useRouter } from "next/router";

import { CheckCircleIcon, CheckIcon, XIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

import { CurrencyContext } from "@/hooks/currency";

import { cn } from "@/utils/cn";

import {
  CheckoutSpiritus,
  GetCouponProduct,
  GetLocalizedProducts,
  UPGRADE_SUBSCRIPTION_ACTION,
  UpgradeSpiritus,
} from "../service/http/payment";
import { ImagePath, localFormatDate } from "../service/util";
import {
  CheckmarkIcon,
  DescriptionTextIcon,
  LocationPinIcon,
  TagIcon,
  UserOutlineIcon,
} from "./Icons";
import { SettingsSpiritusIcon } from "./SettingsIcons";
import { Spinner } from "./Status";

/* Stripe checkout for LIFETIME_TRANSFER -> logic is slightly different from regular Checkout.
LIFETIME_TRANSFER is a one-time payment for a single spiritus and is very similar to regular LIFERIME product.
*/
export function UpgradeCheckout({ spiritus, paymentFailed }) {
  const router = useRouter();
  const { t } = useTranslation("paywall", "common", "pricing");
  // context is set from Accessibility menu component
  const { currency } = useContext(CurrencyContext);

  const { data: session, status } = useSession();

  const [displayFailedBanner, setDisplayFailedBanner] = useState(
    paymentFailed || false
  );
  const [serverPaymentErrMsg, setServerPaymentErrMsg] = useState("");

  // pricing related variables
  const [id, setId] = useState("");
  const [price, setPrice] = useState("");

  const [product, setProduct] = useState(null);

  // coupon related variables
  const [fetching, setFetching] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponSubtitle, setCouponSubtitle] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const onChangeCoupon = (data) => {
    setId(data.pkgServerId);
    setPrice(data.price);
    setCouponSubtitle(data.subtitle);
  };

  useEffect(() => {
    if (session && status === "authenticated") {
      setCoupon("");
      // get stripe products
      const getProducts = async () => {
        const { lifetime } = await GetLocalizedProducts(
          session?.user?.accessToken,
          UPGRADE_SUBSCRIPTION_ACTION,
          currency ? currency.toLowerCase() : "usd",
          router.locale || "en"
        );
        setProduct(lifetime);
        setId(lifetime.pkgServerId);
        setPrice(lifetime.price);
      };
      getProducts();
    }
  }, [status, currency]);

  const dates = `${
    spiritus.birth ? localFormatDate(spiritus.birth, router.locale) : "\uE132"
  } — ${
    spiritus.death ? localFormatDate(spiritus.death, router.locale) : "\uE132"
  }`;

  let items = [
    {
      title: `${spiritus.name} ${spiritus.surname}`,
      subtitle: dates,
      icon: <UserOutlineIcon width={8} height={8} />,
    },
    {
      title: spiritus.location?.address ? spiritus.location.address : "",
      subtitle: spiritus.location?.country ? spiritus.location.country : "",
      icon: <LocationPinIcon width={8} height={8} />,
    },
    {
      title: t("common:edit_spiritus_quote"),
      subtitle: spiritus?.description ? spiritus.description : "",
      icon: <DescriptionTextIcon width={8} height={8} />,
    },
  ];

  items = items.filter((item) => item.subtitle);

  useEffect(() => {
    if (!coupon) {
      setIsValid(false);
      setFetching(false);
      setIsInvalid(false);

      if (product) {
        console.log("product", product);
        setId(product.pkgServerId);
        setPrice(product.price);
      }
      return;
    }

    const debounce = setTimeout(async () => {
      setFetching(true);
      try {
        const res = await GetCouponProduct(
          session?.user.accessToken,
          UPGRADE_SUBSCRIPTION_ACTION,
          coupon,
          currency ? currency.toLocaleLowerCase() : "usd",
          router.locale || "en"
        );
        if (res?.data) {
          setIsInvalid(false);
          onChangeCoupon(res.data);
          setIsValid(true);
        } else {
          setIsInvalid(true);
        }
      } catch (e) {
        setIsInvalid(true);
      }

      setFetching(false);
    }, 1000);

    return () => clearTimeout(debounce);
  }, [coupon]);

  // submit payment request
  // scroll to top if payment fails and display the error banner
  const handleSubmit = async (event) => {
    setFetching(true);
    event.preventDefault();
    try {
      const res = await UpgradeSpiritus(
        session?.user.accessToken,
        spiritus.id,
        id,
        coupon,
        router.locale || "en"
      );
      router.push(res.data);
    } catch (err) {
      setServerPaymentErrMsg(
        err?.response?.data ||
          `${t("message_error")} ${t("message_save_failed")}`
      );
      setDisplayFailedBanner(true);
      setFetching(false);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div
      className="mt-8 flex flex-col items-center justify-center px-4 dark:text-sp-white lg:mt-12"
      key="checkout-init-screen"
    >
      {displayFailedBanner && (
        <div className="mb-12 flex w-full max-w-4xl items-start justify-between rounded-xl border border-red-600 bg-gradient-to-r from-day-gradient-start to-day-gradient-stop p-5 shadow dark:bg-gradient-to-r dark:from-sp-dark-brown/80 dark:to-sp-brown/80">
          <div className="w-full">
            <h2 className="font-bold text-xl tracking-tight dark:text-sp-white">
              {t("paywall:payment_failed_title")}
            </h2>
            <p className="text-lg tracking-tight dark:text-sp-white">
              {serverPaymentErrMsg
                ? serverPaymentErrMsg
                : t("paywall:payment_failed_subtitle")}
            </p>
          </div>
          <button onClick={() => setDisplayFailedBanner(false)}>
            <XIcon className="h-6 w-6 text-sp-lighter" />
          </button>
        </div>
      )}
      <div className="flex w-full flex-col items-center justify-center space-y-4">
        <div className="rounded-xl bg-sp-fawn bg-opacity-25 p-2">
          <CheckmarkIcon width={8} height={8} />
        </div>
        <h1 className="font-bold text-3xl">{t("init_payment_title")}</h1>
        {!!spiritus?.profileImage?.url && (
          <div className="overflow-hidden rounded-sp-14">
            <Image
              src={ImagePath(spiritus.profileImage.url)}
              alt="Spiritus image"
              width={192}
              height={220}
              className="rounded-sp-14"
            />
          </div>
        )}
        <div className="mt-5 flex w-full flex-col items-center text-sp-black dark:text-sp-white">
          <ul>
            {items.map((item, index) => (
              <li
                key={`checkout-item-${index}`}
                className="flex items-center p-2.5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                  {item.icon}
                </div>
                <div className="ml-4">
                  <p className="font-semibold dark:text-sp-white">
                    {t(item.title)}
                  </p>
                  <p className="max-w-sm text-sm dark:text-sp-white dark:text-opacity-60">
                    {t(item.subtitle)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {id ? (
        <form
          onSubmit={handleSubmit}
          className="space-y-1.5 px-4 py-12"
          key="init-checkout-form"
        >
          <div
            className="flex justify-between font-semibold text-xl"
            key="checkout-prices"
          >
            <h2>{t("select_payment_plan")}</h2>
          </div>
          {product && <PricingPlan plan={product} />}
          <div className="flex items-start py-2.5">
            <div className="mt-2 flex h-10 w-10 shrink-0 items-center justify-center">
              <TagIcon width={8} height={8} />
            </div>
            <div className="ml-4">
              <div className="w-full">
                <div className="relative">
                  <input
                    value={coupon}
                    onChange={(e) => {
                      setCoupon(e.target.value);
                    }}
                    placeholder={t("create_spiritus_coupon_placeholder")}
                    className={cn(
                      "min-w-[240px] max-w-md appearance-none rounded-md border-2 bg-sp-day-50 p-3 placeholder-gray-500 outline-none dark:bg-sp-black dark:text-sp-white",
                      coupon && isInvalid
                        ? "border-red-400 dark:border-red-700"
                        : "border-sp-lighter/60 dark:border-sp-medium"
                    )}
                  />
                  {!fetching && isValid && (
                    <CheckCircleIcon className="absolute inset-y-4 right-2 h-5 w-5 text-green-600 dark:text-green-400" />
                  )}
                </div>
                {!!couponSubtitle && (
                  <p className="py-0.5 font-medium text-sp-black/70 text-sm tracking-tighter">
                    {couponSubtitle}
                  </p>
                )}
                <p className="h-4 font-medium text-red-400 text-sm dark:text-red-700">
                  {!!isInvalid ? t("create_spiritus_coupon_invalid") : ""}
                </p>
              </div>
            </div>
          </div>
          <div key="finalize-checkout">
            <div
              className="my-2 flex justify-between font-semibold text-xl"
              key="checkout-prices"
            >
              <div>{t("init_payment_total")}</div>
              <div>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: currency,
                }).format(price)}
              </div>
            </div>
            <button
              type="submit"
              disabled={fetching || isInvalid}
              className={`${
                fetching || isInvalid
                  ? "border-sp-lighter/40 text-sp-black/60 dark:text-sp-black/70"
                  : "dark:text-sp-black"
              } w-full rounded-sp-40 border border-sp-lighter px-4 py-3 text-center font-semibold text-xl dark:bg-sp-white`}
              key="submit-button"
            >
              {fetching ? <Spinner /> : t("init_payment_button")}
            </button>
            <p
              className="text-sp-black text-sm dark:text-sp-white dark:text-opacity-60"
              key="redirect-notice"
            >
              {t("init_payment_redirect_notice")}
            </p>
          </div>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <Spinner />
        </div>
      )}
    </div>
  );
}

function PricingPlan({ plan }) {
  return (
    <div className="grid grid-cols-1 items-center">
      <div className="flex max-w-sm flex-col justify-between gap-4 rounded-xl border-2 border-sp-fawn bg-green-200 bg-gradient-to-r from-day-gradient-start to-day-gradient-stop px-4 py-10 dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown">
        <div>
          <p className="mb-2 text-center font-bold text-3xl tracking-tight dark:text-sp-white">
            {plan.title}
          </p>
          <p className="text-md mb-8 text-center font-medium leading-6 tracking-sp-tighten dark:text-sp-white">
            {plan.subtitle}
          </p>
          <ul className="mb-8 flex list-none flex-col justify-center gap-4 px-2 text-sm tracking-sp-tighten dark:text-sp-white">
            {plan.listDescription.map((item, i) => (
              <li className="flex items-center gap-2" key={`${i}-item`}>
                <div className="rounded-full bg-sp-fawn p-0.5">
                  <CheckIcon className="h-3.5 w-3.5 text-sp-white" />
                </div>
                <p className="text-md mb-1 mt-0 px-2 text-[17px] opacity-70 tracking-sp-tighten dark:text-sp-white">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
