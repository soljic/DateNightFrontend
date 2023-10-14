import { useEffect, useState } from "react";
import { useContext } from "react";

import Image from "next/legacy/image";
import { useRouter } from "next/router";

import { CheckCircleIcon, CheckIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

import { CurrencyContext } from "@/hooks/currency";

import { cn } from "@/utils/cn";

import {
  CLAIM_SPIRITUS_ACTION,
  CREATE_SPIRITUS_ACTION,
  CheckoutSpiritus,
  ClaimSpiritus,
  GetCouponProduct,
  GetLocalizedProducts,
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

export function Paywall({ acceptPaywall }) {
  const { t } = useTranslation("paywall");

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
    <div className="flex min-h-screen flex-col items-center py-24">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="rounded-sp-10 bg-gradient-to-r from-day-gradient-start to-day-gradient-stop p-2.5 dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown">
          <SpiritusIcon fill />
        </div>
        <h1 className="text-center font-bold text-sp-black text-2xl dark:text-sp-white">
          {`${t("create_spiritus")}`}
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
            acceptPaywall();
          }}
          className="w-80 rounded-sp-40 border border-sp-lighter px-4 py-3 text-center font-semibold"
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
              : "border-transparent opacity-95"
          )}
        >
          <div>
            <p className="mb-8 text-center font-bold text-3xl tracking-tight dark:text-sp-white">
              {plan.displayPrice}
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
