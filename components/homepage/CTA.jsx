import React from "react";

import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon, CheckIcon } from "@heroicons/react/outline";
import { useTranslation } from "next-i18next";

export function CTA() {
  const { t } = useTranslation("about");

  return (
    <section className="from-sp-day-start flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-12 px-5 md:flex-row">
        <div className="flex w-full flex-col items-start justify-center gap-2.5 pb-8 md:w-1/2 lg:w-1/3">
          <div className="relative mb-4 h-8 w-8 rounded-sp-10 bg-sp-day-50 md:mb-2">
            <Image
              src="/images/logo/spiritus.svg"
              fill
              alt="logo"
              className="p-1"
            />
          </div>

          <h2 className="text-start font-bold subpixel-antialiased text-4xl md:text-[44px] md:leading-tight">
            {t("features_title")}
          </h2>

          <p className="whitespace-pre-line leading-5 text-sp-black opacity-70 tracking-sp-tighten dark:text-sp-white">
            {t("features_subtitle")}
          </p>

          <div className="flex flex-col space-y-3 py-2">
            <div className="inline-flex gap-2">
              <div className="flex h-6 w-6 items-center rounded-full bg-sp-dark-fawn p-1">
                <CheckIcon className="h-5 w-5 text-white" />
              </div>
              {t("feature_1_list_1")}
            </div>
            <div className="inline-flex gap-2">
              <div className="flex h-6 w-6 items-center rounded-full bg-sp-dark-fawn p-1">
                <CheckIcon className="h-5 w-5 text-white" />
              </div>
              {t("feature_1_list_2")}
            </div>
            <div className="inline-flex gap-2">
              <div className="flex h-6 w-6 items-center rounded-full bg-sp-dark-fawn p-1">
                <CheckIcon className="h-5 w-5 text-white" />
              </div>
              {t("feature_1_list_3")}
            </div>
          </div>
          <div className="mt-2 flex w-full md:w-64">
            <Link
              href="/why-us"
              className="flex w-full items-center justify-between rounded-sp-10 border border-sp-day-400 px-5 py-3 text-sm"
            >
              {t("learn_more_about_us")}
              <ArrowRightIcon className="inline-block h-5 w-5 fill-sp-black dark:fill-sp-white" />
            </Link>
          </div>
          <div className="flex w-full items-center justify-start gap-2">
            <a
              href="https://play.google.com/store/apps/details?id=app.spiritus"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/mobile/playStore.svg"
                alt="Google Play Store"
                className="h-12"
                width={160}
                height={70}
              />
            </a>
            <a
              href="https://apps.apple.com/hr/app/spiritus/id1584613380"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/mobile/appStore.svg"
                alt="Apple Store"
                width={160}
                height={60}
                className="h-12"
              />
            </a>
          </div>
        </div>
        <Image
          src="/images/homepage_cta.png"
          width={510}
          height={580}
          sizes="100vw"
          alt="Download mobile app"
        />
      </div>
    </section>
  );
}
