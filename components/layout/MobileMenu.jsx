import { Fragment, useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { Disclosure, Popover, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/outline";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  XIcon,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useTheme } from "next-themes";

import { UserIcon } from "../Icons";
import { SettingsDevicesIcon } from "../SettingsIcons";

export function MobileMenu() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="flex w-full items-center justify-between space-x-2 text-sp-black dark:text-sp-white md:hidden md:px-2">
      <Link href="/" className="flex items-center">
        <div className="rounded-sp-10 bg-white p-2 dark:bg-transparent">
          <div className="relative h-6 w-6">
            <Image src="/images/logo/spiritus.svg" fill alt="logo" />
          </div>
        </div>
      </Link>
      {router.pathname !== "/search" ? <MobileSearch /> : null}
      <div className="flex">
        {session && session?.user ? (
          <Link
            href="/account/settings/my-spiritus"
            className="flex items-center rounded-sp-10 p-2 hover:bg-gradient-to-r hover:from-sp-day-300 hover:to-sp-day-100 focus:outline-none dark:border-sp-medium dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
          >
            <UserIcon className="h-5 w-5 text-sp-black dark:text-sp-white" />
          </Link>
        ) : null}
        <MobilePopover />
      </div>
    </div>
  );
}

// MobileNav visibility is determined using media queries
// it is invisible on medium and larger screens and only visible on small screens.
function MobilePopover() {
  const { t } = useTranslation("common");
  const { data: session } = useSession();

  const menuItems = [
    {
      name: "about",
      description: "m_desc_about",
      href: "/about",
    },
    {
      name: "need-help",
      description: "need-help",
      href: "/need-help",
    },
    {
      name: "museums",
      description: "museums",
      href: "/museums",
    },
    // {
    //   name: "pricing",
    //   description: "pricing",
    //   href: "/pricing",
    // },
    {
      name: "why-us",
      description: "why-us",
      href: "/why-us",
    },
    {
      name: "our-tech",
      description: "our-tech",
      href: "/our-tech",
    },
    {
      name: "mobile",
      description: "m_desc_mobile_app",
      href: "/mobile-app",
    },
  ];

  return (
    <div className="z-30">
      <Popover>
        {({ open }) => (
          <>
            <Popover.Button className="rounded-sp-10 p-2 hover:bg-gradient-to-r hover:from-sp-day-300 hover:to-sp-day-100 focus:outline-none dark:border-sp-medium dark:hover:from-sp-dark-brown dark:hover:to-sp-brown">
              {open ? (
                <XIcon
                  className="h-6 w-6 text-black transition duration-150 ease-in-out group-hover:text-opacity-80 dark:text-sp-white"
                  aria-hidden="true"
                />
              ) : (
                <MenuIcon
                  className="h-6 w-6 text-black transition duration-150 ease-in-out group-hover:text-opacity-80 dark:text-sp-white"
                  aria-hidden="true"
                />
              )}
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
              <Popover.Panel className="z-100 absolute w-64 -translate-x-52 overflow-hidden rounded-sp-10 border border-sp-day-200 bg-sp-day-50 font-medium drop-shadow-lg dark:border-sp-medium dark:bg-sp-black">
                <div className="flex flex-col items-center justify-center space-y-2 p-3">
                  <Link
                    href="/create/spiritus"
                    className="mt-1 w-full rounded-sp-10 bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn px-3 py-2 text-center font-medium text-sp-white dark:from-sp-dark-fawn dark:to-sp-fawn"
                  >
                    {t("create_spiritus")}
                  </Link>
                  {!session?.user?.name && (
                    <Link
                      href="/auth/login"
                      className="w-full rounded-sp-10 border border-sp-day-200 px-3 py-2 text-center font-semibold hover:bg-gradient-to-r hover:from-sp-day-300 hover:to-sp-day-100 focus:outline-none dark:border-sp-medium dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
                    >
                      {t("login")}
                    </Link>
                  )}
                </div>
                <div className="divide-y divide-sp-day-200 dark:divide-sp-medium">
                  <div className="p-2">
                    {menuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block rounded-sp-10 p-3 hover:bg-sp-day-100 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
                      >
                        {t(item.name)}
                      </Link>
                    ))}
                  </div>
                  <QuickSettings />
                  {/* <div className="flex items-center justify-center space-x-2 p-4">
                    <div className="">FB</div>
                    <div className="">IN</div>
                    <div className="">LI</div>
                  </div> */}
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}

function MobileSearch() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState(null);

  useEffect(() => {
    const debounce = setTimeout(async () => {
      if (searchTerm) {
        router.push(`/search?name=${searchTerm}`);
      }
    }, 1000);

    return () => {
      clearTimeout(debounce);
    };
  }, [searchTerm]);

  return (
    <div className="flex grow items-center overflow-hidden rounded-sp-10 border-sp-day-400 bg-sp-day-200 dark:border dark:border-sp-day-400 dark:bg-sp-black">
      <SearchIcon className="mx-2 h-5 w-5 text-sp-black dark:text-sp-white" />
      <input
        id="search-term"
        onChange={(e) => {
          e.preventDefault();
          setSearchTerm(e.target.value);
        }}
        value={searchTerm || ""}
        className="w-full bg-inherit p-1.5 text-sp-black placeholder-sp-lighter caret-sp-fawn outline-none text-lg dark:text-sp-white"
        type="text"
        placeholder={t("search_placeholder")}
      />
      {!!searchTerm && (
        <button onClick={() => setSearchTerm("")} className="mr-3">
          <XIcon className="h-5 w-5 text-sp-lighter dark:text-sp-white" />
        </button>
      )}
    </div>
  );
}

function QuickSettings() {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation("settings");

  // wait for component to mount to avoid hydration errs
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col justify-evenly p-2 font-medium">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="inline-flex items-center rounded-sp-10 p-3 hover:bg-sp-day-100 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown">
              <div className="flex w-full justify-between capitalize">
                {t("settings:language")}
              </div>
              {open ? (
                <ChevronDownIcon className="h-5 w-5 text-sp-lighter" />
              ) : (
                <ChevronRightIcon className="h-5 w-5 text-sp-lighter" />
              )}
            </Disclosure.Button>
            <Disclosure.Panel className="inline-flex items-start space-x-2 px-2">
              <Link
                href={router.pathname}
                locale="en"
                className="flex items-center justify-center rounded-sp-10 p-3 font-medium hover:bg-sp-day-100 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
              >
                EN
              </Link>
              <Link
                href={router.pathname}
                locale="hr"
                className="flex items-center justify-center rounded-sp-10 p-3 font-medium hover:bg-sp-day-100 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
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
            <Disclosure.Button className="inline-flex items-center rounded-sp-10 p-3 hover:bg-sp-day-100 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown">
              <div className="flex w-full justify-start font-medium capitalize">
                {t("theme")}{" "}
                <span className="ml-1 text-sp-day-400">({t(theme)})</span>
              </div>
              {open ? (
                <ChevronDownIcon className="h-5 w-5 text-sp-lighter" />
              ) : (
                <ChevronRightIcon className="h-5 w-5 text-sp-lighter" />
              )}
            </Disclosure.Button>
            <Disclosure.Panel className="space-y-2">
              <button
                onClick={() => setTheme("system")}
                key={"sys"}
                className={`${
                  theme === "system"
                    ? "bg-sp-day-200  dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown"
                    : ""
                } flex w-full items-center justify-start rounded-sp-10 px-4 py-2 hover:bg-sp-day-100 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown`}
              >
                <SettingsDevicesIcon className="mr-2 h-5 w-5 fill-sp-black text-sp-black dark:fill-sp-white" />
                <div className="flex w-full justify-between font-medium">
                  {t("system")}
                </div>
              </button>
              <button
                onClick={() => setTheme("light")}
                key={"light"}
                className={`${
                  theme === "light"
                    ? "bg-sp-day-200  dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown"
                    : ""
                } flex w-full items-center justify-start rounded-sp-10 px-4 py-2 hover:bg-sp-day-100 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown`}
              >
                <SunIcon className="mr-2 h-5 w-5 text-sp-cotta" />
                <div className="flex w-full justify-between font-medium">
                  {t("light")}
                </div>
              </button>
              <button
                onClick={() => setTheme("dark")}
                key={"dark"}
                className={`${
                  theme === "dark"
                    ? "bg-sp-day-200  dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown"
                    : ""
                } flex w-full items-center justify-start rounded-sp-10 px-4 py-2 hover:bg-sp-day-100 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown`}
              >
                <MoonIcon className="mr-2 h-5 w-5 -scale-x-100 text-sp-fawn" />
                <div className="flex w-full justify-between">{t("dark")}</div>
              </button>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Link
        href="mailto:hello@spiritus.app?subject=Contact Form - Spiritus.app"
        className="inline-flex items-center rounded-sp-10 p-3 hover:bg-sp-day-100 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
      >
        <div className="flex w-full justify-between font-medium">
          {t("contact")}
        </div>
      </Link>
    </div>
  );
}
