import { Fragment } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import Link from "next/link";

import { useTranslation } from "next-i18next";

import { Popover, Transition } from "@headlessui/react";

import {
  SettingsGuardianIcon,
  SettingsSignOutIcon,
  SettingsSpiritusIcon,
} from "../SettingsIcons";

import { UserIcon } from "./Icons";

export function ProfileMenu() {
  const { t } = useTranslation(["settings", "common"]);
  const router = useRouter();

  const logoutUser = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <div className="z-30">
      <Popover>
        {({ open }) => (
          <>
            <Popover.Button
              className="rounded-full p-2 hover:bg-gradient-to-r hover:from-sp-day-300 hover:to-sp-day-100 focus:outline-none dark:border-sp-medium dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
            >
              <UserIcon className="h-5 w-5 fill-sp-black dark:fill-sp-white" />
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
                    {/* <Link
                      href="/create/spiritus"
                      className="flex w-52 items-center justify-start rounded-sp-14 px-4 py-3 hover:bg-sp-day-50 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
                    >
                      <PlusCircleIcon className="h-5 w-5 fill-sp-dark-fawn dark:fill-sp-white" />
                      <div className="ml-4">
                        <p className="font-medium text-sm">
                          {t("common:create_spiritus")}
                        </p>
                      </div>
                    </Link> */}
                    <Link
                      href="/account/settings/my-spiritus"
                      className="flex w-52 items-center justify-start rounded-sp-14 px-4 py-3  hover:bg-sp-day-50 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
                    >
                      <SettingsSpiritusIcon className="w-6 h-6 fill-sp-dark-fawn" />
                      <div className="ml-4">
                        <p className="font-medium text-sm">{t("spiritus")}</p>
                      </div>
                    </Link>
                    {/* <Link href="/">
                      <a className="flex w-52 justify-start items-center rounded-sp-14 px-4 py-3 dark:hover:bg-gradient-to-r hover:bg-sp-day-50 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none">
                        <SettingsAccountIcon width={5} height={5} />
                        <div className="ml-4">
                          <p className="text-sm font-medium">{t("account")}</p>
                        </div>
                      </a>
                    </Link> */}
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
                      href="/account/settings/my-guardian-id"
                      className="flex w-52 items-center justify-start rounded-sp-14 px-4 py-3 hover:bg-sp-day-50 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
                    >
                      <SettingsGuardianIcon  className="w-6 h-6 fill-sp-dark-fawn" />
                      <div className="ml-4">
                        <p className="font-medium text-sm">
                          {t("guardian_id")}
                        </p>
                      </div>
                    </Link>
                    <button
                      onClick={() => logoutUser()}
                      className="flex w-52 items-center justify-start rounded-sp-14 p-4 hover:bg-sp-day-50 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
                    >
                      <div>
                        <SettingsSignOutIcon  className="w-6 h-6 fill-sp-cotta" />
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
