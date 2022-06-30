import { useState } from "react";

import { XIcon, ChevronDownIcon } from "@heroicons/react/outline";

export function MultiSelectInput({ items, selected, setSelected }) {
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
    <div className="w-full flex flex-col items-center mx-auto">
      <div className="w-full">
        <div className="flex flex-col items-center relative">
          <div className="w-full">
            <div className="flex appearance-none outline-none text-sp-black dark:text-sp-white">
              <div className="flex flex-auto flex-wrap gap-1 items-center">
                {!selected.length ? (
                  <p className="text-gray-500">Choose categories</p>
                ) : (
                  selected.map((tag, index) => {
                    return (
                      <div
                        key={index}
                        className="flex justify-center items-center font-medium px-2 py-1 rounded-2xl border border-sp-black dark:border-sp-lighter"
                      >
                        <div className="text-sm leading-none">{tag.value}</div>
                        <XIcon
                          className="w-4 h-4 ml-1"
                          onClick={() => removeItem(tag)}
                        />
                      </div>
                    );
                  })
                )}
              </div>
              <div
                className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l-2 flex items-center border-sp-medium"
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
      className="absolute top-10 right-0 w-full bg-sp-day-100 dark:bg-sp-black text-sp-black dark:text-sp-white z-40 rounded-lg border-2 border-sp-medium max-h-select"
    >
      <div className="flex flex-col w-full">
        {items.map((item, key) => {
          return (
            <div
              key={key}
              className="cursor-pointer hover:bg-sp-day-900 hover:bg-opacity-40 dark:hover:bg-sp-fawn dark:hover:bg-opacity-100 hover:text-sp-black rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                addItem(item);
              }}
            >
              <div className="flex w-full items-center p-2">
                <div className="w-full items-center flex">
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
