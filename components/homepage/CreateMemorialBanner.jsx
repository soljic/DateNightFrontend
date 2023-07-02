import { useState } from "react";

import Link from "next/link";

import { ArrowCircleRightIcon } from "@heroicons/react/solid";
import { useTranslation } from "next-i18next";

import { MemoryGuardianIcon } from "../spiritus/Icons";
import { StarIcon, UsersIcon } from "./Icons";

const stats = [
  {
    icon: MemoryGuardianIcon,
    number: "700k",
    text: "memorials_count_text",
  },
  {
    icon: UsersIcon,
    number: "10k",
    text: "users_count_text",
  },
  {
    icon: StarIcon,
    number: "4.9",
    text: "rating_count_text",
  },
];

export function CreateMemorialBanner() {
  const { t } = useTranslation("common");

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  return (
    <div className="z-40 mx-5 mt-24 flex flex-col items-center md:mx-0 2xl:mt-32">
      <h1 className="mb-8 text-center text-[44px] font-bold leading-tight subpixel-antialiased sm:text-5xl lg:text-6xl xl:text-7xl">
        {t("create_memorial_title")}
      </h1>
      <div className="w-full md:max-w-md">
        <h2 className="mb-2 px-4 font-medium text-sp-black subpixel-antialiased dark:text-sp-white">
          {t("create_memorial_subtitle")}
        </h2>
        <div className="space-y-2 px-1">
          <div className="block rounded-sp-10">
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder={t("first_name")}
              className="w-full appearance-none rounded-sp-10 border-2 border-sp-day-400 bg-sp-day-50 p-3 placeholder-sp-day-400 outline-none dark:bg-sp-black dark:text-sp-white"
            />
          </div>

          <div className="block rounded-sp-10">
            <input
              value={surname}
              onChange={(e) => {
                setSurname(e.target.value);
              }}
              placeholder={t("last_name")}
              className="w-full appearance-none rounded-sp-10 border-2 border-sp-day-400 bg-sp-day-50 p-3 placeholder-sp-day-400 outline-none dark:bg-sp-black dark:text-sp-white"
            />
          </div>
        </div>
        <div className="mt-2 flex overflow-hidden rounded-2xl border-6 border-sp-fawn/30">
          <Link
            className="w-full bg-sp-black px-4 py-2 text-center font-medium text-sp-white text-lg dark:bg-sp-day-50 dark:text-sp-black xl:py-3"
            href={`/create/spiritus?name=${name}&surname=${surname}`}
          >
            {t("create_memorial")}
            <ArrowCircleRightIcon className="ml-3 inline-block h-6 w-6" />
          </Link>
        </div>
      </div>
      <div className="mx-auto flex w-full flex-wrap justify-center space-x-2 pt-2">
        {stats.map((elem, index) => (
          <div className="inline-flex" key={`stat-elem-${index}`}>
            <elem.icon className="inline-block h-5 w-5 fill-sp-black dark:fill-sp-white" />
            <span className="mx-1 font-semibold">{elem.number}</span>
            <span>{t(elem.text)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
