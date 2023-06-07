import { useState } from "react";

import Link from "next/link";
import Image from "next/legacy/image";
import { useRouter } from "next/router";

import { useTranslation } from "next-i18next";

import { ArrowLeftIcon, StarIcon } from "@heroicons/react/outline";

import { Spinner } from "../Status";
import { ImagePlaceholder } from "../layout/Common";

import { GetSpiritusByPlaceId } from "../../service/http/spiritus";

import { localFormatDate } from "../../service/util";

export function PlacesGrid({ id, title, isLastPage, initialItems }) {
  const { t } = useTranslation("common");
  const [current, setCurrent] = useState(0);
  const [isLast, setIsLast] = useState(isLastPage);
  const [items, setItems] = useState(initialItems);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async () => {
    setIsLoading(true);

    try {
      const res = await GetSpiritusByPlaceId(id, current + 1);
      setItems((prev) => [...prev, ...res.data.content]);
      setCurrent((current) => current + 1);
      setIsLast(res.data.last);
      setIsLoading(false);
    } catch (err) {
      // TODO: handle this
      setIsLoading(false);
      console.log(err.message);
    }
  };

  return (
    <div className="mt-12 flex flex-col lg:mb-24">
      <div className="mb-12 flex flex-col items-center">
        <h1 className="font-bold tracking-tight text-sp-black subpixel-antialiased text-cta dark:text-sp-white">
          {title}
        </h1>

        <p className="mt-2 text-sp-lighter dark:text-sp-lighter">
          {t("places_subtitle")}
        </p>

        {/* <div className="inline-flex mt-6 items-center gap-3">
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
        </div> */}
      </div>

      <div className="mb-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:gap-x-10">
        {items.map((item) => {
          return <SpiritusTile key={item.id} {...item} />;
        })}
      </div>

      {!isLast && (
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => {
              loadMore();
            }}
            disabled={isLast}
            className="w-full cursor-pointer rounded-full border border-sp-lighter from-sp-day-300 to-sp-day-100 px-8 py-3 font-semibold hover:bg-gradient-to-r focus:outline-none dark:border-sp-medium dark:bg-sp-medlight dark:hover:from-sp-dark-brown dark:hover:to-sp-brown sm:w-1/3"
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

function SpiritusTile({ slug, name, surname, birth, death, images }) {
  const router = useRouter();

  const fullName = `${name} ${surname}`;
  const dates = `${
    birth ? localFormatDate(birth, router.locale) : "\uE132"
  } — ${death ? localFormatDate(death, router.locale) : "\uE132"}`;

  return (
    <Link href={`/spiritus/${slug}`} key={slug} className="group">
      {/* <div className="relative group-hover:opacity-75 h-2/3"> */}
      {/* {featured && (
            <div className="absolute z-10 top-3 left-3 p-1.5 bg-sp-black bg-opacity-75 rounded-lg">
              <CrownIcon width={5} height={5} />
            </div>
          )} */}
      {images && images.length ? (
        <div className="relative group-hover:opacity-75">
          <Image
            src={images[0].url}
            className="rounded-sp-14 object-cover"
            width={192}
            height={248}
            layout="responsive"
          />
        </div>
      ) : (
        <div className="h-5/6">
          <ImagePlaceholder />
        </div>
      )}
      {/* </div> */}
      <div className="mt-3 flex flex-col justify-between font-medium leading-4 antialiased tracking-sp-tighten">
        <h3 className="leading-snug text-lg dark:text-sp-white">
          {fullName > 64 ? `${fullName.substring(0, 64)} ...` : fullName}
        </h3>
        <p className="mt-1 capitalize opacity-50 text-sm dark:text-sp-white">
          {dates}
        </p>
      </div>
    </Link>
  );
}
