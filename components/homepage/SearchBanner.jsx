import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { SearchIcon } from "@heroicons/react/outline";
import { useTranslation } from "next-i18next";

import { MemoryGuardianIcon } from "../spiritus/Icons";

const p1 = "Search for over";
const p2 = "memorials from biggest Croatian cemeteries.";

export function SearchBanner() {
  const { t } = useTranslation("common");

  return (
    <div className="mx-5 flex h-[40vh] items-center justify-center md:mx-0 lg:h-[55vh] lg:justify-evenly">
      <div className="flex w-full max-w-2xl flex-col items-center space-y-4 md:space-y-8 lg:items-start">
        <h2 className="text-center font-bold leading-none subpixel-antialiased text-3xl sm:text-4xl md:text-[44px] lg:text-start xl:text-5xl">
          {t("search_memorials_title")}
        </h2>
        <div className="max-w-[480px]">
          <SearchInput />
          <p className="mt-2.5 font-normal text-sm">
            {p1}{" "}
            <span className="font-medium">
              <MemoryGuardianIcon className="mr-0.5 inline-block h-5 w-5 fill-sp-black dark:fill-sp-white" />
              700k
            </span>{" "}
            {p2}
          </p>
        </div>
      </div>
      <div className="hidden lg:block">
        <Image
          src="/images/img_spiritus_grid.png"
          alt="popular-spiritus"
          className="aspect-auto h-auto max-h-story-mobile min-h-story-mobile w-full rounded-sp-14 object-cover lg:max-h-story-desktop"
          height={0}
          width={0}
          sizes="100vw"
        />
      </div>
    </div>
  );
}
function SearchInput() {
  const { t } = useTranslation("common");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <label htmlFor="search-spiritus" className="sr-only">
        {t("search_memorials_placeholder")}
      </label>
      <div className="hidden md:flex">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon
              className="h-5 w-5 text-sp-day-400"
              aria-hidden="true"
            />
          </div>
          <input
            type="search-spiritus"
            name="search-spiritus"
            id="search-spiritus"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="block w-full rounded-none rounded-l-sp-10 border-2 border-sp-day-400 bg-sp-day-50 p-3 pl-10 text-gray-900 placeholder-sp-day-400 outline-none ring-inset dark:border-sp-gray dark:bg-sp-black dark:text-sp-white"
            placeholder={`${t("search_placeholder")} Spiritus`}
          />
        </div>
        <Link
          type="button"
          href={`/search?name=${searchTerm}`}
          className="relative -ml-px inline-flex items-center rounded-r-sp-10 bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn px-4 py-3 font-semibold text-sp-white outline-none ring-inset focus:ring-2 focus:ring-sp-cotta dark:from-sp-dark-fawn dark:to-sp-fawn dark:text-sp-black"
        >
          {t("search_placeholder")}
        </Link>
      </div>
      <div className="flex flex-col space-y-2 md:hidden">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon
              className="h-5 w-5 text-sp-day-400"
              aria-hidden="true"
            />
          </div>
          <input
            type="search-spiritus"
            name="search-spiritus"
            id="search-spiritus"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="block w-full rounded-sp-10 border-2 border-sp-day-400 bg-sp-day-50 p-3 pl-10 text-gray-900 placeholder-sp-day-400 outline-none ring-inset dark:border-sp-gray dark:bg-sp-black dark:text-sp-white placeholder:text-sm md:placeholder:text-base"
            placeholder={`${t("search_memorials_placeholder")}`}
          />
        </div>
        <Link
          type="button"
          href={`/search?name=${searchTerm}`}
          className="relative flex items-center justify-center rounded-sp-10 bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn px-4 py-3 font-semibold text-sp-white outline-none ring-inset focus:ring-2 focus:ring-sp-cotta dark:from-sp-dark-fawn dark:to-sp-fawn dark:text-sp-black"
        >
          {t("search_placeholder")}
        </Link>
      </div>
    </div>
  );
}
