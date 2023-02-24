import Image from "next/image";

import { useSession } from "next-auth/react";

import { useTranslation } from "next-i18next";

import { useRouter } from "next/router";

import {
  EnterInfoIcon,
  ForeverBadgeIcon,
  AddPhotosIcon,
  PurchaseIcon,
  SpiritusIcon,
  CheckmarkIcon,
  UserOutlineIcon,
  LocationPinIcon,
  DescriptionTextIcon,
  TagIcon,
} from "./Icons";

import { ImagePath, localFormatDate } from "../service/util";
import { CheckoutSpiritus } from "../service/http/payment";

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
    <div className="flex flex-col items-center pt-24 h-screen">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="bg-gradient-to-r from-day-gradient-start to-day-gradient-stop dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown rounded-sp-10 p-2.5">
          <SpiritusIcon fill />
        </div>
        <h1 className="font-bold text-sp-black dark:text-sp-white text-2xl text-center">
          {t("create_spiritus")}({priceFormatter.format(price)})
        </h1>
        <div className="text-sp-black dark:text-sp-white w-3/4 mt-5">
          <ul>
            {items.map((item) => (
              <li
                key={`pw-item-${item.title}`}
                className="flex items-center p-2.5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center sm:h-12 sm:w-12">
                  {item.icon}
                </div>
                <div className="ml-4">
                  <p className="text-lg font-semibold dark:text-sp-white">
                    {t(item.title)}
                  </p>
                  <p className="dark:text-sp-white dark:text-opacity-60 text-sm">
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
          className="px-4 py-3 rounded-sp-40 w-80 font-semibold border border-sp-lighter text-center mt-20"
        >
          {t("start_button")}
        </button>
        <p className="text-sp-black dark:text-sp-white dark:text-opacity-60 text-sm">
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
}) {
  const router = useRouter();
  const { data: session, status } = useSession();

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    let res;
    res = await CheckoutSpiritus(
      session?.user.accessToken,
      spiritus.id,
      productId
    );
    router.push(res.data);
  };

  // TODO: remove
  spiritus.images = [];

  return (
    <div
      className="flex flex-col justify-center items-center dark:text-sp-white p-24"
      key="checkout-init-screen"
    >
      <div className="flex flex-col items-center justify-center rounded-sp-14 shadow dark:shadow-sp-fawn py-14 w-full md:w-2/3 lg:w-3/5 xl:1/2 space-y-4">
        <div className="bg-sp-fawn bg-opacity-25 rounded-xl p-2">
          <CheckmarkIcon width={8} height={8} />
        </div>
        <h1 className="font-bold text-2xl">{t("init_payment_title")}</h1>
        {!!spiritus?.images.length && (
          <div className="rounded-sp-14 overflow-hidden">
            <Image
              src={ImagePath(spiritus.images[0].url)}
              alt="Spiritus image"
              width={270}
              height={300}
              className="rounded-sp-14"
            />
          </div>
        )}
        <div className="flex flex-col text-sp-black dark:text-sp-white mt-5 w-full items-center">
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
                  <p className="dark:text-sp-white dark:text-opacity-60 text-sm">
                    {t(item.subtitle)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <form
        // action={`/api/checkout/${spiritus.id}?service=STRIPE&packageId=${productId}`}
        // method="POST"
        onSubmit={handleSubmit}
        className="mt-20 flex-col space-y-1.5"
        key="init-checkout-form"
      >
        <div
          className="flex justify-between text-xl font-semibold"
          key="checkout-prices"
        >
          <div>{t("init_payment_total")}</div>
          <div>{priceFormatter.format(productPrice)}</div>
        </div>
        <button
          type="submit"
          className="font-semibold text-xl dark:text-sp-black dark:bg-sp-white px-4 py-3 rounded-sp-40 w-full border border-sp-lighter text-center"
          key="submit-button"
        >
          {t("init_payment_button")}
        </button>
        <p
          className="text-sp-black dark:text-sp-white dark:text-opacity-60 text-sm text-center"
          key="redirect-notice"
        >
          {t("init_payment_redirect_notice")}
        </p>
      </form>
    </div>
  );
}
