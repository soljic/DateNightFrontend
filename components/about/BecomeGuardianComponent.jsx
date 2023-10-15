import React from "react";

import Image from "next/legacy/image";

import { useTranslation } from "next-i18next";

import CTAImage from "../../public/images/about/image_download_cta.png";
import appleStore from "../../public/images/mobile/appStore.svg";
import playStore from "../../public/images/mobile/playStore.svg";

function BecomeGuardianCTA() {
  const { t } = useTranslation("about");

  return (
    <section className="mt-48 rounded-sp-14 bg-gradient-to-b from-sp-day-50 to-day-gradient-stop pb-10 dark:from-sp-black dark:via-sp-dark-gradient-mid dark:to-sp-brown">
      <div className="flex flex-col items-center justify-center gap-6 px-5 md:flex-row">
        <div className="flex w-full flex-col items-center justify-center gap-2.5 pb-8 md:w-1/2 md:items-start md:justify-start lg:w-1/3">
          <div className="flex items-center justify-center rounded-sp-10">
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="37"
                height="37"
                rx="10.5"
                stroke="url(#paint0_linear_9853_57303)"
              />
              <path
                d="M14.8 9.3999C13.8059 9.3999 13 10.2058 13 11.1999L13 26.7999C13 27.794 13.8059 28.5999 14.8 28.5999H23.2C24.1941 28.5999 25 27.794 25 26.7999L25 11.1999C25 10.2058 24.1941 9.3999 23.2 9.3999L14.8 9.3999ZM17.8 23.7999H20.2C20.5314 23.7999 20.8 24.0685 20.8 24.3999C20.8 24.7313 20.5314 24.9999 20.2 24.9999H17.8C17.4686 24.9999 17.2 24.7313 17.2 24.3999C17.2 24.0685 17.4686 23.7999 17.8 23.7999Z"
                fill="url(#paint1_linear_9853_57303)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_9853_57303"
                  x1="1"
                  y1="19"
                  x2="37"
                  y2="19"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#D67915" />
                  <stop offset="1" stopColor="#ED9A4C" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_9853_57303"
                  x1="13"
                  y1="18.9999"
                  x2="25"
                  y2="18.9999"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#D67915" />
                  <stop offset="1" stopColor="#ED9A4C" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <p className="whitespace-pre-line text-center text-[22px] font-bold leading-4 tracking-[0.03em] text-sp-black dark:text-sp-white md:text-left">
            {t("become_guardian_title")}
          </p>

          <p className="font-medium leading-5 text-sp-black opacity-70 tracking-sp-tighten dark:text-sp-white">
            {t("become_guardian_subtitle")}
          </p>
          <div className="flex items-center justify-start gap-2">
            <a
              href="https://apps.apple.com/hr/app/spiritus/id1584613380"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={appleStore} alt="apple store" />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=app.spiritus"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={playStore} alt="play store" />
            </a>
          </div>
        </div>
        <div className="-mx-10 w-full md:w-1/2">
          <Image
            src={CTAImage}
            width={510}
            height={510}
            alt="Download mobile app"
          />
        </div>
      </div>
    </section>
  );
}

export default BecomeGuardianCTA;
