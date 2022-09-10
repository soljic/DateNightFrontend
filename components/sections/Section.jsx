import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import { useTranslation } from "next-i18next";

import { ArrowLeftIcon, StarIcon } from "@heroicons/react/outline";

import { FilterIcon, StoryHookIcon } from "../../components/Icons";
import { Spinner } from "../../components/Status";

import { ProxyGetSection } from "../../service/http/proxy";

export function SectionGrid({ id, title, isLastPage, initialItems }) {
  const { t } = useTranslation("common");
  const [current, setCurrent] = useState(0);
  const [isLast, setIsLast] = useState(isLastPage);
  const [items, setItems] = useState(initialItems);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async () => {
    setIsLoading(true);

    try {
      const res = await ProxyGetSection(id, current + 1);
      setItems((prev) => [...prev, ...res.data.items.content]);
      setCurrent((current) => current + 1);
      setIsLast(res.data.items.last);
      setIsLoading(false);
    } catch (err) {
      // TODO: handle this
      console.log(err.message);
    }
  };

  return (
    <div className="container w-full xl:w-3/5 mx-auto flex flex-col items-center mt-16 mb:8 lg:mb-24 lg:mt-12">
      <div className="flex flex-col items-center mb-32">
        <h1 className="text-5xl font-extrabold tracking-tight text-sp-black dark:text-sp-white">
          {title}
        </h1>

        <p className="text-sp-lighter dark:text-sp-lighter mt-2">
          The best stories that we think are on Spiritus.
        </p>

        <div className="inline-flex mt-6 items-center gap-3">
          <Link href="/">
            <a className="dark:bg-sp-medlight border border-sp-lighter dark:border-sp-medium hover:bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none inline-flex items-center gap-1 rounded-full py-2 px-4 font-semibold">
              <ArrowLeftIcon className="w-4 h-4" /> {t("stories")}
            </a>
          </Link>

          <div className="border-r-3 h-5 w-1 border-sp-brown rounded-sm"></div>

          <button className="dark:bg-sp-medlight border border-sp-lighter dark:border-sp-medium hover:bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none inline-flex items-center gap-1 rounded-full py-2 px-4 font-semibold">
            <StarIcon className="w-4 h-4 text-sp-black dark:text-sp-white" />{" "}
            {t("action_favourite")}
          </button>
          <button className="dark:bg-sp-medlight border border-sp-lighter dark:border-sp-medium hover:bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none inline-flex items-center gap-1 rounded-full py-2 px-4 font-semibold">
            <FilterIcon width={4} height={4} /> {t("Filter")}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:gap-x-10 mb-14">
        {items.map((item) => {
          if (item.imageUrl) {
            return (
              <SectionTile
                key={item.itemId}
                itemId={item.itemId}
                title={item.title}
                subtitle={item.subtitle}
                // mapping is weird and all over the place
                // due to BE respones being weird
                itemType={item.itemNavigationType}
                imageUrl={item.imageUrl}
              />
            );
          }
          return (
            <PlaceHolderTile
              key={item.itemId}
              story_id={item.itemId}
              text={item.placeholderText}
            />
          );
        })}
      </div>

      {!isLast && (
        <button
          onClick={() => {
            loadMore();
          }}
          disabled={isLast}
          className="dark:bg-sp-medlight border border-sp-lighter dark:border-sp-medium hover:bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none rounded-full py-3 px-8 font-semibold cursor-pointer"
        >
          {isLoading ? <Spinner text={t("loading")} /> : t("action_load_more")}
        </button>
      )}
    </div>
  );
}

function PlaceHolderTile({ story_id, text }) {
  return (
    <Link href={`/stories/id/${story_id}`} key={story_id}>
      <a className="flex flex-col justify-between w-full bg-gradient-to-r from-sp-dark-brown to-sp-brown h-80 mx-auto border-3 dark:border-none rounded-xl p-8">
        <p className="text-sp-lighter dark:text-sp-white text-sm">{text}</p>
        <div className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sp-day-900 bg-opacity-10 dark:bg-sp-fawn dark:bg-opacity-10 p-1.5">
          <StoryHookIcon />
        </div>
      </a>
    </Link>
  );
}

// Render a Link to SPIRITUS or STORY depending on itemType.
function SectionTile({ itemId, title, subtitle, imageUrl, itemType }) {
  return itemType === "SPIRITUS_DETAILS" ? (
    <Link href={`/spiritus/${itemId}`} key={title}>
      <a className="group">
        <div className="group-hover:opacity-75">
          <Image
            src={imageUrl}
            className="object-cover rounded-sp-14"
            width={220}
            height={248}
            layout="responsive"
          />
        </div>
        <div className="mt-2 flex flex-col justify-between">
          <h3 className="text-lg dark:text-sp-white">{title}</h3>
          <p className="mt-1 dark:text-sp-white dark:text-opacity-60">
            {subtitle}
          </p>
        </div>
      </a>
    </Link>
  ) : (
    <Link href={`/stories/${itemId}`} key={title}>
      <a className="group">
        <div className="rounded-xl overflow-hidden group-hover:opacity-75">
          <Image
            src={imageUrl}
            className="object-cover rounded-sp-14"
            width={220}
            height={248}
            layout="responsive"
          />
        </div>
        <div className="mt-2 flex flex-col justify-between">
          <h3 className="text-lg dark:text-sp-white">{title}</h3>
          <p className="mt-1 dark:text-sp-white dark:text-opacity-60">{`${subtitle}`}</p>
        </div>
      </a>
    </Link>
  );
}
