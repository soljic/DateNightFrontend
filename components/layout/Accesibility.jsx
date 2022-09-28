import { useState, useEffect, Fragment } from "react";

import { useTheme } from "next-themes";

import Link from "next/link";

import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/solid";
import { useTranslation } from "next-i18next";

import { Disclosure } from "@headlessui/react";
import { Popover, Transition } from "@headlessui/react";

import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import {
  CheckSelectedIcon,
  CheckUnselectedIcon,
  DevicesIcon,
  GlobeIcon,
  QuestionIcon,
} from "../Icons";

export function AccesibilityMenu() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation("common");

  // wait for component to mount to avoid hydration errs
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="z-10">
      <Popover>
        {({ open }) => (
          <>
            <Popover.Button
              className={`
				${open ? "" : "text-opacity-90"}
				items-center rounded-full px-2 py-2 font-medium border border-sp-lighter dark:border-sp-medium hover:bg-gradient-to-r hover:from-sp-day-300 hover:to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown`}
            >
              <DotsHorizontalIcon
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
              <Popover.Panel className="absolute -translate-x-3/4 z-100 mt-2 px-4">
                <div className="overflow-hidden rounded-sp-14 shadow-lg bg-sp-day-300 border-sp-fawn dark:bg-sp-black border-2 dark:border-sp-medium text-sp-black dark:text-sp-white">
                  <div className="flex flex-col justify-evenly gap-y-2 p-3">
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-56 justify-start items-center rounded-sp-14 p-4 dark:hover:bg-gradient-to-r hover:bg-sp-day-50 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none">
                            {open ? (
                              <ChevronLeftIcon className="w-5 h-5 text-sp-lighter" />
                            ) : (
                              <div>
                                <GlobeIcon />
                              </div>
                            )}
                            <div className="flex justify-between w-full">
                              <div className="ml-4">
                                <p className="text-sm font-medium capitalize">
                                  Language
                                </p>
                              </div>
                            </div>
                            {!open && (
                              <ChevronRightIcon className="w-6 h-6 text-sp-lighter" />
                            )}
                          </Disclosure.Button>
                          <Disclosure.Panel className="grid grid-cols-2 items-center">
                            <Link href="/" locale="en">
                              <a className="flex justify-center text-sm font-medium items-center rounded-sp-14 p-4 hover:bg-sp-day-50 dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none">
                                EN
                              </a>
                            </Link>
                            <Link href="/" locale="hr">
                              <a className="flex justify-center text-sm font-medium items-center rounded-sp-14 p-4 hover:bg-sp-day-50 dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none">
                                HR
                              </a>
                            </Link>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-56 justify-start items-center rounded-sp-14 p-4 dark:hover:bg-gradient-to-r hover:bg-sp-day-50 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none">
                            {open ? (
                              <ChevronLeftIcon className="w-5 h-5 text-sp-lighter" />
                            ) : (
                              <div>
                                <DevicesIcon />
                              </div>
                            )}
                            <div className="flex justify-between w-full">
                              <div className="ml-4">
                                <p className="text-sm font-medium capitalize">{`Theme (${theme})`}</p>
                              </div>
                            </div>
                            {!open && (
                              <ChevronRightIcon className="w-6 h-6 text-sp-lighter" />
                            )}
                          </Disclosure.Button>
                          <Disclosure.Panel>
                            <button
                              onClick={() => setTheme("system")}
                              key={"sys"}
                              className="flex w-56 justify-start items-center rounded-sp-14 p-4 hover:bg-sp-day-50 dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none"
                            >
                              <DevicesIcon width={5} height={5} />
                              <div className="flex justify-between w-full">
                                <div className="ml-4">
                                  <p className="text-sm font-medium">
                                    System
                                  </p>
                                </div>
                                {theme === "system" ? (
                                  <CheckSelectedIcon w={4} h={4} />
                                ) : (
                                  <CheckUnselectedIcon w={4} h={4} />
                                )}
                              </div>
                            </button>
                            <button
                              onClick={() => setTheme("light")}
                              key={"light"}
                              className="flex w-56 justify-start items-center rounded-sp-14 p-4 hover:bg-sp-day-50 dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none"
                            >
                              <SunIcon className="w-5 h-5 text-sp-cotta" />
                              <div className="flex justify-between w-full">
                                <div className="ml-4">
                                  <p className="text-sm font-medium">Light</p>
                                </div>
                                {theme === "light" ? (
                                  <CheckSelectedIcon w={4} h={4} />
                                ) : (
                                  <CheckUnselectedIcon w={4} h={4} />
                                )}
                              </div>
                            </button>
                            <button
                              onClick={() => setTheme("dark")}
                              key={"dark"}
                              className="flex w-56 justify-start items-center rounded-sp-14 p-4 hover:bg-sp-day-50 dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none"
                            >
                              <MoonIcon className="h-5 w-5 text-sp-fawn -scale-x-100" />
                              <div className="flex justify-between w-full">
                                <div className="ml-4">
                                  <p className="text-sm font-medium">Dark</p>
                                </div>
                                {theme === "dark" ? (
                                  <CheckSelectedIcon w={4} h={4} />
                                ) : (
                                  <CheckUnselectedIcon w={4} h={4} />
                                )}
                              </div>
                            </button>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                    <a
                      href="/contact"
                      className="flex w-56 justify-start items-center rounded-sp-14 p-4 dark:hover:bg-gradient-to-r hover:bg-sp-day-50 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none"
                    >
                      <div>
                        <QuestionIcon />
                      </div>
                      <div className="flex justify-between w-full">
                        <div className="ml-4">
                          <p className="text-sm font-medium">Contact Us</p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
