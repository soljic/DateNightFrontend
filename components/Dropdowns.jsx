import { useState } from "react";

import { ChevronDownIcon, XIcon } from "@heroicons/react/outline";
import { useTranslation } from "next-i18next";

export function MultiSelectInput({ items, selected, setSelected }) {
  const { t } = useTranslation("common");
  // state showing if dropdown is open or closed
  const [dropdown, setDropdown] = useState(false);

  const toogleDropdown = () => {
    setDropdown(!dropdown);
  };

  const addItem = (item) => {
    setSelected(selected.concat(item));
    setDropdown(false);
  };

  const removeItem = (item) => {
    const filtered = selected.filter((e) => e !== item);
    setSelected(filtered);
  };

  return (
    <div className="mx-auto flex w-full flex-col items-center">
      <div className="w-full">
        <div className="relative flex flex-col items-center">
          <div className="w-full">
            <div className="flex appearance-none text-sp-black outline-none dark:text-sp-white">
              <div className="flex flex-auto flex-wrap items-center gap-1">
                {!selected.length ? (
                  <p className="text-gray-500">
                    {t("create_story_tags_placeholder")}
                  </p>
                ) : (
                  selected.map((tag, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-center rounded-sp-10 border border-sp-day-400 px-2 py-1 font-medium"
                      >
                        <div className="leading-none text-sm">{tag.value}</div>
                        <XIcon
                          className="ml-1 h-4 w-4"
                          onClick={() => removeItem(tag)}
                        />
                      </div>
                    );
                  })
                )}
              </div>
              <div
                className="flex w-8 items-center py-1 pl-2 pr-1 text-gray-300"
                onClick={(e) => {
                  e.preventDefault();
                  toogleDropdown();
                }}
              >
                <button className="cursor-pointer text-gray-600 outline-none focus:outline-none">
                  <ChevronDownIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          {dropdown ? (
            <Dropdown
              items={items.filter((item) => !selected.includes(item))}
              addItem={addItem}
            ></Dropdown>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Dropdown({ items, addItem }) {
  return (
    <div
      id="dropdown"
      className="max-h-select absolute right-0 top-10 z-40 w-full rounded-lg border border-sp-day-400 bg-sp-day-100 text-sp-black dark:bg-sp-black dark:text-sp-white"
    >
      <div className="flex w-full flex-col">
        {items.map((item, key) => {
          return (
            <div
              key={key}
              className="cursor-pointer rounded-lg hover:bg-sp-day-900 hover:bg-opacity-40 hover:text-sp-black dark:hover:bg-sp-fawn dark:hover:bg-opacity-100"
              onClick={(e) => {
                e.preventDefault();
                addItem(item);
              }}
            >
              <div className="flex w-full items-center p-2">
                <div className="flex w-full items-center">
                  <div className="mx-2 leading-6">{item.value}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
