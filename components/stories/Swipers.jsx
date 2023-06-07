import { useRef, useState } from "react";

import Image from "next/legacy/image";
import Link from "next/link";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import { useTranslation } from "next-i18next";
import SwiperCore, { A11y, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";

import { translateCategoryTitle } from "../../utils/translations";
import { CrownIcon } from "../Icons";
import { ImagePlaceholder } from "../layout/Common";

SwiperCore.use([Navigation, A11y]);

// Swiper component for the home page swipable/scrollable sections.
// Uses React Swiper with custom navigation buttons.
export function HomepageSwiper({
  sectionId,
  titleTranslation,
  items,
  itemType,
  title,
  featured,
  subtitle,
}) {
  const { t } = useTranslation("common");
  const [currSlide, setCurrSlide] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [hidePrevBtn, setHidePrevBtn] = useState(true);
  const [hideNextBtn, setHideNextBtn] = useState(false);

  return (
    items && (
      <div className="my-10">
        <div className="inline-flex w-full items-start justify-between pb-5">
          <div className="flex flex-col">
            <h2 className="font-bold text-sp-black text-2xl tracking-tight dark:text-sp-white">
              {t(titleTranslation)}
            </h2>
            {!!subtitle && (
              <h3 className="mt-1 font-medium leading-4 opacity-50 tracking-sp-tighten dark:text-sp-white">
                {t(subtitle)}
              </h3>
            )}
          </div>
          <Link
            href={`/section/id/${sectionId}?title=${title}`}
            className="rounded-lg bg-sp-day-900 bg-opacity-10 p-1 dark:bg-sp-dark-brown"
          >
            <ChevronRightIcon className="h-5 w-5 text-sp-day-900 opacity-40 dark:text-sp-fawn" />
          </Link>
        </div>
        <div className="relative">
          <div
            className={`swiper-prev-step absolute inset-y-0 left-0 z-10 -ml-1 flex h-5/6 items-center ${
              hidePrevBtn ? "hidden" : ""
            }`}
          >
            <button
              ref={prevRef}
              className="-ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow focus:outline-none lg:-ml-4"
            >
              <ArrowLeftIcon className="h-5 w-5 text-black" />
            </button>
          </div>
          <div
            className={`swiper-next-step absolute inset-y-0 right-0 z-10 -mr-1 flex h-5/6 items-center ${
              hideNextBtn ? "hidden" : ""
            }`}
          >
            <button
              ref={nextRef}
              className="-mr-2 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow focus:outline-none lg:-mr-4"
            >
              <ArrowRightIcon className="h-5 w-5 text-black" />
            </button>
          </div>
          <Swiper
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            // set current page index so nav arrows can be rendered properly
            onSlideChange={(swiper) => {
              setCurrSlide(swiper.realIndex);
              setHideNextBtn(swiper.isEnd);
              setHidePrevBtn(swiper.isBeginning);
            }}
            spaceBetween={30}
            slidesPerView={3}
            slidesPerGroup={2}
            breakpoints={{
              340: {
                slidesPerView: 2,
              },
              759: {
                slidesPerView: 3,
              },
            }}
          >
            {items.map((item, i) => {
              return (
                <SwiperSlide key={`slider-${i}`}>
                  {
                    <HomepageTile
                      itemId={item.itemId}
                      title={item.title}
                      subtitle={item.subtitle}
                      imageUrl={item.imageUrl}
                      itemType={itemType}
                      featured={featured}
                    />
                  }
                </SwiperSlide>
              );
            })}
            <SwiperSlide>
              <ExpandSectionTile sectionId={sectionId} title={title} />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    )
  );
}

// itemType is used to calculate the link to the correct item
// if itemType === "SPIRITUS_DETAILS" the link will point to SPIRITUS, ELSE will point to Story
function HomepageTile({
  itemId,
  itemType,
  title,
  subtitle,
  imageUrl,
  featured,
}) {
  return (
    <Link
      href={
        itemType === "SPIRITUS" ? `/spiritus/${itemId}` : `/stories/${itemId}`
      }
      key={itemId}
      className="group"
    >
      <div className="relative group-hover:opacity-75">
        {featured && (
          <div className="absolute left-3 top-3 z-10 rounded-lg bg-sp-black bg-opacity-75 p-1.5">
            <CrownIcon width={5} height={5} />
          </div>
        )}
        {imageUrl ? (
          <Image
            src={imageUrl}
            className="rounded-sp-14 object-cover"
            alt={title}
            width={220}
            height={248}
            layout="responsive"
            loading="eager"
          />
        ) : (
          <ImagePlaceholder />
        )}
      </div>
      <div className="mt-3 flex flex-col justify-between font-medium leading-4 antialiased tracking-sp-tighten">
        <h3 className="leading-snug text-lg dark:text-sp-white">
          {title.length > 64 ? `${title.substring(0, 64)} ...` : title}
        </h3>
        <p className="mt-1 opacity-50 text-sm dark:text-sp-white">
          {subtitle.length > 64 ? `${subtitle.substring(0, 64)} ...` : subtitle}
        </p>
      </div>
    </Link>
  );
}

// Tile that redirects users to a section page.
// Section pages are: /featured, /anniversaries, /categories, /nearby.
// NOTE: currently we navigate to sections using IDs and title
function ExpandSectionTile({ sectionId, title }) {
  return (
    <Link
      href={`/section/id/${sectionId}?title=${title}`}
      className="flex h-72 flex-col items-center justify-center rounded-sp-14 border-3 border-sp-day-200 dark:border-3 dark:border-sp-fawn dark:border-opacity-10 lg:h-92"
    >
      <div className="mx-2 mb-2 rounded-lg bg-sp-day-900 bg-opacity-10 p-1.5 dark:bg-sp-dark-brown">
        <ChevronRightIcon className="h-5 w-5 text-sp-day-900 dark:text-sp-fawn" />
      </div>
      <p className="dark:text-sp-white">See all</p>
    </Link>
  );
}

// Swiper component for the home page Categories section.
// Uses React Swiper with custom navigation buttons.
// Basically copy/paste from HomepageSwiper with different tiles.
// TODO: refactor!
export function CategoriesSwiper({ sectionId, categories, titleTranslation }) {
  const { t } = useTranslation("common");
  const [currSlide, setCurrSlide] = useState(0);
  const [hidePrevBtn, setHidePrevBtn] = useState(true);
  const [hideNextBtn, setHideNextBtn] = useState(false);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    categories && (
      <div className="mb-10">
        <div className="inline-flex w-full items-center justify-between pb-5">
          <h2 className="font-bold text-sp-black text-2xl tracking-tight dark:text-sp-white">
            {t(titleTranslation)}
          </h2>
          <div className="rounded-lg bg-sp-day-900 bg-opacity-10 p-1 dark:bg-sp-dark-brown">
            <ChevronRightIcon className="h-5 w-5 text-sp-day-900 opacity-40 dark:text-sp-fawn" />
          </div>
        </div>
        <div className="relative">
          <div
            className={`swiper-prev-step absolute inset-y-0 left-0 z-10 -ml-1 flex h-4/5 items-center ${
              hidePrevBtn ? "hidden" : ""
            }`}
          >
            <button
              ref={prevRef}
              className="-ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow focus:outline-none lg:-ml-4"
            >
              <ArrowLeftIcon className="h-5 w-5 text-black" />
            </button>
          </div>
          <div
            className={`swiper-next-step absolute inset-y-0 right-0 z-10 -mr-1 flex h-4/5 items-center ${
              hideNextBtn ? "hidden" : ""
            }`}
          >
            <button
              ref={nextRef}
              className="-mr-2 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow focus:outline-none lg:-mr-4"
            >
              <ArrowRightIcon className="h-5 w-5 text-black" />
            </button>
          </div>
          <Swiper
            //
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            // set current page index so nav arrows can be rendered properly
            onSlideChange={(swiper) => {
              setCurrSlide(swiper.realIndex);
              setHideNextBtn(swiper.isEnd);
              setHidePrevBtn(swiper.isBeginning);
            }}
            spaceBetween={30}
            slidesPerView={3}
            slidesPerGroup={2}
            breakpoints={{
              340: {
                slidesPerView: 2,
              },
              759: {
                slidesPerView: 3,
              },
            }}
          >
            {categories.map((c, i) => {
              return (
                <SwiperSlide key={`slider-${i}`}>
                  {
                    <CategoryTile
                      sectionId={sectionId}
                      categoryId={c.id}
                      title={t(translateCategoryTitle(c.title))}
                      imageUrl={c.imageUrl}
                    />
                  }
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    )
  );
}

function CategoryTile({ sectionId, categoryId, title, imageUrl }) {
  return (
    <div key={title} className="group relative">
      <div className="group-hover:opacity-75">
        {imageUrl ? (
          <Image
            src={imageUrl}
            className="rounded-sp-14 object-cover"
            width={220}
            height={124}
            layout="responsive"
            loading="eager"
            alt={title}
          />
        ) : (
          <ImagePlaceholder />
        )}
      </div>
      <div className="mt-2 flex justify-between font-medium antialiased tracking-sp-tighten">
        <h3 className="text-lg dark:text-sp-white">
          <Link
            href={`/category/${sectionId}/item/${categoryId}?title=${title}`}
          >
            <span aria-hidden="true" className="absolute inset-0" />
            {title}
          </Link>
        </h3>
      </div>
    </div>
  );
}
