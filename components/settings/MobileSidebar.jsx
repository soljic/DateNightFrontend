import Link from "next/link";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { Popover, Transition } from "@headlessui/react";
import { useTranslation } from "next-i18next";


import { signOut, useSession } from "next-auth/react";
import { BookmarkIcon } from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";

import {
  SettingsGuardianIcon,
  SettingsSignOutIcon,
  SettingsSpiritusIcon,
  SettingsSuggestionsIcon,
  SettingsAccountIcon,
  SettingsDevicesIcon,
  SettingsGlobeIcon,
  SettingsQuestionIcon,
} from "../SettingsIcons";

export function MobileSidebar({ selectedIndex }) {
  const { t } = useTranslation(["settings"]);

  const router = useRouter();
  const { data: session } = useSession();

  const logoutUser = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const menuItems = [
    {
      name: t("spiritus"),
      href: "/account/settings/my-spiritus",
      icon: <SettingsSpiritusIcon width={5} height={5} />,
    },
    // {
    //   name: t("account"),
    //   href: "/",
    //   icon: <SettingsAccountIcon width={5} height={5} />,
    // },
    // {
    //   name: t("saved"),
    //   href: "/",
    //   icon: (
    //     <BookmarkIcon className="w-5 h-5 text-sp-fawn dark:text-sp-white" />
    //   ),
    // },
    // {
    //   name: t("suggestions"),
    //   href: "/",
    //   icon: <SettingsSuggestionsIcon width={5} height={5} />,
    // },
    {
      name: t("guardian_id"),
      href: "/account/settings/my-guardian-id",
      icon: <SettingsGuardianIcon width={5} height={5} />,
    },
    // {
    //   name: t("language"),
    //   href: "/",
    //   icon: <SettingsGlobeIcon width={5} height={5} />,
    // },
    {
      name: t("theme"),
      href: "/account/settings/theme",
      icon: <SettingsDevicesIcon width={5} height={5} />,
    },
    {
      name: t("contact"),
      href: `mailto:hello@spiritus.app?subject=${`${
        session?.user?.name || ""
      } ${session?.user?.surname || ""} - Contact`}`,
      icon: <SettingsQuestionIcon width={5} height={5} />,
    },
  ];

  return (
    <aside className="flex flex-col gap-y-1 mx-4 md:hidden">
      <div className="block mx-auto text-sm leading-4 mb-5 text-center">
        <p className="font-medium">{`${session?.user?.name || ""} ${
          session?.user?.surname || ""
        }`}</p>
        <p className="opacity-60">{session?.user?.email || ""}</p>
      </div>

      <div className="z-10 mb-10">
        <Popover>
          {({ open }) => (
            <>
              <Popover.Button className="w-full flex justify-between items-center rounded-sp-14 border border-sp-lighter px-3.5 py-3">
                <div className="flex w-full justify-start items-center">
                  {menuItems[selectedIndex].icon}
                  <div className="ml-4 p-2.5">
                    <p className="text-sm font-semibold leading-4">
                      {menuItems[selectedIndex].name}
                    </p>
                  </div>
                </div>
                <ChevronDownIcon className="w-6 h-6 text-sp-lighter right-0" />
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
                <Popover.Panel className="absolute z-100 mt-2 w-[91vw]">
                  <div className="overflow-hidden rounded-sp-14 shadow-lg bg-sp-day-300 border-sp-fawn dark:bg-sp-black border-2 dark:border-sp-medium text-sp-black dark:text-sp-white">
                    <div className="flex flex-col justify-evenly gap-y-1 p-3">
                      {menuItems.map((item, index) => (
                        <Link href={item.href} key={item.name}>
                          <a
                            className={`flex w-full justify-start items-center rounded-sp-14 p-4 ${
                              selectedIndex === index &&
                              "bg-sp-day-50 dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown"
                            } dark:hover:bg-gradient-to-r hover:bg-sp-day-50 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown`}
                          >
                            {item.icon}
                            <div className="ml-4">
                              <p className="text-sm font-semibold leading-4">
                                {item.name}
                              </p>
                            </div>
                          </a>
                        </Link>
                      ))}
                      <button
                        href="/contact"
                        onClick={() => logoutUser()}
                        className="flex w-full justify-start items-center rounded-sp-14 p-4 dark:hover:bg-gradient-to-r hover:bg-sp-day-50 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none"
                      >
                        <div>
                          <SettingsSignOutIcon />
                        </div>
                        <div className="flex justify-between w-full ml-3">
                          <p className="text-sm text-sp-cotta font-semibold">
                            Sign Out
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
    </aside>
  );
}
