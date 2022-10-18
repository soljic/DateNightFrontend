import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import { useTranslation } from "next-i18next";

import { StoryHookIcon } from "../Icons";
import { Spinner } from "../Status";
import { GetSectionItem } from "../../service/http/sections";

export function SectionItemGrid({
  section,
  id,
  title,
  isLastPage,
  initialItems,
}) {
  const { t } = useTranslation("common");
  const [current, setCurrent] = useState(0);
  const [isLast, setIsLast] = useState(isLastPage);
  const [items, setItems] = useState(initialItems);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async () => {
    setIsLoading(true);

    try {
      const res = await GetSectionItem(section, id, current + 1);
      setItems((prev) => [...prev, ...res.data.items.content]);
      setCurrent((current) => current + 1);
      setIsLast(res.data.items.last);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  const translateTitle = (title) => {
    switch (title) {
      case "Biography":
        return t("category_biography_title");
      case "Famous":
        return t("category_famous_title");
      case "Love":
        return t("category_love_title");
      case "Anecdotes":
        return t("category_anecdotes_title");
      case "Family":
        return t("category_family_title");
      case "Motivational":
        return t("category_motivational_title");
      case "Sports":
        return t("category_sports_title");
      case "Art":
        return t("category_art_title");
      case "War":
        return t("category_war_title");
      case "Hobby":
        return t("category_hobby_title");
      default:
        return title;
    }
  };

  return (
    <div className="flex flex-col items-center mt-16 mb-8 lg:mb-24 lg:mt-12">
      <div className="flex flex-col items-center mb-16">
        <h1 className="text-cta font-bold subpixel-antialiased tracking-tight text-sp-black dark:text-sp-white">
          {translateTitle(title)}
        </h1>

        {title === "Featured stories" && (
          <p className="text-sp-lighter dark:text-sp-lighter mt-2">
            {t("section_generic_subtitle")}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:gap-x-10 mb-14">
        {!!items &&
          items.map((item) => {
            if (item.imageUrl) {
              return (
                <SectionTile
                  key={item.itemId}
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
                key={item.itemId}
                story_id={item.itemId}
                text={item.placeholderText}
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
