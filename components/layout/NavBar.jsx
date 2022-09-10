import { Fragment } from "react";
import { useTheme } from "next-themes";

import Link from "next/link";

import { Logo, NavItem } from "./Common";
import { GlobeAltIcon, SearchIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon, MoonIcon, SunIcon } from "@heroicons/react/solid";

const languages = [
  {
    code: "en",
    name: "English",
    country_code: "gb",
  },
  {
    code: "hr",
    name: "Hrvatski",
    country_code: "hr",
  },
];

export function Navbar() {
  const { data: session } = useSession();
  const { t } = useTranslation("common");

  return (
    <div className="bg-sp-day-50 dark:bg-sp-black h-20">
      <div className="flex justify-between py-4 text-sp-black dark:text-sp-white">
        <div className="inline-flex items-center">
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>
          <MobileNav />
          <nav className="inline-flex ml-3 sm:invisible md:visible invisible">
            <NavItem text={t("stories")} link={"/"} />
            <NavItem text={t("mobile")} link={"/mobile-app"} />
            <NavItem text={t("about")} link={"/about"} />
          </nav>
        </div>

        <div className="inline-flex items-center gap-3">
          <Link href="/search">
            <a className="p-3 hover:bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none hover:rounded-full">
              <SearchIcon className="h-6 w-6 tex-sp-black dark:text-sp-white" />
            </a>
          </Link>
          <Link href={session?.name ? "/account/settings" : "/auth/login"}>
            <a className="dark:bg-sp-medlight border border-sp-lighter dark:border-sp-medium hover:bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none inline-flex justify-center rounded-full py-2 px-6 font-semibold">
              {session?.user?.name ? session.user.name : t("login")}
            </a>
          </Link>
          {/* <GlobeAltIcon className="h-6 w-6 text-sp-white" /> */}
          <ThemeToggler />
        </div>
      </div>
    </div>
  );
}

// MobileNav visibility is determined using media queries
// it is invisible on medium and larger screens and only visible on small screens.
export default function MobileNav() {
  const { t } = useTranslation("common");

  const menuItems = [
    {
      name: "stories",
      // description: "The latest beautiful stories, memorials and anniversaries.",
      description: "m_desc_stories",
      href: "/",
      icon: StoriesIcon,
    },
    {
      name: "mobile",
      // description: "Download the app from Google Play and App Store.",
      description: "m_desc_mobile_app",
      href: "/mobile-app",
      icon: MobileAppIcon,
    },
    {
      name: "about",
      // description: "Learn more about Spiritus and our mission.",
      description: "m_desc_about",
      href: "/about",
      icon: AboutIcon,
    },
  ];

  return (
    <div className="ml-3 md:hidden sm:visible">
      <Popover>
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-full px-3 py-2 font-medium bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:from-sp-dark-brown dark:to-sp-brown`}
            >
              <span>Stories</span>
              <ChevronDownIcon
                className={`${open ? "" : "text-opacity-70"}
                  h-5 w-5 text-sp-cotta dark:text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
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
              <Popover.Panel className="absolute z-100 mt-3 transform px-4 sm:px-0 max-w-xs">
                <div className="overflow-hidden rounded-lg shadow-lg bg-sp-day-300 border-sp-fawn dark:bg-sp-black border-2 dark:border-sp-medium text-sp-black dark:text-sp-white">
                  <div className="relative grid gap-6 p-6 grid-cols-1">
                    {menuItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-lg px-2 py-4 transition duration-150 ease-in-out dark:hover:bg-gradient-to-r hover:bg-sp-day-50 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-start justify-center sm:h-12 sm:w-12">
                          <item.icon aria-hidden="true" fill="#ED9A4C" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-semibold pb-0.5">
                            {t(item.name)}
                          </p>
                          <p className="text-sm text-opacity-75">
                            {t(item.description)}
                          </p>
                        </div>
                      </a>
                    ))}
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

function StoriesIcon({ width, height, fill }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;
  return (
    <svg
      className={`${w} ${h}`}
      viewBox="0 0 12 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.5 5C3.22386 5 3 5.22386 3 5.5C3 5.77614 3.22386 6 3.5 6H8.5C8.77614 6 9 5.77614 9 5.5C9 5.22386 8.77614 5 8.5 5H3.5ZM3 8.5C3 8.22386 3.22386 8 3.5 8H8.5C8.77614 8 9 8.22386 9 8.5C9 8.77614 8.77614 9 8.5 9H3.5C3.22386 9 3 8.77614 3 8.5ZM3.5 11C3.22386 11 3 11.2239 3 11.5C3 11.7761 3.22386 12 3.5 12H5.5C5.77614 12 6 11.7761 6 11.5C6 11.2239 5.77614 11 5.5 11H3.5ZM2.5 0C2.22386 0 2 0.223858 2 0.5V1H1.5C0.671573 1 0 1.67157 0 2.5L0 14.5C0 15.3284 0.671573 16 1.5 16H7.5C7.63261 16 7.75979 15.9473 7.85355 15.8536L11.8536 11.8536C11.9473 11.7598 12 11.6326 12 11.5V2.5C12 1.67157 11.3284 1 10.5 1H10V0.5C10 0.223858 9.77614 0 9.5 0C9.22386 0 9 0.223858 9 0.5V1H6.5V0.5C6.5 0.223858 6.27614 0 6 0C5.72386 0 5.5 0.223858 5.5 0.5V1H3V0.5C3 0.223858 2.77614 0 2.5 0ZM10.5 2C10.7761 2 11 2.22386 11 2.5V11H8.5C7.67157 11 7 11.6716 7 12.5V15H1.5C1.22386 15 1 14.7761 1 14.5V2.5C1 2.22386 1.22386 2 1.5 2H10.5ZM10.2929 12L8 14.2929V12.5C8 12.2239 8.22386 12 8.5 12H10.2929Z"
        fill={fill || "#E3AA6D"}
      />
    </svg>
  );
}

function MobileAppIcon({ width, height, fill }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;
  return (
    <svg
      className={`${w} ${h}`}
      viewBox="0 0 10 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12C3.72386 12 3.5 12.2239 3.5 12.5C3.5 12.7761 3.72386 13 4 13H6C6.27614 13 6.5 12.7761 6.5 12.5C6.5 12.2239 6.27614 12 6 12H4ZM2 0C0.89543 0 0 0.895431 0 2L0 14C0 15.1046 0.895431 16 2 16H8C9.10457 16 10 15.1046 10 14V2C10 0.89543 9.10457 0 8 0L2 0ZM1 2C1 1.44772 1.44772 1 2 1H8C8.55228 1 9 1.44772 9 2V14C9 14.5523 8.55228 15 8 15H2C1.44772 15 1 14.5523 1 14V2Z"
        fill={fill || "#E3AA6D"}
      />
    </svg>
  );
}

function AboutIcon({ width, height, fill }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;
  return (
    <svg
      className={`${w} ${h}`}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.49206 6.91012C8.44972 6.67687 8.24557 6.49999 8.00011 6.49999C7.72397 6.49999 7.50011 6.72385 7.50011 6.99999V11.5021L7.50817 11.592C7.55051 11.8253 7.75465 12.0021 8.00011 12.0021C8.27626 12.0021 8.50011 11.7783 8.50011 11.5021V6.99999L8.49206 6.91012ZM8.79883 4.74999C8.79883 4.33578 8.46304 3.99999 8.04883 3.99999C7.63461 3.99999 7.29883 4.33578 7.29883 4.74999C7.29883 5.16421 7.63461 5.49999 8.04883 5.49999C8.46304 5.49999 8.79883 5.16421 8.79883 4.74999ZM16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8ZM1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8Z"
        fill={fill || "#E3AA6D"}
      />
    </svg>
  );
}

function ThemeSlider() {
  const { theme, setTheme } = useTheme();

  return (
    <label
      htmlFor="theme-toggle"
      className="relative inline-flex cursor-pointer items-center"
    >
      <input
        type="checkbox"
        value=""
        id="theme-toggle"
        className="peer sr-only"
      />
      <div
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className={`peer py-4 px-2 flex flex-row-reverse h-7 w-13
      items-center justify-between rounded-full
      border-2
      after:absolute after:left-[5px]
       after:h-6 after:w-6 after:rounded-full after:border
       after:bg-sp-lighter after:transition-all
       after:content-['']
       peer-checked:bg-sp-black
       peer-checked:after:translate-x-full
       peer-checked:after:border-black
       peer-focus:outline-none
       peer-hover:border-sp-fawn dark:border-sp-medium dark:bg-sp-white`}
      >
        <SunIcon className="w-5 h-5 text-sp-fawn" style={{ fill: "sp-fawn" }} />
        <MoonIcon className="h-5 w-5 text-gray-300" />
      </div>
    </label>
  );
}

function ThemeToggler() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation("common");

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded-full border-sp-lighter dark:border-sp-medium border dark:bg-sp-black hover:bg-sp-medlight focus:outline-none dark:hover:bg-sp-lighter"
    >
      <span className="sr-only">
        <span className="dark:hidden">{t("switch_theme_dark")}</span>
        <span className="hidden dark:inline">{t("switch_theme_light")}</span>
      </span>
      <MoonIcon className="h-5 w-5 text-gray-300 -scale-x-100 hidden dark:block" />
      <SunIcon className="w-5 h-5 text-sp-cotta dark:hidden" />
    </button>
  );
}
