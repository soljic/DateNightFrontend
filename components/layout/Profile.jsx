import { Fragment } from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

import Link from "next/link";

import { useTranslation } from "next-i18next";

import { Popover, Transition } from "@headlessui/react";

import { BookmarkIcon } from "@heroicons/react/outline";
import {
  SettingsGuardianIcon,
  SettingsSignOutIcon,
  SettingsSpiritusIcon,
  SettingsSuggestionsIcon,
  SettingsAccountIcon,
} from "../SettingsIcons";

import { PlusCircleIcon } from "@heroicons/react/solid";

export function ProfileMenu({ token, profileName }) {
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
              className={`
				${open ? "" : "text-opacity-90"}
				border border-sp-lighter dark:border-sp-medium hover:bg-gradient-to-r hover:from-sp-day-300 hover:to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none inline-flex justify-center rounded-sp-40 py-2 px-5 font-semibold`}
            >
              {profileName}
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
              <Popover.Panel className="absolute -translate-x-1/2 z-100 mt-2">
                <div className="overflow-hidden rounded-sp-14 shadow-lg bg-sp-day-300 border-sp-fawn dark:bg-sp-black border-2 dark:border-sp-medium text-sp-black dark:text-sp-white">
                  <div className="flex flex-col justify-evenly gap-y-1 p-3">
                    <Link href="/create/spiritus">
                      <a className="flex w-52 justify-start items-center rounded-sp-14 px-4 py-3 dark:hover:bg-gradient-to-r hover:bg-sp-day-50 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none">
                        <PlusCircleIcon className="h-5 w-5 dark:fill-sp-white fill-sp-dark-fawn" />
                        <div className="ml-4">
                          <p className="text-sm font-medium">
                            {t("common:create_spiritus")}
                          </p>
                        </div>
                      </a>
                    </Link>
                    <Link href="/account/settings/my-spiritus">
                      <a className="flex w-52 justify-start items-center rounded-sp-14 px-4 py-3  dark:hover:bg-gradient-to-r hover:bg-sp-day-50 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none">
                        <SettingsSpiritusIcon width={5} height={5} />
                        <div className="ml-4">
                          <p className="text-sm font-medium">{t("spiritus")}</p>
                        </div>
                      </a>
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
                    <Link href="/account/settings/my-guardian-id">
                      <a className="flex w-52 justify-start items-center rounded-sp-14 px-4 py-3 dark:hover:bg-gradient-to-r hover:bg-sp-day-50 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none">
                        <SettingsGuardianIcon width={5} height={5} alterFill />
                        <div className="ml-4">
                          <p className="text-sm font-medium">
                            {t("guardian_id")}
                          </p>
                        </div>
                      </a>
                    </Link>
                    <button
                      onClick={() => logoutUser()}
                      className="flex w-52 justify-start items-center rounded-sp-14 p-4 dark:hover:bg-gradient-to-r hover:bg-sp-day-50 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none"
                    >
                      <div>
                        <SettingsSignOutIcon />
                      </div>
                      <div className="flex justify-between w-full ml-3">
                        <p className="text-sm text-sp-cotta font-semibold">
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
