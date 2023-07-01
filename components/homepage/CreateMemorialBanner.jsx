import { useState } from "react";

import Link from "next/link";

import { ArrowCircleRightIcon } from "@heroicons/react/solid";
import { useTranslation } from "next-i18next";

import { MemoryGuardianIcon } from "../spiritus/Icons";

function StarIcon({ className }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9.10433 2.89899C9.47114 2.15574 10.531 2.15574 10.8978 2.89899L12.8282 6.81048L17.1448 7.43772C17.9651 7.55691 18.2926 8.56488 17.699 9.14342L14.5755 12.1881L15.3129 16.4872C15.453 17.3042 14.5956 17.9271 13.8619 17.5414L10.0011 15.5116L6.14018 17.5414C5.40655 17.9271 4.54913 17.3041 4.68924 16.4872L5.4266 12.1881L2.30308 9.14341C1.70956 8.56488 2.03708 7.55691 2.8573 7.43772L7.17389 6.81048L9.10433 2.89899Z"
        fill="currentColor"
      />
    </svg>
  );
}

function UsersIcon({ className }) {
  return (
    <svg
      width="16"
      height="15"
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9 8C10.1046 8 11 8.89543 11 10V11.5C11 13.5544 8.91195 15 5.5 15C2.08805 15 0 13.5544 0 11.5V10C0 8.89543 0.89543 8 2 8H9ZM14 8C15.1046 8 16 8.89543 16 10V10.5C16 12.5886 14.4317 14 11.5 14C11.3587 14 11.2206 13.9967 11.0856 13.9902C11.625 13.3625 11.9439 12.6041 11.9932 11.7387L12 11.5V10C12 9.3081 11.7658 8.67091 11.3723 8.16339L11.2353 7.99912L14 8ZM5.5 0C7.433 0 9 1.567 9 3.5C9 5.433 7.433 7 5.5 7C3.567 7 2 5.433 2 3.5C2 1.567 3.567 0 5.5 0ZM12.5 2C13.8807 2 15 3.11929 15 4.5C15 5.88071 13.8807 7 12.5 7C11.1193 7 10 5.88071 10 4.5C10 3.11929 11.1193 2 12.5 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

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
    <div className="z-40 mt-12 flex flex-col items-center lg:mt-16 xl:mt-20 2xl:mt-32">
      <h1 className="mb-8 text-center text-[44px] font-bold leading-tight subpixel-antialiased sm:text-5xl lg:text-6xl xl:text-7xl">
        {t("create_memorial_title")}
      </h1>
      <div className="w-full max-w-md space-y-2">
        <h2 className="font-medium text-sp-black subpixel-antialiased dark:text-sp-white">
          {t("create_memorial_subtitle")}
        </h2>
        <div className="block rounded-sp-10">
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder={t("first_name")}
            className="w-full appearance-none rounded-sp-10 border-2 border-sp-day-400 bg-sp-day-50 p-3 placeholder-sp-day-400 outline-none dark:border-sp-medium dark:bg-sp-black dark:text-sp-white"
          />
        </div>

        <div className="block rounded-sp-10">
          <input
            value={surname}
            onChange={(e) => {
              setSurname(e.target.value);
            }}
            placeholder={t("last_name")}
            className="w-full appearance-none rounded-sp-10 border-2 border-sp-day-400 bg-sp-day-50 p-3 placeholder-sp-day-400 outline-none dark:border-sp-medium dark:bg-sp-black dark:text-sp-white"
          />
        </div>
        <div>
          <div className="flex overflow-hidden rounded-sp-14 border-6 border-sp-fawn/20">
            <Link
              className="w-full bg-sp-black px-4 py-2 text-center font-medium text-sp-white text-lg dark:bg-sp-day-50 dark:text-sp-black"
              href="/create/spiritus"
            >
              {t("create_memorial")}
              <ArrowCircleRightIcon className="ml-3 inline-block h-6 w-6" />
            </Link>
          </div>
        </div>
        <div className="mx-auto flex w-full justify-center space-x-2 pt-2">
          {stats.map((elem, index) => (
            <div className="inline-flex" key={`stat-elem-${index}`}>
              <elem.icon className="inline-block h-5 w-5 fill-sp-black dark:fill-sp-white" />
              <span className="mx-1 font-semibold">{elem.number}</span>
              <span>{t(elem.text)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
