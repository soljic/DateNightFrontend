import React from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

import playStore from "../../public/images/mobile/playStore.svg";
import appleStore from "../../public/images/mobile/appStore.svg";
import CTAImage from "../../public/images/about/image_download_cta.png";

function BecomeGuardianCTA() {
  const { t } = useTranslation("about");

  return (
    <section className="mt-48 pb-10 bg-gradient-to-b from-sp-day-50 to-day-gradient-stop dark:from-sp-black dark:via-sp-dark-gradient-mid dark:to-sp-brown rounded-sp-14">
      <div className="flex flex-col justify-center items-center md:flex-row px-5 gap-6">
        <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col justify-center items-center md:justify-start md:items-start gap-2.5 pb-8">
          <div className="flex justify-center w-12 h-14 items-center bg-gradient-to-r dark:bg-gradient-to-r from-day-gradient-start to-day-gradient-stop dark:from-sp-dark-brown dark:to-sp-brown rounded-sp-10 p-3">
            <svg
              width="12"
              height="20"
              viewBox="0 0 12 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.8 14.7999C4.46863 14.7999 4.2 15.0685 4.2 15.3999C4.2 15.7313 4.46863 15.9999 4.8 15.9999L7.2 15.9999C7.53137 15.9999 7.8 15.7313 7.8 15.3999C7.8 15.0685 7.53137 14.7999 7.2 14.7999L4.8 14.7999ZM2.4 0.399902C1.07452 0.399902 0 1.47442 0 2.7999L0 17.1999C0 18.5254 1.07452 19.5999 2.4 19.5999H9.6C10.9255 19.5999 12 18.5254 12 17.1999L12 2.7999C12 1.47442 10.9255 0.399902 9.6 0.399902L2.4 0.399902ZM1.2 2.7999C1.2 2.13716 1.73726 1.5999 2.4 1.5999L9.6 1.5999C10.2627 1.5999 10.8 2.13716 10.8 2.7999L10.8 17.1999C10.8 17.8626 10.2627 18.3999 9.6 18.3999H2.4C1.73726 18.3999 1.2 17.8626 1.2 17.1999L1.2 2.7999Z"
                fill="url(#paint0_linear_7364_1020)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_7364_1020"
                  x1="1.55775e-08"
                  y1="9.99989"
                  x2="12"
                  y2="9.99989"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#ED9A4C" />
                  <stop offset="1" stopColor="#E3AA6D" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <p className="text-[22px] text-center md:text-left font-bold tracking-[0.03em] leading-6 text-sp-black dark:text-sp-white">
            {t("become_guardian_title")}
          </p>

          <p className="font-medium tracking-sp-tighten leading-5 opacity-70 dark:text-sp-white">
            {t("become_guardian_subtitle")}
          </p>
          <div className="flex justify-start items-center gap-2">
            <a
              href="https://apps.apple.com/hr/app/spiritus/id1584613380"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={appleStore} />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=app.spiritus"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={playStore} />
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/2 -mx-10">
          <Image
            src={CTAImage}
            width={510}
            height={510}
          />
        </div>
      </div>
    </section>
  );
}

export default BecomeGuardianCTA;