import Link from "next/link";
import { useRouter } from "next/router";

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

export function Sidebar({ selectedIndex }) {
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
    <aside className="mr-2 flex flex-col justify-evenly gap-y-1">
      <div className="mb-5 leading-4 text-sm">
        <p className="font-medium">{`${session?.user?.name || ""} ${
          session?.user?.surname || ""
        }`}</p>
        <p className="opacity-60">{session?.user?.email || ""}</p>
      </div>
      {menuItems.map((item, index) => (
        <Link
          href={item.href}
          key={item.name}
          className={`flex w-full items-center justify-start rounded-sp-14 p-4 ${
            selectedIndex === index &&
            "bg-sp-day-50 dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown"
          } hover:bg-gradient-to-r hover:from-day-gradient-start hover:to-day-gradient-stop dark:hover:from-sp-dark-brown dark:hover:to-sp-brown`}
        >
          {item.icon}
          <div className="ml-4">
            <p className="font-semibold leading-4 text-sm">{item.name}</p>
          </div>
        </Link>
      ))}
      <button
        onClick={() => logoutUser()}
        className="flex w-full items-center justify-start rounded-sp-14 p-4 hover:bg-gradient-to-r hover:from-day-gradient-start hover:to-day-gradient-stop focus:outline-none dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
      >
        <div>
          <SettingsSignOutIcon className="h-5 w-5 fill-sp-cotta" />
        </div>
        <div className="ml-3 flex w-full justify-between">
          <p className="font-semibold text-sp-cotta text-sm">{t("sign_out")}</p>
        </div>
      </button>
    </aside>
  );
}
