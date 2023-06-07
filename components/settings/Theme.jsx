import { useEffect, useState } from "react";

import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { useTranslation } from "next-i18next";
import { useTheme } from "next-themes";

import {
  SettingsCheckSelectedIcon,
  SettingsCheckUnselectedIcon,
  SettingsDevicesIcon,
} from "../SettingsIcons";

export function Theme() {
  const { t } = useTranslation("settings");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="mx-4 mb-80 w-full">
      <h1 className="font-bold text-sp-black subpixel-antialiased text-2xl tracking-tight dark:text-sp-white">
        {t("theme")}
      </h1>
      {mounted && (
        <div className="flex flex-col justify-evenly gap-0.5 py-3">
          <button
            onClick={() => setTheme("system")}
            key={"system"}
            className="flex items-center justify-start rounded-t-sp-14 bg-gradient-to-r from-sp-day-300 to-sp-day-100 p-4 focus:outline-none dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown"
          >
            <SettingsDevicesIcon className="h-4 w-4 fill-sp-day-400" />
            <div className="flex w-full justify-between">
              <div className="ml-4">
                <p className="font-medium text-sm">{t("system")}</p>
              </div>
              {theme === "system" ? (
                <SettingsCheckSelectedIcon className="h-4 w-4" />
              ) : (
                <SettingsCheckUnselectedIcon className="h-4 w-4" />
              )}
            </div>
          </button>
          <button
            onClick={() => setTheme("light")}
            key={"light"}
            className="flex items-center justify-start bg-gradient-to-r from-sp-day-300 to-sp-day-100 p-4 focus:outline-none dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown"
          >
            <SunIcon className="h-5 w-5 text-sp-cotta" />
            <div className="flex w-full justify-between">
              <div className="ml-4">
                <p className="font-medium text-sm">{t("light")}</p>
              </div>
              {theme === "light" ? (
                <SettingsCheckSelectedIcon className="h-4 w-4" />
              ) : (
                <SettingsCheckUnselectedIcon className="h-4 w-4" />
              )}
            </div>
          </button>
          <button
            onClick={() => setTheme("dark")}
            key={"dark"}
            className="flex items-center justify-start rounded-b-sp-14 bg-gradient-to-r from-sp-day-300 to-sp-day-100 p-4 focus:outline-none dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown"
          >
            <MoonIcon className="h-5 w-5 -scale-x-100 text-sp-fawn" />
            <div className="flex w-full justify-between">
              <div className="ml-4">
                <p className="font-medium text-sm">{t("dark")}</p>
              </div>
              {theme === "dark" ? (
                <SettingsCheckSelectedIcon className="h-4 w-4" />
              ) : (
                <SettingsCheckUnselectedIcon className="h-4 w-4" />
              )}
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
