import Link from "next/link";
import Image from "next/legacy/image";

import { useTranslation } from "next-i18next";

import { ArrowRightIcon } from "../Icons";

import DesktopBanner from "../../public/images/img_vukovar_desktop.jpg";
import MobileBanner from "../../public/images/img_vukovar_mobile.jpg";
import { PopupModal } from "./popup";

export function VukovarModal({ isOpen, closeModal }) {
  return (
    <PopupModal isOpen={isOpen} closeModal={closeModal}>
      <ModalContent />
    </PopupModal>
  );
}

function ModalContent() {
  const { t } = useTranslation("banners");

  return (
    <>
      <section className="sp-banner-shadow hidden flex-col items-center justify-center overflow-hidden rounded-sp-14 border-4 border-sp-lighter bg-sp-black text-sp-white md:flex">
        <div className="flex flex-grow overflow-hidden">
          <Image src={DesktopBanner} alt="Learn more" priority={true} />
        </div>
        <div className="absolute z-40 w-3/4">
          <div className="flex flex-col items-center">
            <h1 className="sp-text-shadow mb-2.5 text-center font-bold text-sp-white shadow-md text-2xl -tracking-tight sm:text-2xl md:text-3xl lg:text-cta">
              {t("vukovar_title")}
            </h1>
            <h2 className="sp-text-shadow font-medium text-sp-white text-lg">
              {t("vukovar_subtitle")}
            </h2>
            <Link
              href="/project/14/item/9?title=Vukovar"
              className="mt-5 inline-flex rounded-sp-40 border-5 border-sp-fawn bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn px-7 py-3 text-sp-white dark:border-sp-medium dark:border-opacity-80 dark:from-sp-dark-fawn dark:to-sp-fawn dark:text-sp-black"
            >
              <ArrowRightIcon />
              <span className="ml-1 font-semibold">{t("vukovar_button")}</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="sp-banner-shadow flex h-[70vh] flex-col items-center justify-center overflow-hidden rounded-sp-14 border-4 border-sp-lighter bg-sp-black text-sp-white md:hidden">
        <div className="flex items-center justify-center overflow-hidden">
          <Image src={MobileBanner} alt="Learn more" priority={true} />
        </div>
        <div className="absolute z-40 w-4/5 items-center">
          <div className="flex flex-col items-center">
            <h1 className="sp-text-shadow mb-2.5 text-center font-bold text-3xl -tracking-tight dark:text-sp-white">
              {t("vukovar_title")}
            </h1>
            <h2 className="sp-text-shadow mb-8 font-medium text-sp-white text-sm sm:text-base">
              {t("vukovar_subtitle")}
            </h2>
            <Link
              href="/project/14/item/9?title=Vukovar"
              className="inline-flex items-center rounded-sp-40 border-5 border-sp-fawn bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn px-7 py-2.5 text-sp-white dark:border-sp-medium dark:border-opacity-80 dark:from-sp-dark-fawn dark:to-sp-fawn dark:text-sp-black"
            >
              <ArrowRightIcon />
              <span className="ml-1 font-semibold text-xs">
                {t("vukovar_button")}
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
