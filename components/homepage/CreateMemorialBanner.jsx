import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { ArrowCircleRightIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

import { LoginModal } from "../auth/Login";
import { MemoryGuardianIcon } from "../spiritus/Icons";
import { StarIcon, UsersIcon } from "./Icons";

const stats = [
  {
    icon: MemoryGuardianIcon,
    number: "1M+",
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

  return (
    <div className="mx-5 flex min-h-[40vh] items-center justify-center md:mx-0 lg:h-[55vh] lg:justify-center">
      <div className="flex w-full max-w-2xl flex-col items-center space-y-4 md:space-y-8 lg:items-start">
        <div className="max-w-lg">
          <CreateInputFields />
        </div>
      </div>
      <div className="hidden lg:block">
        <Image
          src="/images/img_spiritus_grid_alter.png"
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

function CreateInputFields() {
  const { t } = useTranslation("common");

  const { data: session } = useSession();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="z-40 mt-6 flex flex-col items-center sm:mx-5 md:items-start">
      <LoginModal isOpen={isOpen} closeModal={closeModal} />
      <h2 className="mb-5 text-center font-bold subpixel-antialiased text-3xl tracking-sp-tighten sm:text-4xl lg:text-start">
        {t("search_memorials_title")}
      </h2>
      <div className="mx-auto flex w-full flex-col md:max-w-md lg:mx-0">
        <h2 className="mb-2 text-sp-black subpixel-antialiased text-sm dark:text-sp-white md:font-medium md:text-base">
          {t("create_memorial_subtitle")}
        </h2>
        <div className="space-y-2">
          <div className="block rounded-sp-10">
            <input
              value={name}
              maxLength={50}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder={t("first_name")}
              className="w-full appearance-none rounded-sp-10 border-2 border-sp-day-400 bg-sp-day-50 p-2 placeholder-sp-day-400 outline-none dark:bg-sp-black dark:text-sp-white md:p-3"
            />
          </div>

          <div className="block rounded-sp-10">
            <input
              maxLength={50}
              value={surname}
              onChange={(e) => {
                setSurname(e.target.value);
              }}
              placeholder={t("last_name")}
              className="w-full appearance-none rounded-sp-10 border-2 border-sp-day-400 bg-sp-day-50 p-2 placeholder-sp-day-400 outline-none dark:bg-sp-black dark:text-sp-white md:p-3"
            />
          </div>
        </div>
        <div className="mt-2 flex overflow-hidden rounded-2xl border-5 border-sp-fawn/30 md:border-6">
          {!session?.user ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                openModal();
              }}
              className="flex w-full items-center justify-center bg-sp-black px-4 py-2 text-center font-medium text-sp-white dark:bg-sp-day-50 dark:text-sp-black md:text-lg xl:py-3"
            >
              {t("create_memorial")}
              <ArrowCircleRightIcon className="ml-3 inline-block h-6 w-6" />
            </button>
          ) : (
            <Link
              className="flex w-full items-center justify-center bg-sp-black px-4 py-2 text-center font-medium text-sp-white dark:bg-sp-day-50 dark:text-sp-black md:text-lg xl:py-3"
              href={`/create/spiritus?name=${name}&surname=${surname}`}
            >
              {t("create_memorial")}
              <ArrowCircleRightIcon className="ml-3 inline-block h-6 w-6" />
            </Link>
          )}
        </div>
        <div className="mx-auto flex w-full flex-wrap justify-center space-x-1 pt-2 md:space-x-4 lg:mx-0">
          {stats.map((elem, index) => (
            <div
              className="inline-flex items-center"
              key={`stat-elem-${index}`}
            >
              <elem.icon className="inline-block h-4 w-4 fill-sp-black dark:fill-sp-white md:h-5 md:w-5" />
              <span className="mx-1 font-medium text-sm md:font-semibold">
                {elem.number}
              </span>
              <span className="text-sm md:text-base">{t(elem.text)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
