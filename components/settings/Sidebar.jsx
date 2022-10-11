import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";


import { signOut, useSession } from "next-auth/react";
import { BookmarkIcon } from "@heroicons/react/outline";
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

export function Sidebar({ selectedIndex }) {
  const { t } = useTranslation(["settings"]);

  const router = useRouter();
  const { data: session } = useSession();

  const logoutUser = async () => {
    await signOut({redirect: false});
    router.push("/")
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
      href: `mailto:hello@spiritus.app?subject=${`${session?.user?.name || ""} ${session?.user?.surname || "" } - Contact`}`,
      icon: <SettingsQuestionIcon width={5} height={5} />,
    },
  ];

  return (
    <aside className="flex flex-col justify-evenly gap-y-1 mr-2">
      <div className="text-sm leading-4 mb-5">
        <p className="font-medium">{`${session?.user?.name || ""} ${session?.user?.surname || "" }`}</p>
        <p className="opacity-60">{session?.user?.email || ""}</p>
      </div>
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
              <p className="text-sm font-semibold leading-4">{item.name}</p>
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
          <p className="text-sm text-sp-cotta font-semibold">{t("sign_out")}</p>
        </div>
      </button>
    </aside>
  );
}
