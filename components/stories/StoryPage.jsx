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
    <div className="flex flex-row gap-3 px-2">
      {tags.map((t) => {
        return (
          <Link href={`/sections/id/${t.id}`}>
            <a
              key={t.id}
              className="py-2 px-3 rounded-xl bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:from-sp-dark-brown dark:to-sp-brown text-sp-black dark:text-sp-white font-semibold text-sm"
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
    <div className="container w-full mx-auto items-center px-14 py-8 mt-14 sm:px-2 lg:px-14 md:px-8 text-sp-black dark:text-sp-white">
      <div className="flex flex-col mx-auto gap-3">
        <label htmlFor="tribute" className="hidden">
          {t("write_tribute")}
        </label>
        <textarea
          id="tribute"
          type="text"
          rows="1"
          className="w-full text-2xl py-4 px-8 text-bottom bg-sp-day-50 dark:bg-sp-black rounded-[48px] border-3 border-sp-day-200 dark:border-sp-lighter placeholder-sp-lighter"
          placeholder={t("write_tribute")}
        ></textarea>

        <button
          rows="1"
          className="flex justify-center bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn dark:from-sp-dark-fawn dark:to-sp-fawn border-4 border-sp-day-200 dark:border-sp-medium border-opacity-80 rounded-[48px] py-4 px-7"
        >
          <RoseIcon />
          <span className="text-lg font-semibold ml-1 text-sp-white dark:text-sp-black">
            {t("give_rose")}
          </span>
        </button>

        <div className="container w-full mx-auto items-center px-14 py-4 text-sp ">
          <div className="flex mx-auto justify-around gap-4 ">
            <button className="flex flex-col w-1/3 items-center hover:from-sp-day-300 hover:to-sp-day-100 hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown rounded-lg p-4">
              <BookmarkIcon className="w-6 h-6" />
              {t("save")}
            </button>
            <button className="flex flex-col w-1/3 items-center hover:from-sp-day-300 hover:to-sp-day-100 hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown rounded-lg p-4">
              <UploadIcon className="w-6 h-6" />
              {t("share")}
            </button>

            <button className="flex flex-col w-1/3 items-center hover:from-sp-day-300 hover:to-sp-day-100 hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown rounded-lg p-4">
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
      <div className="container mx-auto px-5 pt-20 pb-10 text-sp-black dark:text-sp-white">
        <div className="mb-4 flex w-full flex-row justify-between items-center">
          <h1 className="font-semibold text-2xl sm:text-3xl">{t("stories")}</h1>
          <a
            href={`/create/story?spiritus=${spiritus.id}`}
            className="inline-flex bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn dark:from-sp-dark-fawn dark:to-sp-fawn rounded-full py-2 px-6 text-sp-white dark:text-sp-black"
          >
            <PlusCircleIcon className="h-6 w-6" />
            <span className="font-semibold ml-1">
              {t("cta_add_story_button")}
            </span>
          </a>
        </div>
        <div className="-m-4 flex flex-wrap">
          {stories.map((s) => {
            return <StoryHook {...s} key={s.title} />;
          })}
        </div>
      </div>
    </section>
  );
}

export function StoryHook({
  slug,
  title,
  subtitle,
  description,
  date,
}) {
  return (
    <div className="p-4 md:w-1/2 text-sp-black dark:text-sp-white">
      <div className="flex h-full flex-col rounded-lg bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:from-sp-dark-brown dark:to-sp-brown p-8">
        <div className="mr-3 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-sp-day-900 bg-opacity-10 dark:bg-sp-fawn dark:bg-opacity-10 p-1.5">
          <StoryHookIcon />
        </div>
        {/*  */}
        <Link
          // href={`/stories/spiritus/${spiritus.slug}?id=${spiritus.id}&story=${id}`}
          href={`/stories/${slug}`}
          >
          <a className="title-font text-xl font-bold py-1">{title}</a>
        </Link>
        <div className="flex-grow">
          <p className="text-base leading-relaxed">{subtitle || description}</p>
          <p className="mt-3 inline-flex items-center text-sp-lighter text-sm">
            {date || ""}
          </p>
        </div>
      </div>
    </div>
  );
}

export function CTAAddMemory({ name }) {
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-row justify-between rounded-2xl border-3 border-sp-day-200 dark:border-sp-medium text-sp-black dark:text-sp-white overflow-hidden">
      <div className="flex h-full flex-col py-3 pl-4">
        <h2 className="title-font py-1 text-xl font-medium">
          {t("cta_add_memory")}
          <span> {name}</span>?
        </h2>
        <p className="text-sp-lighter">{t("cta_add_memory_subtitle")}</p>
        <p className="mt-6 inline-flex items-center font-bold text-sp-day-900 dark:text-sp-fawn">
          {t("cta_add_memory_button")}
          <ChevronRightIcon className="w-4 h-4 text-sp-day-900 dark:text-sp-fawn" />
        </p>
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
