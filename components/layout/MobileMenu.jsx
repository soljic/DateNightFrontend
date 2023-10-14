import { Fragment, useContext, useEffect, useState } from "react";

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
import { signOut } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useTheme } from "next-themes";
import { useCookies } from "react-cookie";

import { CurrencyContext } from "@/hooks/currency";

import { cn } from "@/utils/cn";

import { UserIcon } from "../Icons";
import { SettingsDevicesIcon, SettingsSignOutIcon } from "../SettingsIcons";

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
  const { t } = useTranslation(["common", "settings"]);
  const { data: session } = useSession();
  // this is needed here so logoutUser can clear all cookies
  const [, , removeCookie] = useCookies("cookieConsent");

  const logoutUser = async () => {
    await signOut({ redirect: false });
    removeCookie("cookieConsent", { path: "/" });
    router.push("/").then(() => {
      router.reload();
    });
  };

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
    {
      name: "pricing",
      description: "pricing",
      href: "/pricing",
    },
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
                  <div className="p-2">
                    <QuickSettings />
                    {session?.user && (
                      <button
                        onClick={() => logoutUser()}
                        className="flex w-full items-center justify-start rounded-sp-10 p-3 hover:bg-sp-day-100 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
                      >
                        <div>
                          <SettingsSignOutIcon className="h-5 w-5 fill-sp-cotta" />
                        </div>
                        <div className="ml-3 flex w-full justify-between">
                          <p className="font-semibold text-sp-cotta text-sm">
                            {t("settings:sign_out")}
                          </p>
                        </div>
                      </button>
                    )}
                  </div>

                  <div className="p-2">
                    <SocialMedia />
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
  const { currency, updateCurrency } = useContext(CurrencyContext);

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
            <Disclosure.Panel className="grid grid-cols-2 items-center gap-1">
              <Link
                href={router.pathname}
                locale="en"
                className="flex items-center justify-center rounded-sp-10 p-4 font-medium hover:bg-sp-day-100 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
              >
                EN
              </Link>
              <Link
                href={router.pathname}
                locale="hr"
                className="flex items-center justify-center rounded-sp-10 p-4 font-medium hover:bg-sp-day-100 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
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
              <div className="flex w-full justify-between capitalize">
                {t("settings:currency")}
              </div>
              {open ? (
                <ChevronDownIcon className="h-5 w-5 text-sp-lighter" />
              ) : (
                <ChevronRightIcon className="h-5 w-5 text-sp-lighter" />
              )}
            </Disclosure.Button>
            <Disclosure.Panel className="grid grid-cols-2 items-center gap-1 py-1">
              <button
                onClick={() => updateCurrency("USD")}
                disabled={currency === "USD"}
                className={cn(
                  currency === "USD"
                    ? "pointer-events-none border border-sp-day-400"
                    : "",
                  "flex items-center justify-center rounded-sp-10 p-4 font-medium text-sm hover:bg-sp-day-100 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
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
                  "flex items-center justify-center rounded-sp-10 p-4 font-medium text-sm hover:bg-sp-day-100 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
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

function SocialMedia() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full flex-row justify-center space-x-12">
        <a
          href="https://www.facebook.com/spiritus.application/"
          target="_blank"
          rel="noreferrer"
          className="rounded-sp-10 p-3 hover:bg-sp-day-100 dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.6667 11.2497H13.75L14.5834 7.91638H11.6667V6.24971C11.6667 5.39138 11.6667 4.58305 13.3334 4.58305H14.5834V1.78305C14.3117 1.74722 13.2859 1.66638 12.2025 1.66638C9.94004 1.66638 8.33337 3.04721 8.33337 5.58305V7.91638H5.83337V11.2497H8.33337V18.333H11.6667V11.2497Z"
              fill="#948B84"
            />
          </svg>
        </a>
        <a
          href="https://www.instagram.com/spiritus.app/?hl=hr"
          target="_blank"
          rel="noreferrer"
          className="rounded-sp-10 p-3 hover:bg-sp-day-100 dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8566 1.66716C11.4647 1.66483 12.0728 1.67094 12.6808 1.6855L12.8425 1.69133C13.0291 1.698 13.2133 1.70633 13.4358 1.71633C14.3225 1.758 14.9275 1.898 15.4583 2.10383C16.0083 2.3155 16.4716 2.60216 16.935 3.0655C17.3586 3.48183 17.6865 3.98545 17.8958 4.54133C18.1016 5.07216 18.2416 5.678 18.2833 6.56466C18.2933 6.78633 18.3016 6.97133 18.3083 7.158L18.3133 7.31966C18.3281 7.92732 18.3345 8.53516 18.3325 9.143L18.3333 9.76466V10.8563C18.3353 11.4644 18.329 12.0726 18.3141 12.6805L18.3091 12.8422C18.3025 13.0288 18.2941 13.213 18.2841 13.4355C18.2425 14.3222 18.1008 14.9272 17.8958 15.458C17.6872 16.0145 17.3592 16.5185 16.935 16.9347C16.5183 17.3583 16.0144 17.6861 15.4583 17.8955C14.9275 18.1013 14.3225 18.2413 13.4358 18.283C13.2133 18.293 13.0291 18.3013 12.8425 18.308L12.6808 18.313C12.0728 18.3278 11.4647 18.3342 10.8566 18.3322L10.235 18.333H9.14412C8.536 18.335 7.92789 18.3287 7.31995 18.3138L7.15829 18.3088C6.96046 18.3017 6.76268 18.2933 6.56495 18.2838C5.67829 18.2422 5.07329 18.1005 4.54162 17.8955C3.98552 17.6866 3.48182 17.3587 3.06579 16.9347C2.64166 16.5182 2.31347 16.0143 2.10412 15.458C1.89829 14.9272 1.75829 14.3222 1.71662 13.4355C1.70734 13.2378 1.699 13.04 1.69162 12.8422L1.68745 12.6805C1.67209 12.0726 1.66514 11.4645 1.66662 10.8563V9.143C1.66429 8.53516 1.6704 7.92733 1.68495 7.31966L1.69079 7.158C1.69745 6.97133 1.70579 6.78633 1.71579 6.56466C1.75745 5.67716 1.89745 5.073 2.10329 4.54133C2.31276 3.98518 2.64159 3.4817 3.06662 3.06633C3.48236 2.64196 3.98575 2.31347 4.54162 2.10383C5.07329 1.898 5.67745 1.758 6.56495 1.71633L7.15829 1.69133L7.31995 1.68716C7.92761 1.67181 8.53544 1.66486 9.14329 1.66633L10.8566 1.66716ZM9.99995 5.83383C9.44787 5.82602 8.89975 5.92802 8.38743 6.13389C7.87512 6.33976 7.40882 6.64539 7.01566 7.03304C6.62249 7.42069 6.31029 7.88261 6.09719 8.39196C5.8841 8.90132 5.77436 9.44795 5.77436 10.0001C5.77436 10.5522 5.8841 11.0988 6.09719 11.6082C6.31029 12.1175 6.62249 12.5795 7.01566 12.9671C7.40882 13.3548 7.87512 13.6604 8.38743 13.8663C8.89975 14.0721 9.44787 14.1741 9.99995 14.1663C11.105 14.1663 12.1648 13.7273 12.9462 12.9459C13.7276 12.1645 14.1666 11.1047 14.1666 9.99966C14.1666 8.89459 13.7276 7.83479 12.9462 7.05338C12.1648 6.27198 11.105 5.83383 9.99995 5.83383ZM9.99995 7.5005C10.332 7.49438 10.662 7.55449 10.9706 7.67734C11.2792 7.80018 11.5602 7.98328 11.7973 8.21595C12.0343 8.44862 12.2226 8.72619 12.3512 9.03245C12.4797 9.3387 12.546 9.66751 12.546 9.99965C12.5461 10.3318 12.4799 10.6606 12.3515 10.9669C12.223 11.2732 12.0348 11.5509 11.7979 11.7836C11.5609 12.0164 11.2799 12.1996 10.9714 12.3225C10.6628 12.4454 10.3329 12.5057 10.0008 12.4997C9.33774 12.4997 8.70186 12.2363 8.23302 11.7674C7.76418 11.2986 7.50079 10.6627 7.50079 9.99966C7.50079 9.33662 7.76418 8.70074 8.23302 8.23189C8.70186 7.76305 9.33774 7.49966 10.0008 7.49966L9.99995 7.5005ZM14.375 4.58383C14.1061 4.59459 13.8519 4.70895 13.6655 4.90297C13.479 5.09699 13.3749 5.35561 13.3749 5.62466C13.3749 5.89372 13.479 6.15234 13.6655 6.34635C13.8519 6.54037 14.1061 6.65474 14.375 6.6655C14.6512 6.6655 14.9162 6.55575 15.1115 6.3604C15.3069 6.16505 15.4166 5.9001 15.4166 5.62383C15.4166 5.34756 15.3069 5.08261 15.1115 4.88726C14.9162 4.69191 14.6512 4.58216 14.375 4.58216V4.58383Z"
              fill="#948B84"
            />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/company/spiritus-memoria/"
          target="_blank"
          rel="noreferrer"
          className="rounded-sp-10 p-3 hover:bg-sp-day-100 dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.78329 4.1664C5.78306 4.60843 5.60726 5.03226 5.29454 5.34467C4.98182 5.65707 4.55781 5.83246 4.11579 5.83223C3.67376 5.83201 3.24992 5.65621 2.93752 5.34349C2.62511 5.03077 2.44973 4.60676 2.44995 4.16473C2.45017 3.72271 2.62598 3.29887 2.9387 2.98647C3.25141 2.67406 3.67542 2.49868 4.11745 2.4989C4.55948 2.49912 4.98331 2.67493 5.29572 2.98765C5.60812 3.30036 5.78351 3.72437 5.78329 4.1664ZM5.83329 7.0664H2.49995V17.4997H5.83329V7.0664ZM11.1 7.0664H7.78329V17.4997H11.0666V12.0247C11.0666 8.97473 15.0416 8.6914 15.0416 12.0247V17.4997H18.3333V10.8914C18.3333 5.74973 12.45 5.9414 11.0666 8.4664L11.1 7.0664Z"
              fill="#948B84"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
