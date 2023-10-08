import { useEffect, useState } from "react";

import Image from "next/legacy/image";
import { useRouter } from "next/router";

import { CheckCircleIcon, CheckIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

import { cn } from "@/utils/cn";

import {
  CLAIM_SPIRITUS_ACTION,
  CREATE_SPIRITUS_ACTION,
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
import { SettingsSpiritusIcon } from "./SettingsIcons";
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

/* Stripe checkout has multiple products: LIFETIME and SUBSCRIPTION.
LIFETIME is a one-time payment for a single spiritus and is selected by default.
SUBSCRIPTION is a recurring payment.

example:
{
  id: 41,
  pkgServerId: 'price_1NuuMGADy47RIDRpbY598CFw',
  title: '44.99€',
  subtitle: null,
  description: 'Claimanje spiritusa ',
  originalPrice: 44.99,
  price: 44.99,
  currency: 'EUR',
  mode: 'LIFETIME',
  platform: null,
  stripePackages: [
    {
      id: 41,
      pkgServerId: 'price_1NuuMGADy47RIDRpbY598CFw',
      title: '44.99€',
      subtitle: null,
      description: 'Claimanje spiritusa ',
      originalPrice: 44.99,
      price: 44.99,
      currency: 'EUR',
      mode: 'LIFETIME',
      platform: 'STRIPE',
      stripePackages: null
    },
    {
      id: 42,
      pkgServerId: 'price_1NuuNdADy47RIDRpGM6qcv4g',
      title: '10.00€',
      subtitle: null,
      description: 'Pretplata na claim spiritusa ',
      originalPrice: 10,
      price: 10,
      currency: 'EUR',
      mode: 'SUBSCRIPTION',
      platform: 'STRIPE',
      stripePackages: null
    }
  ]
}
*/
export function Checkout({
  spiritus,
  lifetimeProduct,
  subscriptionProduct,
  allProducts,
  isClaim,
}) {
  const router = useRouter();
  const { t } = useTranslation("paywall", "common", "pricing");

  const { data: session, status } = useSession();

  // set default product
  const [selectedPlan, setSelectedPlan] = useState(0); // corresponds to lifetime product
  const [id, setId] = useState(lifetimeProduct.pkgServerId);
  const [price, setPrice] = useState(lifetimeProduct.price);
  const [currency, setCurrency] = useState(lifetimeProduct.currency);

  const onChangeSelectedPlan = (idx) => {
    setSelectedPlan(idx);
    if (idx === 0) {
      setCoupon("");
      setId(lifetimeProduct.pkgServerId);
      setPrice(lifetimeProduct.price);
      setCurrency(lifetimeProduct.currency);
    } else {
      setCoupon("");
      setId(subscriptionProduct.pkgServerId);
      setPrice(subscriptionProduct.price);
      setCurrency(subscriptionProduct.currency);
    }
  };

  const [fetching, setFetching] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponSubtitle, setCouponSubtitle] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const onChangeCoupon = (data) => {
    setId(data.pkgServerId);
    setPrice(data.price);
    setCurrency(data.currency);
    setCouponSubtitle(data.subtitle);
  };

  // change names to be more descriptive
  const pricingPlans = [
    {
      title: t("pricing:pricing_plan_lifetime_title"),
      subtitle: t("pricing:pricing_plan_lifetime_subtitle"),
      price: `${lifetimeProduct.title}`,
      list: [
        t("pricing:pricing_plan_lifetime_list_1"),
        t("pricing:pricing_plan_lifetime_list_2"),
        t("pricing:pricing_plan_lifetime_list_3"),
        t("pricing:pricing_plan_lifetime_list_4"),
        t("pricing:pricing_plan_lifetime_list_5"),
        t("pricing:pricing_plan_lifetime_list_6"),
        t("pricing:pricing_plan_lifetime_list_7"),
      ],
    },
    {
      title: t("pricing:pricing_plan_subscribe_title"),
      subtitle: t("pricing:pricing_plan_subscribe_subtitle"),
      price: `${subscriptionProduct.title}/${t("pricing:pricing_plan_month")}`,
      list: [
        t("pricing:pricing_plan_subscribe_list_1"),
        t("pricing:pricing_plan_subscribe_list_2"),
        t("pricing:pricing_plan_subscribe_list_3"),
        t("pricing:pricing_plan_subscribe_list_4"),
        t("pricing:pricing_plan_subscribe_list_5"),
        t("pricing:pricing_plan_subscribe_list_6"),
      ],
    },
  ];

  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
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
  ];

  items = items.filter((item) => item.subtitle);

  useEffect(() => {
    if (!coupon) {
      setIsValid(false);
      setFetching(false);
      setIsInvalid(false);
      return;
    }

    const debounce = setTimeout(async () => {
      setFetching(true);
      try {
        const res = await GetCouponProduct(
          session?.user.accessToken,
          isClaim ? CLAIM_SPIRITUS_ACTION : CREATE_SPIRITUS_ACTION,
          coupon
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

  const handleSubmit = async (event) => {
    setFetching(true);
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
      className="flex flex-col items-center justify-center px-4 dark:text-sp-white lg:mt-12"
      key="checkout-init-screen"
    >
      <div className="flex w-full flex-col items-center justify-center space-y-4">
        {isClaim ? (
          <>
            <div className="rounded-xl bg-sp-fawn bg-opacity-25 p-2">
              <SettingsSpiritusIcon className="h-8 w-8 fill-sp-dark-fawn" />
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="font-bold text-3xl">{t("init_claim_title")}</h1>
              <p>{t("init_claim_subtitle")}</p>
            </div>
          </>
        ) : (
          <>
            <div className="rounded-xl bg-sp-fawn bg-opacity-25 p-2">
              <CheckmarkIcon width={8} height={8} />
            </div>
            <h1 className="font-bold text-3xl">{t("init_payment_title")}</h1>
          </>
        )}
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
        <PricingPlanList
          plans={pricingPlans}
          selectedIdx={selectedPlan}
          onSetSelectedPlan={onChangeSelectedPlan}
        />
        <div className="flex items-center py-2.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center">
            <TagIcon width={8} height={8} />
          </div>
          <div className="ml-4">
            <div className="w-full">
              <div className="relative">
                <input
                  value={coupon}
                  onChange={(e) => {
                    setCoupon(e.target.value);
                    console.log("SET VALUE", e.target.value);
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
              {!!isInvalid && (
                <p className="font-medium text-red-400 text-sm dark:text-red-700">
                  {t("create_spiritus_coupon_invalid")}
                </p>
              )}
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
              {priceFormatter.format(price)}
              {selectedPlan === 1 ? `/${t("pricing:pricing_plan_month")}` : ""}
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
    </div>
  );
}

function PricingPlanList({ selectedIdx, plans, onSetSelectedPlan }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {plans.map((plan, idx) => (
        <div
          onClick={() => onSetSelectedPlan(idx)}
          key={`plan-index-${idx}`}
          className={cn(
            "flex max-w-sm flex-col justify-between gap-4 rounded-xl border-2 bg-green-200 bg-gradient-to-r from-day-gradient-start to-day-gradient-stop px-4 py-10 dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown",
            idx === selectedIdx
              ? "border-sp-fawn"
              : "border-transparent opacity-60"
          )}
        >
          <div>
            <p className="mb-8 text-center font-bold text-3xl tracking-tight dark:text-sp-white">
              {plan.price}
            </p>
            <p className="text-center font-bold text-xl tracking-tight dark:text-sp-white">
              {plan.title}
            </p>
            <p className="text-md mb-8 text-center font-medium leading-6 tracking-sp-tighten dark:text-sp-white">
              {plan.subtitle}
            </p>
            <ul className="mb-8 flex list-none flex-col justify-center gap-4 px-2 text-sm tracking-sp-tighten dark:text-sp-white">
              {plan.list.map((item, i) => (
                <li
                  className="flex items-center gap-2"
                  key={`${i}-item-${idx}`}
                >
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
      ))}
    </div>
  );
}
