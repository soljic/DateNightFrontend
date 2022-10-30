import Link from "next/link";
import Image from "next/image";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { useTranslation } from "next-i18next";

import { ArrowRightIcon } from "../Icons";
import { XIcon, ChevronRightIcon } from "@heroicons/react/solid";

import DesktopBanner from "../../public/images/img_memwalkprompt_desktop.jpg";
import MobileBanner from "../../public/images/img_memwalkprompt_mobile.jpg";

export function CTAMemWalk() {
  const { t } = useTranslation("banners");

  return (
    <div className="my-5 overflow-hidden rounded-sp-14 w-full h-full text-sp-black dark:text-sp-white bg-gradient-to-r from-day-gradient-start to-day-gradient-stop dark:from-sp-dark-brown dark:to-sp-brown">
      <div className="flex flex-col md:flex-row-reverse justify-between items-start md:items-center border-l-4 border-sp-dark-fawn gap-2">
        <div className="w-full md:w-2/5 relative group p-3">
          <div className="absolute z-10 h-full w-full">
            <Image
              src={"/images/img_memwalkbanner_front.png"}
              alt={"Mem walk"}
              width={320}
              height={180}
              layout="responsive"
              className="rounded-sp-14"
            />
          </div>
          <div className="sp-image-shadow blur-[2px]">
            <Image
              src={"/images/img_memwalkbanner_back.png"}
              alt={"Mem walk"}
              width={240}
              height={135}
              layout="responsive"
              className="rounded-sp-14"
            />
          </div>
        </div>
        <div className="w-full md:w-3/5 py-5 px-5 md:px-10">
          <div className="flex flex-col gap-2">
            <p className="w-14 bg-gradient-to-r from-sp-dark-fawn to-sp-fawn rounded-md text-sp-black text-center font-medium uppercase">
              {t("new")}
            </p>
            <h2 className="text-[22px] leading-[24px] tracking-[0.03em] font-bold">
              {t("mem_walk_title")}
            </h2>
            <p className="text-sp-lighter font-medium">
              {t("mem_walk_subtitle")}
            </p>

            <Link href="/mobile-app">
              <a className="mt-5 inline-flex items-center font-bold text-sp-day-900 dark:text-sp-fawn">
                {t("mem_walk_button")}
                <ChevronRightIcon className="w-4 h-4 text-sp-day-900 dark:text-sp-fawn" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MemWalkModal({ isOpen, closeModal }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-100" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-1000"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-90 z-40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto z-40">
          <div className="flex items-center justify-center min-w-full min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-1000"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="w-full md:w-3/4 xl:w-1/2 content-center transition-all transform"
              >
                <div className="h-full flex flex-col items-end">
                  <button
                    onClick={closeModal}
                    className="rounded-full focus:outline-gray-500"
                  >
                    <XIcon className="font-bold text-sp-white w-7 h-7 p-1 bg-sp-lighter rounded-full" />
                  </button>
                  <div className="md:mx-8 my-4">
                    <MemWalkBanner />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function MemWalkBanner() {
  const { t } = useTranslation("banners");

  return (
    <>
      <section className="hidden md:flex flex-col justify-center items-center sp-banner-shadow text-sp-white border-4 border-sp-lighter rounded-sp-14 bg-sp-black overflow-hidden">
        <div className="flex flex-grow overflow-hidden">
          <Image src={DesktopBanner} alt="Download Spiritus Mobile" />
        </div>
        <div className="absolute z-40">
          <div className="flex flex-col items-center">
            <h1 className="sp-text-shadow text-center text-2xl sm:text-2xl md:text-3xl lg:text-cta -tracking-tight text-sp-white font-bold mb-2.5 shadow-md">
              {t("mem_walk_title")}
            </h1>
            <h2 className="sp-text-shadow text-sp-white text-lg font-medium">
              {t("mem_walk_subtitle")}
            </h2>
            <Link href="/memory-walk-download-app">
              <a className="mt-5 inline-flex bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn dark:from-sp-dark-fawn dark:to-sp-fawn border-5 border-sp-fawn dark:border-sp-medium dark:border-opacity-80 rounded-sp-40 py-3 px-7 text-sp-white dark:text-sp-black">
                <ArrowRightIcon />
                <span className="font-semibold ml-1">
                  {t("mem_walk_button")}
                </span>
              </a>
            </Link>
          </div>
        </div>
      </section>
      <section className="md:hidden h-[70vh] flex flex-col justify-center items-center sp-banner-shadow text-sp-white border-4 border-sp-lighter rounded-sp-14 bg-sp-black overflow-hidden">
        <div className="flex justify-center items-center overflow-hidden">
          <Image src={MobileBanner} alt="Download Spiritus Mobile" />
        </div>
        <div className="absolute z-40 w-4/5 items-center">
          <div className="flex flex-col items-center">
            <h1 className="sp-text-shadow text-center text-3xl -tracking-tight dark:text-sp-white font-bold mb-2.5">
              {t("mem_walk_title")}
            </h1>
            <h2 className="sp-text-shadow text-sp-white text-sm sm:text-base font-medium mb-8">
              {t("mem_walk_subtitle")}
            </h2>
            <Link href="/memory-walk-download-app">
              <a className="inline-flex items-center bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn dark:from-sp-dark-fawn dark:to-sp-fawn border-5 border-sp-fawn dark:border-sp-medium dark:border-opacity-80 rounded-sp-40 py-2.5 px-7 text-sp-white dark:text-sp-black">
                <ArrowRightIcon />
                <span className="font-semibold text-xs ml-1">
                  {t("mem_walk_button")}
                </span>
              </a>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
