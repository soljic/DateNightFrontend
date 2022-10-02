import { useState, useEffect } from "react";

import { useTheme } from "next-themes";

import { useTranslation } from "next-i18next";

import { MoonIcon, SunIcon } from "@heroicons/react/solid";
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
      <h1 className="text-2xl font-bold subpixel-antialiased tracking-tight text-sp-black dark:text-sp-white">
        {t("theme")}
      </h1>
      {mounted && (
        <div className="flex flex-col justify-evenly gap-0.5 py-3">
          <button
            onClick={() => setTheme("system")}
            key={"system"}
            className="flex justify-start items-center rounded-t-sp-14 p-4 bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown focus:outline-none"
          >
            <SettingsDevicesIcon width={5} height={5} />
            <div className="flex justify-between w-full">
              <div className="ml-4">
                <p className="text-sm font-medium">{t("system")}</p>
              </div>
              {theme === "system" ? (
                <SettingsCheckSelectedIcon w={4} h={4} />
              ) : (
                <SettingsCheckUnselectedIcon w={4} h={4} />
              )}
            </div>
          </button>
          <button
            onClick={() => setTheme("light")}
            key={"light"}
            className="flex justify-start items-center p-4 bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown focus:outline-none"
          >
            <SunIcon className="w-5 h-5 text-sp-cotta" />
            <div className="flex justify-between w-full">
              <div className="ml-4">
                <p className="text-sm font-medium">{t("light")}</p>
              </div>
              {theme === "light" ? (
                <SettingsCheckSelectedIcon w={4} h={4} />
              ) : (
                <SettingsCheckUnselectedIcon w={4} h={4} />
              )}
            </div>
          </button>
          <button
            onClick={() => setTheme("dark")}
            key={"dark"}
            className="flex justify-start items-center rounded-b-sp-14 p-4 bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown focus:outline-none"
          >
            <MoonIcon className="h-5 w-5 text-sp-fawn -scale-x-100" />
            <div className="flex justify-between w-full">
              <div className="ml-4">
                <p className="text-sm font-medium">{t("dark")}</p>
              </div>
              {theme === "dark" ? (
                <SettingsCheckSelectedIcon w={4} h={4} />
              ) : (
                <SettingsCheckUnselectedIcon w={4} h={4} />
              )}
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
