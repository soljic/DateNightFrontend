import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import { useTranslation } from "next-i18next";

import { ArrowLeftIcon, StarIcon } from "@heroicons/react/outline";

import { FilterIcon, StoryHookIcon } from "../../components/Icons";
import { Spinner } from "../../components/Status";

import { GetSection } from "../../service/http/sections";
import { translateSectionTitle } from "../../utils/translations";

export function SectionGrid({ id, title, isLastPage, initialItems }) {
  const { t } = useTranslation("common");
  const [current, setCurrent] = useState(0);
  const [isLast, setIsLast] = useState(isLastPage);
  const [items, setItems] = useState(initialItems);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async () => {
    setIsLoading(true);

    try {
      const res = await GetSection(id, current + 1);
      setItems((prev) => [...prev, ...res.data.items.content]);
      setCurrent((current) => current + 1);
      setIsLast(res.data.items.last);
      setIsLoading(false);
    } catch (err) {
      // TODO: handle this
      setIsLoading(false);
      console.log(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center mt-16 mb-8 lg:mb-24 lg:mt-12">
      <div className="flex flex-col items-center mb-16">
        <h1 className="text-cta font-bold subpixel-antialiased tracking-tight text-sp-black dark:text-sp-white">
          {t(translateSectionTitle(title))}
        </h1>

        {title === "Featured stories" && (
          <p className="text-sp-lighter dark:text-sp-lighter mt-2">
            {t("section_generic_subtitle")}
          </p>
        )}

        {/* 
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
          */}
      </div>

      <div className="grid grid-cols-1 gap-y-10 gap-x-5 sm:grid-cols-2 md:grid-cols-3 md:gap-x-7 lg:grid-cols-3 xl:gap-x-8 mb-14">
        {!!items &&
          items.map((item) => {
            if (item.imageUrl) {
              return (
                <SectionTile
                  key={`tile-${item.itemId}`}
                  itemId={item.itemId}
                  title={item.title}
                  subtitle={item.subtitle}
                  itemType={item.itemNavigationType}
                  imageUrl={item.imageUrl}
                />
              );
            }
            return (
              <PlaceHolderTile
                key={`tile-${item.itemId}`}
                itemId={item.itemId}
                title={item.title}
                subtitle={item.subtitle}
                placeholderText={item.placeholderText}
                itemType={item.itemNavigationType}
              />
            );
          })}
      </div>

      {!isLast && (
        <div className="flex justify-center mt-16 w-full">
          <button
            onClick={() => {
              loadMore();
            }}
            disabled={isLast}
            className="dark:bg-sp-medlight w-full sm:w-1/3 border border-sp-lighter dark:border-sp-medium hover:bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none rounded-full py-3 px-8 font-semibold cursor-pointer"
          >
            {isLoading ? (
              <Spinner text={t("loading")} />
            ) : (
              t("action_load_more")
            )}
          </button>
        </div>
      )}
    </div>
  );
}

function PlaceHolderTile({
  itemId,
  title,
  subtitle,
  itemType,
  placeholderText,
}) {
  return itemType === "SPIRITUS_DETAILS" ? (
    <Link href={`/spiritus/${itemId}`} key={title}>
      <a className="flex flex-col">
        <div className="grow flex flex-col justify-between w-full min-h-[248px] bg-gradient-to-r from-day-gradient-start to-gradient-stop dark:from-sp-dark-brown dark:to-sp-brown rounded-sp-14 p-8 shadow-md">
          <p className="text-sp-medlight dark:text-sp-white">
            {placeholderText}
          </p>
          <div className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sp-day-900 bg-opacity-10 dark:bg-sp-fawn dark:bg-opacity-10 p-1.5">
            <StoryHookIcon />
          </div>
        </div>
        <div className="mt-2 flex flex-col justify-between">
          <h3 className="text-lg dark:text-sp-white">
            {title.length > 64 ? `${title.substring(0, 64)} ...` : title}
          </h3>
          <p className="mt-1 dark:text-sp-white dark:text-opacity-60">
            {" "}
            {subtitle.length > 64
              ? `${subtitle.substring(0, 64)} ...`
              : subtitle}
          </p>
        </div>
      </a>
    </Link>
  ) : (
    <Link href={`/stories/${itemId}`} key={itemId}>
      <a className="flex flex-col">
        <div className="grow flex flex-col justify-between w-full min-h-[248px] bg-gradient-to-r from-day-gradient-start to-day-gradient-stop dark:from-sp-dark-brown dark:to-sp-brown rounded-sp-14 p-8 shadow-md">
          <p className="text-sp-medlight dark:text-sp-white tracking-sp-tighten">
            {placeholderText}
          </p>
          <div className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sp-day-900 bg-opacity-10 dark:bg-sp-fawn dark:bg-opacity-10 p-1.5">
            <StoryHookIcon />
          </div>
        </div>
        <div className="mt-2 flex flex-col justify-between">
          <h3 className="text-lg dark:text-sp-white">
            {title.length > 64 ? `${title.substring(0, 64)} ...` : title}
          </h3>
          <p className="mt-1 dark:text-sp-white dark:text-opacity-60">
            {" "}
            {subtitle.length > 64
              ? `${subtitle.substring(0, 64)} ...`
              : subtitle}
          </p>
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
        <div className="mt-3 flex flex-col justify-between">
          <h3 className="text-lg dark:text-sp-white">
            {title.length > 64 ? `${title.substring(0, 64)} ...` : title}
          </h3>
          <p className="dark:text-sp-white dark:text-opacity-60">
            {subtitle.length > 64
              ? `${subtitle.substring(0, 64)} ...`
              : subtitle}
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
          <h3 className="text-lg dark:text-sp-white">
            {title.length > 64 ? `${title.substring(0, 64)} ...` : title}
          </h3>
          <p className="mt-1 dark:text-sp-white dark:text-opacity-60">
            {" "}
            {subtitle.length > 64
              ? `${subtitle.substring(0, 64)} ...`
              : subtitle}
          </p>
        </div>
      </a>
    </Link>
  );
}
