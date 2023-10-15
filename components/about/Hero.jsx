import { useState } from "react";

import Image from "next/legacy/image";
import Link from "next/link";

import { XIcon } from "@heroicons/react/outline";
import { useTranslation } from "next-i18next";

import hero from "../../public/images/about/hero.png";
import { HorizontalDivider } from "../layout/Common";

function HeroIcon({ className }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      className={className ? className : "h-6 w-6"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 6C8.91015 6 6 8.91015 6 12.5V29.5C6 33.0899 8.91015 36 12.5 36H29.5C33.0899 36 36 33.0899 36 29.5V12.5C36 8.91015 33.0899 6 29.5 6H12.5ZM25.5 15C25.5 17.4853 23.4853 19.5 21 19.5C18.5147 19.5 16.5 17.4853 16.5 15C16.5 12.5147 18.5147 10.5 21 10.5C23.4853 10.5 25.5 12.5147 25.5 15ZM27 21.5C28.6569 21.5 30 22.8431 30 24.5V25.5C30 26.4914 29.8271 27.2199 29.4923 27.8212C29.1558 28.4254 28.6317 28.9448 27.8554 29.4786C26.3905 30.4857 24.1405 31 21 31C18.3595 31 16.1095 30.4857 14.5196 29.4786C13.683 28.9486 13.0608 28.4315 12.6438 27.8193C12.2344 27.2183 12 26.4917 12 25.5V24.5C12 22.8431 13.3431 21.5 15 21.5H27ZM12.0218 37.9999C13.1769 39.8041 15.1988 40.9999 17.5 40.9999H30.5C36.299 40.9999 41 36.2989 41 30.4999V17.4999C41 15.1987 39.8041 13.1768 38 12.0217V30.4999C38 34.642 34.6421 37.9999 30.5 37.9999H12.0218Z"
        fill="url(#paint0_linear_10880_28661)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_10880_28661"
          x1="6"
          y1="23.4999"
          x2="41"
          y2="23.4999"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D67915" />
          <stop offset="1" stopColor="#ED9A4C" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Hero() {
  const { t } = useTranslation("about");

  return (
    <>
      <div className="flex min-h-[480px] flex-col items-center justify-center space-y-6 text-center text-sp-black dark:text-sp-white">
        <div className="mx-4 lg:mx-0">
          <div className="max-w-7xl text-center">
            <div className="flex w-full justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sp-fawn-subtle drop-shadow dark:bg-sp-fawn dark:bg-opacity-40">
                <HeroIcon className="h-10 w-10" />
              </div>
            </div>
            <h1 className="mb-3 mt-6 text-center font-bold drop-shadow-lg text-4xl dark:text-sp-white md:text-cta">
              {t("hero_title")}
            </h1>
          </div>
        </div>
      </div>
      <HorizontalDivider />
      <p className="whitespace-pre-line py-20 font-fancy leading-none text-xl md:text-2xl">
        {t("hero_story")}
      </p>
      <HorizontalDivider />
      <div className="flex justify-around gap-8 py-20 font-bold text-lg md:text-xl">
        <p className="w-1/2">{t("hero_beliefs_1")}</p>
        <p className="w-1/2">{t("hero_beliefs_2")}</p>
      </div>
    </>
  );
}
