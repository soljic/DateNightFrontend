import { Fragment } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Popover, Transition } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useTranslation } from "next-i18next";

import {
  SettingsGuardianIcon,
  SettingsSpiritusIcon,
} from "@/components/SettingsIcons";
import { ImagesIcon, StoryIcon } from "@/components/spiritus/Icons";

import { ArrowUpRightIcon, UserIcon } from "../layout/Icons";

const dateOptions = { year: "numeric", month: "short", day: "numeric" };
const baseHref = "/edit/spiritus";

const menuItems = [
  {
    id: 0,
    name: "Memorial",
    icon: (
      <SettingsSpiritusIcon className="h-5 w-5 fill-sp-day-400 dark:fill-sp-day-200" />
    ),
    href: "",
    active: true,
  },
  {
    id: 1,
    name: "term_images",
    icon: (
      <ImagesIcon className="h-5 w-5 fill-sp-day-400 dark:fill-sp-day-200" />
    ),
    href: "images",
    active: true,
  },
  {
    id: 2,
    name: "stories",
    icon: (
      <StoryIcon className="h-5 w-5 fill-sp-day-400 dark:fill-sp-day-200" />
    ),
    href: "stories",
    active: true,
  },
  {
    id: 3,
    name: "term_guardians",
    icon: (
      <SettingsGuardianIcon className="h-5 w-5 fill-sp-day-400 dark:fill-sp-day-200" />
    ),
    href: "guardians",
    active: true,
  },
];

export function EditorLayout({
  spiritusId,
  spiritusSlug,
  name,
  surname,
  birth,
  death,
  menuId,
  onDelete,
  children,
}) {
  const birthDate = birth ? new Date(birth) : null;
  const deathDate = death ? new Date(death) : null;
  const router = useRouter();

  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <div className="grid w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        <div className="col-span-1">
          <div className="hidden space-y-4 rounded-sp-10 border border-sp-day-200 px-3.5 py-6 md:col-span-1 md:block">
            <div className="px-1.5">
              <h2 className="font-medium">{`${name} ${surname}`}</h2>
              <p className="text-sp-day-400">
                {`${
                  birthDate
                    ? new Intl.DateTimeFormat(
                        router.locale || "en",
                        dateOptions
                      ).format(birthDate)
                    : "?"
                } - ${
                  deathDate
                    ? new Intl.DateTimeFormat(
                        router.locale || "en",
                        dateOptions
                      ).format(deathDate)
                    : "?"
                }`}
              </p>
            </div>
            <Sidebar
              menuId={menuId}
              spiritusId={spiritusId}
              spiritusSlug={spiritusSlug}
              onDelete={onDelete}
            />
          </div>
        </div>
        <div className="md:col-span-1 md:hidden">
          <MobileSidebar
            menuId={menuId}
            spiritusId={spiritusId}
            spiritusSlug={spiritusSlug}
            onDelete={onDelete}
          />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-3">{children}</div>
      </div>
    </div>
  );
}

function Sidebar({ menuId, spiritusId, spiritusSlug, onDelete }) {
  const { t } = useTranslation("common");

  return (
    <aside className="flex flex-col justify-evenly gap-y-1">
      <Link
        key="open-spiritus-link"
        href={`/spiritus/${spiritusSlug}`}
        className="mb-4 flex w-full items-center justify-between space-x-4 rounded-sp-5 border border-sp-day-400 p-3 hover:bg-gradient-to-r hover:from-day-gradient-start hover:to-day-gradient-stop dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
      >
        <div className="flex items-center justify-start space-x-4 ">
          <UserIcon className="h-5 w-5 fill-sp-day-400" />
          <p className="font-medium leading-4">{t("spiritus_view_spiritus")}</p>
        </div>
        <ArrowUpRightIcon className="h-4 w-4 fill-sp-day-400" />
      </Link>
      {menuItems.map((item) =>
        item.active ? (
          <Link
            key={item.name}
            href={`${baseHref}/${spiritusId}/${item.href}`}
            className={`flex w-full items-center justify-start space-x-4 rounded-sp-5 p-3 ${
              menuId === item.id
                ? "bg-gradient-to-r from-day-gradient-start to-day-gradient-stop dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown"
                : ""
            } hover:bg-gradient-to-r hover:from-day-gradient-start hover:to-day-gradient-stop dark:hover:from-sp-dark-brown dark:hover:to-sp-brown`}
          >
            {item.icon}
            <p className="font-medium leading-4">{t(item.name)}</p>
          </Link>
        ) : (
          <button
            disabled
            key={item.name}
            className={`flex w-full items-center justify-start rounded-sp-5 p-3 opacity-40`}
          >
            {item.icon}
            <div className="ml-4">
              <p className="font-medium leading-4">{t(item.name)}</p>
            </div>
          </button>
        )
      )}
      <button
        onClick={() => onDelete()}
        className="flex w-full items-center justify-start rounded-sp-5 p-3 hover:bg-gradient-to-r hover:from-day-gradient-start hover:to-day-gradient-stop dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
      >
        <TrashIcon className="h-5 w-5 text-sp-day-400 dark:text-sp-day-200" />
        <div className="ml-4 flex w-full justify-between">
          <p className="font-medium leading-4">{t("term_delete")} Spiritus</p>
        </div>
      </button>
    </aside>
  );
}

function MobileSidebar({ menuId, spiritusId, spiritusSlug, onDelete }) {
  const { t } = useTranslation("common");

  return (
    <aside className="mx-4 flex flex-col gap-y-1 md:hidden">
      <div className="z-10 mb-10">
        <Popover>
          {({ open }) => (
            <>
              <Popover.Button className="flex w-full items-center justify-between rounded-sp-14 border border-sp-lighter px-3.5 py-3">
                <div className="flex w-full items-center justify-start">
                  {menuItems[menuId].icon}
                  <div className="ml-4 p-2.5">
                    <p className="font-semibold leading-4 text-sm">
                      {t(menuItems[menuId].name)}
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
                <Popover.Panel className="z-100 absolute mt-2 w-[80vw]">
                  <div className="overflow-hidden rounded-sp-14 border-2 border-sp-fawn bg-sp-day-300 text-sp-black shadow-lg dark:border-sp-medium dark:bg-sp-black dark:text-sp-white">
                    <div className="flex flex-col justify-evenly gap-y-1 p-3">
                      <Link
                        key="open-spiritus-link"
                        href={`/spiritus/${spiritusSlug}`}
                        className="mb-4 flex w-full items-center justify-between space-x-4 rounded-sp-10 border border-sp-day-400 p-3 hover:bg-gradient-to-r hover:from-day-gradient-start hover:to-day-gradient-stop dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
                      >
                        <div className="flex items-center justify-start space-x-4 ">
                          <UserIcon className="h-5 w-5 fill-sp-day-400" />
                          <p className="font-medium leading-4">
                            {t("spiritus_view_spiritus")}
                          </p>
                        </div>
                        <ArrowUpRightIcon className="h-4 w-4 fill-sp-day-400" />
                      </Link>
                      {menuItems.map((item, index) =>
                        item.active ? (
                          <Link
                            href={`${baseHref}/${spiritusId}/${item.href}`}
                            key={item.name}
                            className={`flex w-full items-center justify-start rounded-sp-14 p-4 ${
                              menuId === index &&
                              "bg-sp-day-50 dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown"
                            } hover:bg-sp-day-50 dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown`}
                          >
                            {item.icon}
                            <div className="ml-4">
                              <p className="font-semibold leading-4 text-sm">
                                {t(item.name)}
                              </p>
                            </div>
                          </Link>
                        ) : (
                          <button
                            disabled
                            key={item.name}
                            className={`flex w-full items-center justify-start rounded-sp-14 p-4 opacity-40`}
                          >
                            {item.icon}
                            <div className="ml-4">
                              <p className="font-semibold leading-4 text-sm">
                                {t(item.name)}
                              </p>
                            </div>
                          </button>
                        )
                      )}
                      <button
                        onClick={() => onDelete()}
                        className="flex w-full items-center justify-start rounded-sp-14 p-4 hover:bg-gradient-to-r hover:from-day-gradient-start hover:to-day-gradient-stop focus:outline-none dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
                      >
                        <TrashIcon className="h-5 w-5 text-sp-cotta" />
                        <div className="ml-3 flex w-full justify-between">
                          <p className="font-semibold text-sp-cotta text-sm">
                            {t("term_delete")}
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
