import Link from "next/link";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import { ViewGridAddIcon, TrashIcon } from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";

import {
  SettingsGuardianIcon,
  SettingsSpiritusIcon,
} from "../../SettingsIcons";

export function EditorLayout({ menuId, setMenuId, onDelete, children }) {
  const { t } = useTranslation("common");

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 mt-12">
      <div className="col-span-1">
        <p className="font-semibold text-lg p-5">
          {t("edit_spiritus_menu_title")}
        </p>
        <div className="hidden md:block md:col-span-1">
          <Sidebar menuId={menuId} setMenuId={setMenuId} onDelete={onDelete} />
        </div>
      </div>
      <div className="md:col-span-1 md:hidden">
        <MobileSidebar
          menuId={menuId}
          setMenuId={setMenuId}
          onDelete={onDelete}
        />
      </div>
      <div className="col-span-1 md:col-span-2">{children}</div>
    </div>
  );
}

function Sidebar({ menuId, setMenuId, onDelete }) {
  const { t } = useTranslation("common");

  const menuItems = [
    {
      id: 0,
      name: "Spiritus",
      icon: <SettingsSpiritusIcon width={5} height={5} />,
      active: true,
    },
    {
      id: 1,
      name: t("term_images"),
      active: true,
      icon: (
        <ViewGridAddIcon className="w-5 h-5 text-sp-dark-fawn dark:text-sp-white" />
      ),
    },
    {
      id: 2,
      name: t("term_guardians"),
      icon: <SettingsGuardianIcon width={5} height={5} />,
      active: false,
    },
  ];

  return (
    <aside className="flex flex-col justify-evenly gap-y-1 mr-2">
      {menuItems.map((item) =>
        item.active ? (
          <button
            onClick={() => {
              setMenuId(item.id);
            }}
            key={item.name}
          >
            <a
              className={`flex w-full justify-start items-center rounded-sp-14 p-4 ${
                menuId === item.id
                  ? "bg-gradient-to-r from-day-gradient-start to-day-gradient-stop dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown"
                  : ""
              } hover:bg-gradient-to-r hover:from-day-gradient-start hover:to-day-gradient-stop dark:hover:from-sp-dark-brown dark:hover:to-sp-brown`}
            >
              {item.icon}
              <div className="ml-4">
                <p className="text-sm font-semibold leading-4">{item.name}</p>
              </div>
            </a>
          </button>
        ) : (
          <button
            disabled
            key={item.name}
            className={`flex w-full justify-start items-center rounded-sp-14 p-4 opacity-40`}
          >
            {item.icon}
            <div className="ml-4">
              <p className="text-sm font-semibold leading-4">{item.name}</p>
            </div>
          </button>
        )
      )}
      <button
        onClick={() => onDelete()}
        className="flex w-full justify-start items-center text-sp-cotta hover:text-red-600 rounded-sp-14 p-4 hover:bg-gradient-to-r hover:from-day-gradient-start hover:to-day-gradient-stop dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none"
      >
        <TrashIcon className="w-5 h-5" />
        <div className="flex justify-between w-full ml-3">
          <p className="text-sm font-semibold">
            {t("term_delete")}
          </p>
        </div>
      </button>
    </aside>
  );
}

function MobileSidebar({ menuId, setMenuId, onDelete }) {
  const { t } = useTranslation("common");

  const menuItems = [
    {
      id: 0,
      name: "Spiritus",
      icon: <SettingsSpiritusIcon width={5} height={5} />,
      active: true,
    },
    {
      id: 1,
      name: t("term_images"),
      active: true,
      icon: (
        <ViewGridAddIcon className="w-5 h-5 text-sp-dark-fawn dark:text-sp-white" />
      ),
    },
    {
      id: 2,
      name: t("term_guardians"),
      icon: <SettingsGuardianIcon width={5} height={5} />,
      active: false,
    },
  ];

  return (
    <aside className="flex flex-col gap-y-1 mx-4 md:hidden">
      <div className="z-10 mb-10">
        <Popover>
          {({ open }) => (
            <>
              <Popover.Button className="w-full flex justify-between items-center rounded-sp-14 border border-sp-lighter px-3.5 py-3">
                <div className="flex w-full justify-start items-center">
                  {menuItems[menuId].icon}
                  <div className="ml-4 p-2.5">
                    <p className="text-sm font-semibold leading-4">
                      {menuItems[menuId].name}
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
                      {menuItems.map((item, index) =>
                        item.active ? (
                          <button
                            onClick={() => {
                              setMenuId(item.id);
                            }}
                            key={item.name}
                            className={`flex w-full justify-start items-center rounded-sp-14 p-4 ${
                              menuId === index &&
                              "bg-sp-day-50 dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown"
                            } dark:hover:bg-gradient-to-r hover:bg-sp-day-50 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown`}
                          >
                            {item.icon}
                            <div className="ml-4">
                              <p className="text-sm font-semibold leading-4">
                                {item.name}
                              </p>
                            </div>
                          </button>
                        ) : (
                          <button
                            disabled
                            onClick={() => {
                              setMenuId(item.id);
                            }}
                            key={item.name}
                            className={`flex w-full justify-start items-center rounded-sp-14 p-4 opacity-40`}
                          >
                            {item.icon}
                            <div className="ml-4">
                              <p className="text-sm font-semibold leading-4">
                                {item.name}
                              </p>
                            </div>
                          </button>
                        )
                      )}
                      <button
                        onClick={() => onDelete()}
                        className="flex w-full justify-start items-center rounded-sp-14 p-4 hover:bg-gradient-to-r hover:from-day-gradient-start hover:to-day-gradient-stop dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none"
                      >
                        <TrashIcon className="w-5 h-5 text-sp-cotta" />
                        <div className="flex justify-between w-full ml-3">
                          <p className="text-sm text-sp-cotta font-semibold">
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
