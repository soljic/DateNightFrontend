import { Fragment, useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { Popover, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/outline";
import { signOut } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useCookies } from "react-cookie";

import { GetNotificationsCount } from "@/service/http/notifications";

import {
  SettingsAccountIcon,
  SettingsGuardianIcon,
  SettingsSignOutIcon,
  SettingsSpiritusIcon,
} from "../SettingsIcons";
import { UserIcon } from "./Icons";

// TODO: refactor this and Navbar so they share state
export function ProfileMenu({ token }) {
  const { t } = useTranslation(["settings", "common"]);
  const router = useRouter();

  const [notifications, setNotifications] = useState(0);
  // this is needed here so logoutUser can clear all cookies
  const [, , removeCookie] = useCookies("cookieConsent");

  useEffect(() => {
    const checkNotifications = async () => {
      if (token) {
        const { data } = await GetNotificationsCount(token);
        setNotifications(data?.count || 0);
      }
    };
    checkNotifications();
  }, []);

  const logoutUser = async () => {
    await signOut({ redirect: false });
    removeCookie("cookieConsent", { path: "/" });
    router.push("/").then(() => {
      router.reload();
    });
  };

  return (
    <div className="z-30">
      <Popover>
        {({ open }) => (
          <>
            <Popover.Button className="rounded-full p-2 hover:bg-gradient-to-r hover:from-sp-day-300 hover:to-sp-day-100 focus:outline-none dark:border-sp-medium dark:hover:from-sp-dark-brown dark:hover:to-sp-brown">
              <div className="relative">
                <UserIcon className="h-5 w-5 fill-sp-black dark:fill-sp-white" />
                {notifications > 0 && (
                  <div className="absolute -right-0.5 -top-1 h-2.5 w-2.5 rounded-full border-2 border-sp-white bg-red-500 dark:border-sp-black"></div>
                )}
              </div>
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
              <Popover.Panel className="z-100 absolute mt-2 -translate-x-48">
                <div className="overflow-hidden rounded-sp-14 border-2 border-sp-fawn bg-sp-day-300 text-sp-black shadow-lg dark:border-sp-medium dark:bg-sp-black dark:text-sp-white">
                  <div className="flex flex-col justify-evenly gap-y-1 p-3">
                    <Link
                      href="/account/settings/my-spiritus"
                      className="flex w-52 items-center justify-start rounded-sp-14 px-4 py-3  hover:bg-sp-day-50 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
                    >
                      <SettingsSpiritusIcon className="h-6 w-6 fill-sp-dark-fawn" />
                      <div className="ml-4">
                        <p className="font-medium text-sm">{t("spiritus")}</p>
                      </div>
                    </Link>

                    {/* <Link href="/">
                      <a className="flex w-52 justify-start items-center rounded-sp-14 px-4 py-3 dark:hover:bg-gradient-to-r hover:bg-sp-day-50 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none">
                        <BookmarkIcon className="w-5 h-5 text-sp-fawn dark:text-sp-white" />
                        <div className="ml-4">
                          <p className="text-sm font-medium">{t("saved")}</p>
                        </div>
                      </a>
                    </Link>
                    <Link href="/">
                      <a className="flex w-52 justify-start items-center rounded-sp-14 px-4 py-3 dark:hover:bg-gradient-to-r hover:bg-sp-day-50 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none">
                        <SettingsSuggestionsIcon width={5} height={5} />
                        <div className="ml-4">
                          <p className="text-sm font-medium">
                            {t("suggestions")}
                          </p>
                        </div>
                      </a>
                    </Link> */}
                    <Link
                      href="/account/settings/notifications"
                      className="flex w-52 items-center justify-start rounded-sp-14 px-4 py-3 hover:bg-sp-day-50 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
                    >
                      <div className="relative">
                        <BellIcon className="h-6 w-6 text-sp-dark-fawn" />
                        {notifications > 0 && (
                          <div className="absolute -right-0.5 -top-1 h-2.5 w-2.5 rounded-full border-2 border-sp-white bg-red-500 dark:border-sp-black"></div>
                        )}
                      </div>
                      <div className="ml-4">
                        <p className="font-medium text-sm">
                          {t("notifications")}
                        </p>
                      </div>
                    </Link>
                    <Link
                      href="/account/settings/my-guardian-id"
                      className="flex w-52 items-center justify-start rounded-sp-14 px-4 py-3 hover:bg-sp-day-50 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
                    >
                      <SettingsGuardianIcon className="h-6 w-6 fill-sp-dark-fawn" />
                      <div className="ml-4">
                        <p className="font-medium text-sm">
                          {t("guardian_id")}
                        </p>
                      </div>
                    </Link>
                    <Link
                      href="/account/settings/account"
                      className="flex w-52 items-center justify-start rounded-sp-14 px-4 py-3 hover:bg-sp-day-50 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
                    >
                      <SettingsAccountIcon className="h-6 w-6 fill-sp-dark-fawn" />
                      <div className="ml-4">
                        <p className="font-medium text-sm">{t("account")}</p>
                      </div>
                    </Link>
                    <button
                      onClick={() => logoutUser()}
                      className="flex w-52 items-center justify-start rounded-sp-14 p-4 hover:bg-sp-day-50 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
                    >
                      <div>
                        <SettingsSignOutIcon className="h-6 w-6 fill-sp-cotta" />
                      </div>
                      <div className="ml-3 flex w-full justify-between">
                        <p className="font-semibold text-sp-cotta text-sm">
                          {t("sign_out")}
                        </p>
                      </div>
                    </button>
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
