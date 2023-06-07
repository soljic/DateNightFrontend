import { Fragment } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { signOut, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

import {
  SettingsAccountIcon,
  SettingsDevicesIcon,
  SettingsGlobeIcon,
  SettingsGuardianIcon,
  SettingsQuestionIcon,
  SettingsSignOutIcon,
  SettingsSpiritusIcon,
  SettingsSuggestionsIcon,
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
      icon: <SettingsSpiritusIcon className="h-5 w-5 fill-sp-dark-fawn" />,
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
      icon: <SettingsGuardianIcon className="h-5 w-5 fill-sp-dark-fawn" />,
    },
    // {
    //   name: t("language"),
    //   href: "/",
    //   icon: <SettingsGlobeIcon width={5} height={5} />,
    // },
    {
      name: t("theme"),
      href: "/account/settings/theme",
      icon: <SettingsDevicesIcon className="h-5 w-5 fill-sp-dark-fawn" />,
    },
    {
      name: t("contact"),
      href: `mailto:hello@spiritus.app?subject=${`${
        session?.user?.name || ""
      } ${session?.user?.surname || ""} - Contact`}`,
      icon: <SettingsQuestionIcon className="h-5 w-5 fill-sp-dark-fawn" />,
    },
  ];

  return (
    <aside className="mx-4 flex flex-col gap-y-1 md:hidden">
      <div className="mx-auto mb-5 block text-center leading-4 text-sm">
        <p className="font-medium">{`${session?.user?.name || ""} ${
          session?.user?.surname || ""
        }`}</p>
        <p className="opacity-60">{session?.user?.email || ""}</p>
      </div>

      <div className="z-10 mb-10">
        <Popover>
          {({ open }) => (
            <>
              <Popover.Button className="flex w-full items-center justify-between rounded-sp-14 border border-sp-lighter px-3.5 py-3">
                <div className="flex w-full items-center justify-start">
                  {menuItems[selectedIndex].icon}
                  <div className="ml-4 p-2.5">
                    <p className="font-semibold leading-4 text-sm">
                      {menuItems[selectedIndex].name}
                    </p>
                  </div>
                </div>
                <ChevronDownIcon className="right-0 h-6 w-6 text-sp-lighter" />
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
                <Popover.Panel className="z-100 absolute mt-2 w-[91vw]">
                  <div className="overflow-hidden rounded-sp-14 border-2 border-sp-fawn bg-sp-day-300 text-sp-black shadow-lg dark:border-sp-medium dark:bg-sp-black dark:text-sp-white">
                    <div className="flex flex-col justify-evenly gap-y-1 p-3">
                      {menuItems.map((item, index) => (
                        <Link
                          href={item.href}
                          key={item.name}
                          className={`flex w-full items-center justify-start rounded-sp-14 p-4 ${
                            selectedIndex === index &&
                            "bg-sp-day-50 dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown"
                          } hover:bg-sp-day-50 dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown`}
                        >
                          {item.icon}
                          <div className="ml-4">
                            <p className="font-semibold leading-4 text-sm">
                              {item.name}
                            </p>
                          </div>
                        </Link>
                      ))}
                      <button
                        href="/contact"
                        onClick={() => logoutUser()}
                        className="flex w-full items-center justify-start rounded-sp-14 p-4 hover:bg-sp-day-50 focus:outline-none dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
                      >
                        <div>
                          <SettingsSignOutIcon />
                        </div>
                        <div className="ml-3 flex w-full justify-between">
                          <p className="font-semibold text-sp-cotta text-sm">
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
