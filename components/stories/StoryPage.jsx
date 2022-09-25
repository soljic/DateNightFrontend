import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";

import {
  BookmarkIcon,
  UploadIcon,
  ReplyIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { RoseIcon, StoryHookIcon } from "../../components/Icons";

export function Tags({ tags }) {
  return (
    <div className="flex flex-row gap-3">
      {tags.map((t) => {
        return (
          <Link href={`/sections/id/${t.id}`} key={`tag-${t.id}`}>
            <a
              className="py-2 px-3 rounded-xl bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:from-sp-dark-brown dark:to-sp-brown text-sp-black dark:text-sp-white font-semibold text-sm lg:text-base"
            >
              {t.value}
            </a>
          </Link>
        );
      })}
    </div>
  );
}

export function Tribute() {
  const { t } = useTranslation("common");

  return (
    <div className="w-full mt-6 mb-4 text-sp-black dark:text-sp-white">
      <div className="flex flex-col justify-center gap-3">
        <label htmlFor="tribute" className="hidden">
          {t("write_tribute")}
        </label>
        <textarea
          id="tribute"
          type="text"
          rows="1"
          className="w-full text-xl py-4 px-8 text-bottom bg-sp-day-50 dark:bg-sp-black rounded-sp-40 border-3 border-sp-day-200 dark:border-sp-lighter placeholder-sp-lighter"
          placeholder={t("write_tribute")}
        ></textarea>

        <button
          rows="1"
          className="flex justify-center bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn dark:from-sp-dark-fawn dark:to-sp-fawn border-4 border-sp-day-200 dark:border-sp-medium border-opacity-80 rounded-sp-40 py-4 px-7"
        >
          <RoseIcon />
          <span className="text-lg font-semibold ml-1 text-sp-white dark:text-sp-black">
            {t("give_rose")}
          </span>
        </button>

        <div className="w-full mx-auto items-center pt-4 text-sp ">
          <div className="flex mx-auto justify-between space-x-3 lg:space-x-4">
            <button className="flex flex-col w-1/3 items-center hover:from-sp-day-300 hover:to-sp-day-100 hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown rounded-sp-10 p-4">
              <BookmarkIcon className="w-6 h-6" />
              {t("save")}
            </button>
            <button className="flex flex-col w-1/3 items-center hover:from-sp-day-300 hover:to-sp-day-100 hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown rounded-sp-10 p-4">
              <UploadIcon className="w-6 h-6" />
              {t("share")}
            </button>

            <button className="flex flex-col w-1/3 items-center hover:from-sp-day-300 hover:to-sp-day-100 hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown rounded-sp-10 p-4">
              <ReplyIcon className="w-6 h-6 -scale-x-100" />
              {t("next")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MoreStories({ stories, spiritus }) {
  const { t } = useTranslation("common");
  return (
    <section key={"stories-showcase"}>
      <div className=" my-10 text-sp-black dark:text-sp-white">
        <div className="flex w-full justify-between mb-5 items-center">
          <h1 className="font-semibold text-2xl">{t("stories")}</h1>
          <a
            href={`/create/story?spiritus=${spiritus.id}`}
            className="inline-flex bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn dark:from-sp-dark-fawn dark:to-sp-fawn rounded-full py-2 px-3 text-sp-white dark:text-sp-black"
          >
            <PlusCircleIcon className="h-6 w-6" />
            <span className="font-semibold ml-1">
              {t("cta_add_story_button")}
            </span>
          </a>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-3 md:gap-x-6 md:gap-y-6">
          {stories.map((s) => {
            return <StoryHook {...s} key={s.title} />;
          })}
        </div>
      </div>
    </section>
  );
}

export function StoryHook({ slug, title, subtitle, description, date }) {
  return (
    <div className="flex flex-col justify-between h-72 rounded-sp-14 bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:from-sp-dark-brown dark:to-sp-brown p-6 text-sp-black dark:text-sp-white">
      <div className="flex flex-col">
        <div className="inline-flex h-8 w-8 items-center rounded-full bg-sp-day-900 bg-opacity-10 dark:bg-sp-fawn dark:bg-opacity-10 p-1.5">
          <StoryHookIcon />
        </div>

        <Link
          href={`/stories/${slug}`}
        >
          <a className="text-lg py-1">{title}</a>
        </Link>
        <p className="tracking-sp-tighten text-sm">
          {subtitle || description}
        </p>
      </div>
      <div className="flex flex-col items-start">
        <p className="text-sp-lighter text-sm">{date || ""}</p>
      </div>
    </div>
  );
}

export function CTAAddMemory({ spiritusId,name }) {
  const { t } = useTranslation("common");

  return (
    <div className="w-full flex flex-row justify-between overflow-clip rounded-sp-14 border-3 border-sp-day-200 dark:border-sp-medium text-sp-black dark:text-sp-white">
      <div className="flex h-full flex-col py-3 pl-4">
        <h2 className="title-font py-1 text-xl font-medium">
          {t("cta_add_memory")}
          <span> {name}</span>?
        </h2>
        <p className="text-sp-lighter">{t("cta_add_memory_subtitle")}</p>
        <a href={`/create/story?spiritus=${spiritusId}`} className="mt-6 inline-flex items-center font-bold text-sp-day-900 dark:text-sp-fawn">
          {t("cta_add_memory_button")}
          <ChevronRightIcon className="w-4 h-4 text-sp-day-900 dark:text-sp-fawn" />
        </a>
      </div>
      <Image
        src={"/images/memory_cta_bg.png"}
        alt={"Add Memories Img"}
        width={130}
        height={130}
        layout="fixed"
      />
    </div>
  );
}
