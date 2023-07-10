import React from "react";

import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon, CheckIcon } from "@heroicons/react/outline";
import { useTranslation } from "next-i18next";

export function CTA() {
  const { t } = useTranslation("about");

  return (
    <section className="from-sp-day-start flex items-center justify-center">
      <div className="flex flex-col items-start justify-center gap-12 px-5 md:flex-row">
        <div className="flex w-full flex-col items-center justify-center gap-2.5 pb-8 md:w-1/2 md:items-start lg:w-1/3">
          <div className="relative h-8 w-8 rounded-sp-10 bg-sp-day-50">
            <Image
              src="/images/logo/spiritus.svg"
              fill
              alt="logo"
              className="p-1"
            />
          </div>

          <h2 className="text-start text-[44px] font-bold leading-none subpixel-antialiased">
            Life is much more than some names and dates.
          </h2>

          <p className="leading-5 text-sp-black opacity-70 tracking-sp-tighten dark:text-sp-white">
            Life is about memorable stories that your loved ones left behind.
            That's why we made a platform for creating digital memorials.
          </p>

          <div className="flex flex-col space-y-3 py-2">
            <div className="inline-flex gap-2">
              <div className="flex h-6 w-6 items-center rounded-full bg-sp-dark-fawn p-1">
                <CheckIcon className="h-5 w-5 text-white" />
              </div>
              3000+ Memory Guardians
            </div>
            <div className="inline-flex gap-2">
              <div className="flex h-6 w-6 items-center rounded-full bg-sp-dark-fawn p-1">
                <CheckIcon className="h-5 w-5 text-white" />
              </div>
              150+ positive 5.0★ reviews
            </div>
            <div className="inline-flex gap-2">
              <div className="flex h-6 w-6 items-center rounded-full bg-sp-dark-fawn p-1">
                <CheckIcon className="h-5 w-5 text-white" />
              </div>
              Ensuring eternity through modern technology.
            </div>
          </div>
          <div className="mt-2 flex w-64">
            <Link
              href="/about"
              className="flex w-full items-center justify-between rounded-sp-10 border border-sp-day-400 px-5 py-2 text-sm"
            >
              Learn more about us
              <ArrowRightIcon className="inline-block h-5 w-5 fill-sp-black dark:fill-sp-white" />
            </Link>
          </div>
          <div className="flex items-center justify-start gap-2">
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
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=app.spiritus"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/mobile/playStore.svg"
                alt="Google Play Store"
                width={160}
                height={60}
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
