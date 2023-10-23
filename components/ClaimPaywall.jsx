import { useRouter } from "next/router";

import { useTranslation } from "next-i18next";

import {
  AddPhotosIcon,
  EnterInfoIcon,
  ForeverBadgeIcon,
  LocationPinIcon,
  SpiritusIcon,
} from "./Icons";

export function ClaimPaywall({ slug }) {
  const { t } = useTranslation("paywall");
  const router = useRouter();
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
      icon: <LocationPinIcon width={8} height={8} />,
    },
    {
      title: t("list_elem_4_title"),
      subtitle: t("list_elem_4_subtitle"),
      icon: <ForeverBadgeIcon width={8} height={8} />,
    },
  ];

  const redirectClaim = async () => {
    // redirect user to claim checkout page
    await router.push(`/checkout/claim/${slug}`);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="rounded-sp-10 bg-gradient-to-r from-day-gradient-start to-day-gradient-stop p-2.5 dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown">
          <SpiritusIcon fill />
        </div>
        <h1 className="w-2/3 text-center font-bold text-sp-black text-2xl dark:text-sp-white">
          {`${t("claim_spiritus")}`}
        </h1>
        <div className="mx-auto my-5 flex w-3/4 justify-center text-sp-black dark:text-sp-white">
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
            redirectClaim();
          }}
          className="w-80 rounded-sp-40 border border-sp-lighter px-4 py-3 text-center font-semibold"
        >
          {t("start_claim_button")}
        </button>
        <p className="text-sp-black text-sm dark:text-sp-white dark:text-opacity-60">
          {t("start_button_hint")}
        </p>
      </div>
    </div>
  );
}
