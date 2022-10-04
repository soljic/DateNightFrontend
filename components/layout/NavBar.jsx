import { Fragment } from "react";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

import { Popover, Transition } from "@headlessui/react";
import { MenuIcon } from "@heroicons/react/solid";
import { SearchIcon } from "@heroicons/react/outline";

import { Logo, NavItem } from "./Common";
import { AccesibilityMenu } from "./Accesibility";
import { ProfileMenu } from "./Profile";
import { StoriesIcon, MobileAppIcon, AboutIcon } from "./Icons";

export function Navbar() {
  const { data: session } = useSession();
  const { t } = useTranslation(["common", "settings"]);

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
          <nav className="hidden ml-3 md:inline-flex">
            <NavItem text={t("stories")} link={"/"} />
            <NavItem text={t("mobile")} link={"/mobile-app"} />
            <NavItem text={t("about")} link={"/about"} />
          </nav>
        </div>

        <div className="inline-flex items-center gap-1 sm:gap-3">
          <Link href="/search">
            <a className="p-3 hover:bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none hover:rounded-full">
              <SearchIcon className="h-5 w-5 text-sp-black dark:text-sp-white" />
            </a>
          </Link>
          {session?.user.name ? (
            <ProfileMenu
              // token={session.user.accessToken}
              profileName={session?.user.name}
            />
          ) : (
            <Link href={session?.name ? "/account/settings" : "/auth/login"}>
              <a className="border border-sp-lighter dark:border-sp-medium hover:bg-gradient-to-r hover:from-sp-day-300 hover:to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none inline-flex justify-center rounded-sp-40 py-2 px-5 font-semibold">
                {session?.user?.name ? session.user.name : t("login")}
              </a>
            </Link>
          )}

          <AccesibilityMenu />
        </div>
      </div>
    </div>
  );
}

// MobileNav visibility is determined using media queries
// it is invisible on medium and larger screens and only visible on small screens.
export function MobileNav() {
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
    <div className="ml-3 md:hidden sm:visible z-30">
      <Popover>
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-full px-2 py-2 font-medium bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:from-sp-dark-brown dark:to-sp-brown`}
            >
              <MenuIcon
                className={`${open ? "" : "text-opacity-70"}
                  h-6 w-6 text-sp-cotta dark:text-sp-white transition duration-150 ease-in-out group-hover:text-opacity-80`}
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
              <Popover.Panel className="absolute z-100 mt-3 transform px-4 sm:px-0 max-w-md">
                <div className="overflow-hidden rounded-sp-14 shadow-lg bg-sp-day-300 border-sp-fawn dark:bg-sp-black border-2 dark:border-sp-medium text-sp-black dark:text-sp-white">
                  <div className="relative grid gap-6 p-6 grid-cols-1">
                    {menuItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-sp-14 px-2 py-4 transition duration-150 ease-in-out dark:hover:bg-gradient-to-r hover:bg-sp-day-50 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none"
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


