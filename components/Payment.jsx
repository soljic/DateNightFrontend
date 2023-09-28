import { useEffect, useState } from "react";

import Image from "next/legacy/image";
import { useRouter } from "next/router";

import { CheckCircleIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

import {
  CheckoutSpiritus,
  ClaimSpiritus,
  GetCouponProduct,
} from "../service/http/payment";
import { ImagePath, localFormatDate } from "../service/util";
import {
  AddPhotosIcon,
  CheckmarkIcon,
  DescriptionTextIcon,
  EnterInfoIcon,
  ForeverBadgeIcon,
  LocationPinIcon,
  PurchaseIcon,
  SpiritusIcon,
  TagIcon,
  UserOutlineIcon,
} from "./Icons";
import { Spinner } from "./Status";

export function Paywall({ price, currency, acceptPaywall }) {
  const { t } = useTranslation("paywall");

  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  });

  const items = [
    {
      title: t("list_elem_1_title"),
      subtitle: t("list_elem_1_subtitle"),
      icon: <EnterInfoIcon width={8} height={8} />,
    },
    {
      title: t("list_elem_2_title"),
      subtitle: t("list_elem_2_subtitle"),
      icon: <AddPhotosIcon width={8} height={8} />,
    },
    {
      title: t("list_elem_3_title"),
      subtitle: t("list_elem_3_subtitle"),
      icon: <PurchaseIcon width={8} height={8} />,
    },
    {
      title: t("list_elem_4_title"),
      subtitle: t("list_elem_4_subtitle"),
      icon: <ForeverBadgeIcon width={8} height={8} />,
    },
  ];

  return (
    <div className="flex h-screen flex-col items-center pt-24">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="rounded-sp-10 bg-gradient-to-r from-day-gradient-start to-day-gradient-stop p-2.5 dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown">
          <SpiritusIcon fill />
        </div>
        <h1 className="text-center font-bold text-sp-black text-2xl dark:text-sp-white">
          {`${t("create_spiritus")} (${priceFormatter.format(price)})`}
        </h1>
        <div className="mx-auto mt-5 flex w-3/4 justify-center text-sp-black dark:text-sp-white">
          <ul className="flex flex-col justify-center">
            {items.map((item) => (
              <li
                key={`pw-item-${item.title}`}
                className="mx-auto flex w-full p-2.5 md:w-4/5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center sm:h-12 sm:w-12">
                  {item.icon}
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-lg dark:text-sp-white">
                    {t(item.title)}
                  </p>
                  <p className="text-sm dark:text-sp-white dark:text-opacity-60">
                    {t(item.subtitle)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => {
            acceptPaywall();
          }}
          className="mt-20 w-80 rounded-sp-40 border border-sp-lighter px-4 py-3 text-center font-semibold"
        >
          {t("start_button")}
        </button>
        <p className="text-sp-black text-sm dark:text-sp-white dark:text-opacity-60">
          {t("start_button_hint")}
        </p>
      </div>
    </div>
  );
}
4;

export function Checkout({
  user,
  spiritus,
  productCurrency,
  productPrice,
  productId,
  isClaim,
}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [fetching, setFetching] = useState(false);

  const [coupon, setCoupon] = useState("");
  const [couponSubtitle, setCouponSubtitle] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const [id, setId] = useState(productId);
  const [price, setPrice] = useState(productPrice);
  const [currency, setCurrency] = useState(productCurrency);

  const { t } = useTranslation("paywall", "common");
  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: productCurrency,
  });

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
    // {
    //   title: t("list_elem_4_title"),
    //   subtitle: t("list_elem_4_subtitle"),
    //   icon: <TagIcon width={8} height={8} />,
    // },
  ];

  items = items.filter((item) => item.subtitle);

  const reset = () => {
    setId(productId);
    setPrice(productPrice);
    setCurrency(productCurrency);
    setCouponSubtitle("");
    setIsValid(false);
  };

  useEffect(() => {
    const debounce = setTimeout(async () => {
      setFetching(true);

      if (!coupon) {
        setFetching(false);
        setIsInvalid(false);
        reset();
        return;
      }

      try {
        const res = await GetCouponProduct(session?.user.accessToken, coupon);
        if (res?.data) {
          setIsInvalid(false);
          setId(res.data.pkgServerId);
          setPrice(res.data.price);
          setCurrency(res.data.currency);
          setCouponSubtitle(res.data.subtitle);
          setIsValid(true);
        } else {
          setIsInvalid(true);
          reset();
        }
      } catch (e) {
        setIsInvalid(true);
        reset();
      }

      setFetching(false);
    }, 1000);

    return () => clearTimeout(debounce);
  }, [coupon]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let res;
    if (isClaim) {
      res = await ClaimSpiritus(
        session?.user.accessToken,
        spiritus.id,
        id,
        coupon
      );
    } else {
      res = await CheckoutSpiritus(
        session?.user.accessToken,
        spiritus.id,
        id,
        coupon
      );
    }
    router.push(res.data);
  };

  return (
    <div
      className="mb-96 flex flex-col items-center justify-center dark:text-sp-white lg:mt-12"
      key="checkout-init-screen"
    >
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
            <li
              key={`checkout-item-coupon`}
              className="flex items-center p-2.5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                <TagIcon width={8} height={8} />
              </div>
              <div className="ml-4">
                <div className="relative">
                  <input
                    value={coupon}
                    onChange={(e) => {
                      setCoupon(e.target.value);
                    }}
                    placeholder={t("create_spiritus_coupon_placeholder")}
                    className={`${
                      coupon && isInvalid
                        ? "border-red-400 dark:border-red-700"
                        : "border-sp-lighter/60 dark:border-sp-medium"
                    } min-w-52 appearance-none rounded-md border-2 bg-sp-day-50  p-3 placeholder-gray-500 outline-none dark:bg-sp-black dark:text-sp-white`}
                  />
                  {!fetching && isValid && (
                    <CheckCircleIcon className="absolute inset-y-4 right-2 h-5 w-5 text-green-600 dark:text-green-400" />
                  )}
                </div>
                {couponSubtitle && (
                  <p className="py-0.5 font-medium text-sp-black/70 text-sm tracking-tighter">
                    {couponSubtitle}
                  </p>
                )}
                {isInvalid && (
                  <p className="font-medium text-red-400 text-sm dark:text-red-700">
                    {t("create_spiritus_coupon_invalid")}
                  </p>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
      {!isInvalid && (
        <form
          // action={`/api/checkout/${spiritus.id}?service=STRIPE&packageId=${productId}`}
          // method="POST"
          onSubmit={handleSubmit}
          className="mt-20 flex-col space-y-1.5 pb-14"
          key="init-checkout-form"
        >
          <div
            className="flex justify-between font-semibold text-xl"
            key="checkout-prices"
          >
            <div>{t("init_payment_total")}</div>
            <div>{priceFormatter.format(price)}</div>
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
            className="text-center text-sp-black text-sm dark:text-sp-white dark:text-opacity-60"
            key="redirect-notice"
          >
            {t("init_payment_redirect_notice")}
          </p>
        </form>
      )}
    </div>
  );
}
