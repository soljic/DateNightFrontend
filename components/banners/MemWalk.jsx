import Link from "next/link";
import Image from "next/legacy/image";

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
    <div className="my-5 h-full w-full overflow-hidden rounded-sp-14 bg-gradient-to-r from-day-gradient-start to-day-gradient-stop text-sp-black dark:from-sp-dark-brown dark:to-sp-brown dark:text-sp-white">
      <div className="flex flex-col items-start justify-between gap-2 border-l-4 border-sp-dark-fawn md:flex-row-reverse md:items-center">
        <div className="group relative w-full p-3 md:w-2/5">
          <div className="absolute z-10 h-full w-full">
            <Image
              src={"/images/img_memwalkbanner_front.png"}
              alt={"Mem walk"}
              width={320}
              height={180}
              layout="responsive"
              className="rounded-sp-14"
              priority
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
              priority
            />
          </div>
        </div>
        <div className="w-full px-5 py-5 md:w-3/5 md:px-10">
          <div className="flex flex-col gap-2">
            <p className="w-14 rounded-md bg-gradient-to-r from-sp-dark-fawn to-sp-fawn text-center font-medium uppercase text-sp-black">
              {t("new")}
            </p>
            <h2 className="text-[22px] font-bold leading-[24px] tracking-[0.03em]">
              {t("mem_walk_title")}
            </h2>
            <p className="font-medium text-sp-lighter">
              {t("mem_walk_subtitle")}
            </p>

            <Link
              href="/mobile-app"
              className="mt-5 inline-flex items-center font-bold text-sp-day-900 dark:text-sp-fawn"
            >
              {t("mem_walk_button")}
              <ChevronRightIcon className="h-4 w-4 text-sp-day-900 dark:text-sp-fawn" />
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
      <Dialog as="div" className="z-100 relative" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-1000"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-40 bg-black bg-opacity-90" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 overflow-y-auto">
          <div className="flex min-h-full min-w-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-1000"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full transform content-center transition-all md:w-3/4 xl:w-1/2">
                <div className="flex h-full flex-col items-end">
                  <button
                    onClick={closeModal}
                    className="rounded-full focus:outline-gray-500"
                  >
                    <XIcon className="h-7 w-7 rounded-full bg-sp-lighter p-1 font-bold text-sp-white" />
                  </button>
                  <div className="my-4 md:mx-8">
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
      <section className="sp-banner-shadow hidden flex-col items-center justify-center overflow-hidden rounded-sp-14 border-4 border-sp-lighter bg-sp-black text-sp-white md:flex">
        <div className="flex flex-grow overflow-hidden">
          <Image src={DesktopBanner} alt="Download Spiritus Mobile" priority />
        </div>
        <div className="absolute z-40">
          <div className="flex flex-col items-center">
            <h1 className="sp-text-shadow mb-2.5 text-center font-bold text-sp-white shadow-md text-2xl -tracking-tight sm:text-2xl md:text-3xl lg:text-cta">
              {t("mem_walk_title")}
            </h1>
            <h2 className="sp-text-shadow font-medium text-sp-white text-lg">
              {t("mem_walk_subtitle")}
            </h2>
            <Link
              href="/memory-walk-download-app"
              className="mt-5 inline-flex rounded-sp-40 border-5 border-sp-fawn bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn px-7 py-3 text-sp-white dark:border-sp-medium dark:border-opacity-80 dark:from-sp-dark-fawn dark:to-sp-fawn dark:text-sp-black"
            >
              <ArrowRightIcon />
              <span className="ml-1 font-semibold">{t("mem_walk_button")}</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="sp-banner-shadow flex h-[70vh] flex-col items-center justify-center overflow-hidden rounded-sp-14 border-4 border-sp-lighter bg-sp-black text-sp-white md:hidden">
        <div className="flex items-center justify-center overflow-hidden">
          <Image src={MobileBanner} alt="Download Spiritus Mobile" priority />
        </div>
        <div className="absolute z-40 w-4/5 items-center">
          <div className="flex flex-col items-center">
            <h1 className="sp-text-shadow mb-2.5 text-center font-bold text-3xl -tracking-tight dark:text-sp-white">
              {t("mem_walk_title")}
            </h1>
            <h2 className="sp-text-shadow mb-8 font-medium text-sp-white text-sm sm:text-base">
              {t("mem_walk_subtitle")}
            </h2>
            <Link
              href="/memory-walk-download-app"
              className="inline-flex items-center rounded-sp-40 border-5 border-sp-fawn bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn px-7 py-2.5 text-sp-white dark:border-sp-medium dark:border-opacity-80 dark:from-sp-dark-fawn dark:to-sp-fawn dark:text-sp-black"
            >
              <ArrowRightIcon />
              <span className="ml-1 font-semibold text-xs">
                {t("mem_walk_button")}
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
