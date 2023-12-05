import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { SearchIcon } from "@heroicons/react/outline";
import { ArrowCircleRightIcon } from "@heroicons/react/solid";
import { useTranslation } from "next-i18next";

import { MemoryGuardianIcon } from "../spiritus/Icons";

export function SearchBanner() {
  const { t } = useTranslation("common");

  return (
    <div className="z-40 mx-3.5 mt-6 flex flex-col items-center justify-center sm:mx-5 sm:mt-10 md:mx-0 md:mt-16 lg:mt-28 2xl:mt-36">
      <h1 className="mb-6 text-center font-bold leading-none subpixel-antialiased text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
        {t("create_memorial_title")}
      </h1>
      <div className="w-full md:max-w-md">
        <div className="mx-auto max-w-lg">
          <SearchInput />
          <p className="mt-2.5 text-center font-medium leading-5 text-sm">
            {t("search_memorials_subtitle_1")}{" "}
            <MemoryGuardianIcon
              className="inline-block h-5 w-5 fill-sp-day-200"
              aria-hidden="true"
            />
            <span className="font-medium"> 700k </span>
            <span> {t("search_memorials_subtitle_2")}</span>
          </p>
        </div>
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
      <div className="relative flex flex-grow flex-col focus-within:z-10">
        <div className="space-y-2 px-1">
          <div className="relative flex rounded-sp-10">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <SearchIcon
                className="h-5 w-5 text-sp-day-400"
                aria-hidden="true"
              />
            </div>
            <input
              value={searchTerm}
              maxLength={120}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              placeholder={t("search_memorials_placeholder")}
              className="block w-full rounded-sp-10 border-2 border-sp-day-400 bg-sp-day-50 p-3 pl-10 text-gray-900 placeholder-sp-day-400 outline-none ring-inset placeholder:text-sm dark:border-sp-gray dark:bg-sp-black dark:text-sp-white md:placeholder:text-base"
            />
          </div>
        </div>
        <div className="mt-2 flex overflow-hidden rounded-2xl border-5 border-sp-fawn/30 md:border-6">
          <Link
            className="flex w-full items-center justify-center bg-sp-black px-4 py-2 text-center font-medium text-sp-white dark:bg-sp-day-50 dark:text-sp-black md:text-lg xl:py-3"
            href={`/search?name=${searchTerm}`}
          >
            {t("search_placeholder")}
            <ArrowCircleRightIcon className="ml-3 inline-block h-6 w-6" />
          </Link>
        </div>
      </div>
    </div>
  );
}
