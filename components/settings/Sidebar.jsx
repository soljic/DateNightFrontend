import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
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
  const router = useRouter();

  const logoutUser = async () => {
    // await ProxyLogout(token);
    await signOut({redirect: false});
    router.push("/")
  };

  const menuItems = [
    {
      name: "My Spiritus",
      href: "/account/settings/my-spiritus",
      icon: <SettingsSpiritusIcon width={5} height={5} />,
    },
    {
      name: "My Account",
      href: "/",
      icon: <SettingsAccountIcon width={5} height={5} />,
    },
    {
      name: "Saved",
      href: "/",
      icon: (
        <BookmarkIcon className="w-5 h-5 text-sp-fawn dark:text-sp-white" />
      ),
    },
    {
      name: "Suggestions",
      href: "/",
      icon: <SettingsSuggestionsIcon width={5} height={5} />,
    },
    {
      name: "My Guardian ID",
      href: "/account/settings/my-guardian-id",
      icon: <SettingsGuardianIcon width={5} height={5} />,
    },
    {
      name: "Language",
      href: "/",
      icon: <SettingsGlobeIcon width={5} height={5} />,
    },
    {
      name: "Theme",
      href: "/",
      icon: <SettingsDevicesIcon width={5} height={5} />,
    },
    {
      name: "Contact Us",
      href: "/",
      icon: <SettingsQuestionIcon width={5} height={5} />,
    },
  ];

  return (
    <aside className="flex flex-col justify-evenly gap-y-1 mr-2 sticky top-0">
      <div className="text-sm leading-4 mb-5">
        <p className="font-medium">John Doe</p>
        <p className="opacity-60">john@doe.email.com</p>
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
          <p className="text-sm text-sp-cotta font-semibold">Sign Out</p>
        </div>
      </button>
    </aside>
  );
}
