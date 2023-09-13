import { useState } from "react";
import { Fragment } from "react";

import Image from "next/image";
import Link from "next/link";

import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon, SearchIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

import { LoginModal } from "../auth/Login";
import { AccesibilityMenu } from "./Accesibility";
import { NavItem, SubNavItem } from "./Common";
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
          <Link href="/" className="flex items-center" key="desktop-nav-home">
            <div className="rounded-sp-10 bg-white p-1 dark:bg-transparent">
              <div className="relative h-6 w-6">
                <Image src="/images/logo/spiritus.svg" fill alt="logo" />
              </div>
            </div>
            <div className="ml-2.5 font-semibold text-xl">Spiritus</div>
          </Link>
          <nav className="ml-3 flex items-center justify-center">
            <SubnavigationMenu
              title={t("about")}
              links={[
                { text: t("why-us"), href: "/why-us" },
                // { text: t("pricing"), href: "/pricing" },
                { text: t("our-story"), href: "/about" },
              ]}
            />
            <NavItem text={t("need-help")} link={"/need-help"} />
            <NavItem text={t("museums")} link={"/museums"} />
            <NavItem text={t("mobile")} link={"/mobile-app"} />
          </nav>
        </div>
        <div className="flex items-center justify-end space-x-1 md:w-1/3 md:space-x-2">
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
                className="flex h-10 w-36 items-center justify-center rounded-sp-10 bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn px-2.5 font-medium text-sp-white dark:from-sp-dark-fawn dark:to-sp-fawn"
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
                className="w-24 rounded-sp-10 border border-sp-day-200 px-3 py-2 text-center font-semibold hover:bg-gradient-to-r hover:from-sp-day-300 hover:to-sp-day-100 focus:outline-none dark:border-sp-medium dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
              >
                {t("login")}
              </button>
              <button
                onClick={openModal}
                className="flex h-10 w-36 items-center justify-center rounded-sp-10 bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn px-2.5 font-medium text-sp-white dark:from-sp-dark-fawn dark:to-sp-fawn"
              >
                {t("create_spiritus")}
              </button>
            </>
          )}

          <AccesibilityMenu />
        </div>
      </div>

      <MobileMenu key="mobile-home-nav" />
    </div>
  );
}

export function SubnavigationMenu({ title, links }) {
  const { t } = useTranslation(["settings", "common"]);

  return (
    <div className="z-30">
      <Popover>
        {({ open }) => (
          <>
            <Popover.Button className="flex items-center rounded-sp-10 p-2 hover:bg-gradient-to-r hover:from-sp-day-300 hover:to-sp-day-100 focus:outline-none dark:border-sp-medium dark:hover:from-sp-dark-brown dark:hover:to-sp-brown md:text-base xl:text-lg">
              {title}
              <ChevronDownIcon className="ml-1 h-5 w-5 text-sp-black dark:text-sp-white" />
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
              <Popover.Panel className="z-100 absolute mt-2">
                <div className="overflow-hidden rounded-sp-14 border-2 border-sp-day-400/50 bg-sp-day-50 text-sp-black shadow-lg dark:border-sp-medium dark:bg-sp-black dark:text-sp-white">
                  <div className="flex w-48 flex-col items-start justify-evenly gap-y-1 p-2">
                    {links.map((link) => (
                      <SubNavItem
                        text={link.text}
                        link={link.href}
                        key={link.href}
                      />
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
