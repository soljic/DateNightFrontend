import { useState } from "react";
import { Fragment } from "react";

import Link from "next/link";

import { Popover, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/outline";
import { MenuIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

import { LoginModal } from "../auth/Login";
import { AccesibilityMenu } from "./Accesibility";
import { Logo, NavItem } from "./Common";
import { AboutIcon, MobileAppIcon, StoriesIcon } from "./Icons";
import { MobileMenu } from "./MobileMenu";
import { ProfileMenu } from "./Profile";

export function Navbar() {
  const { data: session } = useSession();
  const { t } = useTranslation(["common", "settings", "about"]);

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="bg-sp-day-50 py-2 dark:bg-sp-black">
      <LoginModal isOpen={isOpen} closeModal={closeModal} />
      <div className="hidden w-full items-center justify-evenly px-3 text-sp-black dark:text-sp-white md:flex md:px-0">
        <div className="flex w-full items-center justify-start">
          <Link href="/" className="flex items-center">
            <div className="rounded-sp-10 bg-white p-0.5">
              <Logo />
            </div>
            <div className="ml-2.5 hidden font-semibold text-xl md:block">
              Spiritus
            </div>
          </Link>
          <nav className="ml-3 flex items-center justify-center">
            <NavItem text={t("stories")} link={"/"} />
            {/* {process?.env?.NEXT_API_URL === "https://walk.spiritusapp.com" ? (
              <NavItem text={t("menu_funeral_notices")} link={"/notices"} />
            ) : null} */}
            <NavItem text={t("mobile")} link={"/mobile-app"} />
            <NavItem text={t("about")} link={"/about"} />
          </nav>
        </div>
        <div className="flex w-full items-center justify-end space-x-1 md:space-x-2">
          <Link
            href="/search"
            className="from-sp-day-300 to-sp-day-100 p-2 hover:rounded-full hover:bg-gradient-to-r focus:outline-none dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
          >
            <SearchIcon className="h-6 w-6 text-sp-black dark:text-sp-white" />
          </Link>
          {session?.user.name ? (
            <>
              <Link
                href="/create/spiritus"
                className="flex h-10 items-center rounded-sp-10 bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn px-2.5 text-center font-medium leading-5 text-sp-white dark:from-sp-dark-fawn dark:to-sp-fawn"
              >
                {t("create_spiritus")}
              </Link>
              <ProfileMenu
                // token={session.user.accessToken}
                profileName={session?.user.name}
              />
            </>
          ) : (
            <>
              <button
                onClick={openModal}
                className="flex h-10 items-center rounded-sp-10 bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn px-2.5 text-center font-medium leading-5 text-sp-white dark:from-sp-dark-fawn dark:to-sp-fawn"
              >
                {t("create_spiritus")}
              </button>
              <button
                onClick={openModal}
                className="rounded-sp-10 border border-sp-day-200 px-3 py-2 text-center font-semibold hover:bg-gradient-to-r hover:from-sp-day-300 hover:to-sp-day-100 focus:outline-none dark:border-sp-medium dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
              >
                {t("login")}
              </button>
            </>
          )}

          <AccesibilityMenu />
        </div>
      </div>

      <MobileMenu />
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
    <div className="z-30 ml-3 block md:hidden">
      <Popover>
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-full bg-gradient-to-r from-sp-day-300 to-sp-day-100 px-2 py-2 font-medium dark:from-sp-dark-brown dark:to-sp-brown`}
            >
              <MenuIcon
                className={`${open ? "" : "text-opacity-70"}
                  h-6 w-6 text-sp-cotta transition duration-150 ease-in-out group-hover:text-opacity-80 dark:text-sp-white`}
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
              <Popover.Panel className="z-100 absolute mt-3 max-w-md transform px-4 sm:px-0">
                <div className="overflow-hidden rounded-sp-14 border-2 border-sp-fawn bg-sp-day-300 text-sp-black shadow-lg dark:border-sp-medium dark:bg-sp-black dark:text-sp-white">
                  <div className="relative grid grid-cols-1 gap-6 p-6">
                    {menuItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-sp-14 px-2 py-4 hover:bg-sp-day-50 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-start justify-center sm:h-12 sm:w-12">
                          <item.icon aria-hidden="true" fill="#ED9A4C" />
                        </div>
                        <div className="ml-4">
                          <p className="pb-0.5 font-semibold text-sm">
                            {t(item.name)}
                          </p>
                          <p className="text-opacity-75 text-sm">
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
