import Link from "next/link";
import Image from "next/image";

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
      <section className="hidden md:flex flex-col justify-center items-center sp-banner-shadow text-sp-white border-4 border-sp-lighter rounded-sp-14 bg-sp-black overflow-hidden">
        <div className="flex flex-grow overflow-hidden">
          <Image src={DesktopBanner} alt="Learn more" priority={true}/>
        </div>
        <div className="absolute z-40 w-3/4">
          <div className="flex flex-col items-center">
            <h1 className="sp-text-shadow text-center text-2xl sm:text-2xl md:text-3xl lg:text-cta -tracking-tight text-sp-white font-bold mb-2.5 shadow-md">
              {t("vukovar_title")}
            </h1>
            <h2 className="sp-text-shadow text-sp-white text-lg font-medium">
              {t("vukovar_subtitle")}
            </h2>
            <Link href="/project/14/item/9?title=Vukovar">
              <a className="mt-5 inline-flex bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn dark:from-sp-dark-fawn dark:to-sp-fawn border-5 border-sp-fawn dark:border-sp-medium dark:border-opacity-80 rounded-sp-40 py-3 px-7 text-sp-white dark:text-sp-black">
                <ArrowRightIcon />
                <span className="font-semibold ml-1">
                  {t("vukovar_button")}
                </span>
              </a>
            </Link>
          </div>
        </div>
      </section>
      <section className="md:hidden h-[70vh] flex flex-col justify-center items-center sp-banner-shadow text-sp-white border-4 border-sp-lighter rounded-sp-14 bg-sp-black overflow-hidden">
        <div className="flex justify-center items-center overflow-hidden">
          <Image src={MobileBanner} alt="Learn more" priority={true}/>
        </div>
        <div className="absolute z-40 w-4/5 items-center">
          <div className="flex flex-col items-center">
            <h1 className="sp-text-shadow text-center text-3xl -tracking-tight dark:text-sp-white font-bold mb-2.5">
              {t("vukovar_title")}
            </h1>
            <h2 className="sp-text-shadow text-sp-white text-sm sm:text-base font-medium mb-8">
              {t("vukovar_subtitle")}
            </h2>
            <Link href="/project/14/item/9?title=Vukovar">
              <a className="inline-flex items-center bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn dark:from-sp-dark-fawn dark:to-sp-fawn border-5 border-sp-fawn dark:border-sp-medium dark:border-opacity-80 rounded-sp-40 py-2.5 px-7 text-sp-white dark:text-sp-black">
                <ArrowRightIcon />
                <span className="font-semibold text-xs ml-1">
                  {t("vukovar_button")}
                </span>
              </a>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
