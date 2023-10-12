import { Fragment, useContext, useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { Disclosure } from "@headlessui/react";
import { Popover, Transition } from "@headlessui/react";
import { CurrencyDollarIcon, MenuIcon } from "@heroicons/react/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { useTranslation } from "next-i18next";
import { useTheme } from "next-themes";

import { CurrencyContext } from "@/hooks/currency";

import { cn } from "@/utils/cn";

import {
  SettingsCheckSelectedIcon,
  SettingsCheckUnselectedIcon,
  SettingsDevicesIcon,
  SettingsGlobeIcon,
  SettingsQuestionIcon,
} from "../SettingsIcons";

export function AccesibilityMenu() {
  const [mounted, setMounted] = useState(false);

  const { t } = useTranslation("settings");
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { currency, updateCurrency } = useContext(CurrencyContext);

  // wait for component to mount to avoid hydration errs
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Popover className="z-20">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
				${open ? "" : "text-opacity-90"}
				z-10 items-center rounded-full px-2 py-2 font-medium hover:bg-gradient-to-r hover:from-sp-day-300 hover:to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown`}
          >
            <MenuIcon
              className="h-6 w-6 text-sp-black dark:text-sp-white"
              aria-hidden="true"
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="z-100 absolute mt-2 -translate-x-3/4 px-4">
              <div className="overflow-hidden rounded-sp-14 border-2 border-sp-fawn bg-sp-day-300 text-sp-black shadow-lg dark:border-sp-medium dark:bg-sp-black dark:text-sp-white">
                <div className="flex flex-col justify-evenly gap-y-2 p-3">
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-56 items-center justify-start rounded-sp-14 p-4 hover:bg-sp-day-50 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown">
                          {open ? (
                            <ChevronLeftIcon className="h-6 w-6 text-sp-lighter" />
                          ) : (
                            <div>
                              <SettingsGlobeIcon className="h-6 w-6 fill-sp-dark-fawn dark:fill-sp-white" />
                            </div>
                          )}
                          <div className="flex w-full justify-between">
                            <div className="ml-4">
                              <p className="font-medium capitalize text-sm">
                                {t("settings:language")}
                              </p>
                            </div>
                          </div>
                          {!open && (
                            <ChevronRightIcon className="h-6 w-6 text-sp-lighter" />
                          )}
                        </Disclosure.Button>
                        <Disclosure.Panel className="grid grid-cols-2 items-center">
                          <Link
                            href={router.asPath}
                            locale="en"
                            className="flex items-center justify-center rounded-sp-14 p-4 font-medium text-sm hover:bg-sp-day-50 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
                          >
                            EN
                          </Link>
                          <Link
                            href={router.asPath}
                            locale="hr"
                            className="flex items-center justify-center rounded-sp-14 p-4 font-medium text-sm hover:bg-sp-day-50 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
                          >
                            HR
                          </Link>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-56 items-center justify-start rounded-sp-14 p-4 hover:bg-sp-day-50 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown">
                          {open ? (
                            <ChevronLeftIcon className="h-6 w-6 text-sp-lighter" />
                          ) : (
                            <div>
                              <CurrencyDollarIcon className="h-6 w-6 text-sp-dark-fawn dark:text-sp-white" />
                            </div>
                          )}
                          <div className="flex w-full justify-between">
                            <div className="ml-4">
                              <p className="font-medium capitalize text-sm">
                                {t("settings:currency")}
                              </p>
                            </div>
                          </div>
                          {!open && (
                            <ChevronRightIcon className="h-6 w-6 text-sp-lighter" />
                          )}
                        </Disclosure.Button>
                        <Disclosure.Panel className="grid grid-cols-2 items-center">
                          <button
                            onClick={() => updateCurrency("USD")}
                            disabled={currency === "USD"}
                            className={cn(
                              currency === "USD"
                                ? "pointer-events-none border border-sp-day-400"
                                : "",
                              "flex items-center justify-center rounded-sp-14 p-4 font-medium text-sm hover:bg-sp-day-50 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
                            )}
                          >
                            USD
                          </button>
                          <button
                            onClick={() => updateCurrency("EUR")}
                            disabled={currency === "EUR"}
                            className={cn(
                              currency === "EUR"
                                ? "pointer-events-none border border-sp-day-400"
                                : "",
                              "flex items-center justify-center rounded-sp-14 p-4 font-medium text-sm hover:bg-sp-day-50 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
                            )}
                          >
                            EUR
                          </button>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-56 items-center justify-start rounded-sp-14 p-4 hover:bg-sp-day-50 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown">
                          {open ? (
                            <ChevronLeftIcon className="h-6 w-6 text-sp-lighter" />
                          ) : (
                            <SettingsDevicesIcon className="h-6 w-6 fill-sp-dark-fawn dark:fill-sp-white" />
                          )}
                          <div className="flex w-full justify-between">
                            <div className="ml-4">
                              <p className="font-medium capitalize text-sm">{`${t(
                                "theme"
                              )} (${t(theme)})`}</p>
                            </div>
                          </div>
                          {!open && (
                            <ChevronRightIcon className="h-6 w-6 text-sp-lighter" />
                          )}
                        </Disclosure.Button>
                        <Disclosure.Panel>
                          <button
                            onClick={() => setTheme("system")}
                            key={"sys"}
                            className="flex w-56 items-center justify-start rounded-sp-14 p-4 hover:bg-sp-day-50 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
                          >
                            <SettingsDevicesIcon className="h-5 w-5 fill-sp-day-400" />
                            <div className="flex w-full justify-between">
                              <div className="ml-4">
                                <p className="font-medium text-sm">
                                  {t("system")}
                                </p>
                              </div>
                              {theme === "system" ? (
                                <SettingsCheckSelectedIcon className="h-4 w-4" />
                              ) : (
                                <SettingsCheckUnselectedIcon className="h-4 w-4" />
                              )}
                            </div>
                          </button>
                          <button
                            onClick={() => setTheme("light")}
                            key={"light"}
                            className="flex w-56 items-center justify-start rounded-sp-14 p-4 hover:bg-sp-day-50 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
                          >
                            <SunIcon className="h-5 w-5 text-sp-cotta" />
                            <div className="flex w-full justify-between">
                              <div className="ml-4">
                                <p className="font-medium text-sm">
                                  {t("light")}
                                </p>
                              </div>
                              {theme === "light" ? (
                                <SettingsCheckSelectedIcon className="h-4 w-4" />
                              ) : (
                                <SettingsCheckUnselectedIcon className="h-4 w-4" />
                              )}
                            </div>
                          </button>
                          <button
                            onClick={() => setTheme("dark")}
                            key={"dark"}
                            className="flex w-56 items-center justify-start rounded-sp-14 p-4 hover:bg-sp-day-50 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
                          >
                            <MoonIcon className="h-5 w-5 -scale-x-100 text-sp-fawn" />
                            <div className="flex w-full justify-between">
                              <div className="ml-4">
                                <p className="font-medium text-sm">
                                  {t("dark")}
                                </p>
                              </div>
                              {theme === "dark" ? (
                                <SettingsCheckSelectedIcon className="h-4 w-4" />
                              ) : (
                                <SettingsCheckUnselectedIcon className="h-4 w-4" />
                              )}
                            </div>
                          </button>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <Link
                    href="mailto:hello@spiritus.app?subject=Contact Form - Spiritus.app"
                    className="flex w-56 items-center justify-start rounded-sp-14 p-4 hover:bg-sp-day-50 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
                  >
                    <div>
                      <SettingsQuestionIcon className="h-6 w-6 fill-sp-dark-fawn dark:fill-sp-white" />
                    </div>
                    <div className="flex w-full justify-between">
                      <div className="ml-4">
                        <p className="font-medium text-sm">{t("contact")}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
