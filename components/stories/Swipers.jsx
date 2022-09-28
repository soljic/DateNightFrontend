import Link from "next/link";
import Image from "next/image";

import { useState, useRef } from "react";
import { ImagePlaceholder } from "../layout/Common";
import { useTranslation } from "next-i18next";

import SwiperCore, { Navigation, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { CrownIcon } from "../Icons";

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
}) {
  const { t } = useTranslation("common");
  const [currSlide, setCurrSlide] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [hidePrevBtn, setHidePrevBtn] = useState(true);
  const [hideNextBtn, setHideNextBtn] = useState(false);

  return (
    items && (
      <div className="mb-10">
        <div className="inline-flex w-full items-start justify-between pb-5">
          <h2 className="text-2xl font-bold tracking-tight text-sp-black dark:text-sp-white">
            {t(titleTranslation)}
          </h2>
          <Link href={`/section/id/${sectionId}?title=${title}`}>
            <a className="bg-sp-day-900 bg-opacity-10 dark:bg-sp-dark-brown rounded-lg p-1">
              <ChevronRightIcon className="h-5 w-5 text-sp-day-900 dark:text-sp-fawn opacity-40" />
            </a>
          </Link>
        </div>
        <div className="relative">
          <div
            className={`swiper-prev-step absolute inset-y-0 left-0 z-10 -ml-1 h-5/6 flex items-center ${
              hidePrevBtn ? "hidden" : ""
            }`}
          >
            <button
              ref={prevRef}
              className="bg-white -ml-2 lg:-ml-4 flex justify-center items-center w-9 h-9 rounded-full shadow focus:outline-none"
            >
              <ArrowLeftIcon className="w-5 h-5 text-black" />
            </button>
          </div>
          <div
            className={`swiper-next-step absolute inset-y-0 right-0 -mr-1 z-10 h-5/6 flex items-center ${
              hideNextBtn ? "hidden" : ""
            }`}
          >
            <button
              ref={nextRef}
              className="bg-white -mr-2 lg:-mr-4 flex justify-center items-center w-9 h-9 rounded-full shadow focus:outline-none"
            >
              <ArrowRightIcon className="w-5 h-5 text-black" />
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
                      spiritusName={item.subtitle}
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
  spiritusName,
  imageUrl,
  featured,
}) {
  return (
    <div key={itemId} className="group">
      <div className="relative group-hover:opacity-75">
        {featured && (
          <div className="absolute z-10 top-3 left-3 p-1.5 bg-sp-black bg-opacity-75 rounded-lg">
            <CrownIcon width={5} height={5} />
          </div>
        )}
        {imageUrl ? (
          <Image
            src={imageUrl}
            className="object-cover rounded-sp-14"
            width={220}
            height={248}
            layout="responsive"
          />
        ) : (
          <ImagePlaceholder />
        )}
      </div>
      <div className="flex flex-col justify-between mt-3 antialiased font-medium tracking-sp-tighten leading-4">
        <h3 className="text-lg dark:text-sp-white leading-snug">
          <Link
            href={
              itemType === "SPIRITUS"
                ? `/spiritus/${itemId}`
                : `/stories/${itemId}`
            }
          >
            <a>
              <span aria-hidden="true" className="absolute inset-0" />
              {title}
            </a>
          </Link>
        </h3>
        <p className="text-sm mt-1 dark:text-sp-white opacity-50">{`${spiritusName}`}</p>
      </div>
    </div>
  );
}

// Tile that redirects users to a section page.
// Section pages are: /featured, /anniversaries, /categories, /nearby.
// NOTE: currently we navigate to sections using IDs and title
function ExpandSectionTile({ sectionId, title }) {
  return (
    <Link href={`/section/id/${sectionId}?title=${title}`}>
      <a className="flex flex-col h-72 lg:h-92 items-center justify-center border-3 dark:border-3 border-sp-day-200 dark:border-sp-fawn dark:border-opacity-10 rounded-sp-14">
        <div className="bg-sp-day-900 bg-opacity-10 dark:bg-sp-dark-brown rounded-lg p-1.5 mx-2 mb-2">
          <ChevronRightIcon className="h-5 w-5 text-sp-day-900 dark:text-sp-fawn" />
        </div>
        <p className="dark:text-sp-white">See all</p>
      </a>
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
          <h2 className="text-2xl font-bold tracking-tight text-sp-black dark:text-sp-white">
            {t(titleTranslation)}
          </h2>
          <div className="bg-sp-day-900 bg-opacity-10 dark:bg-sp-dark-brown rounded-lg p-1">
            <ChevronRightIcon className="h-5 w-5 text-sp-day-900 dark:text-sp-fawn opacity-40" />
          </div>
        </div>
        <div className="relative">
          <div
            className={`swiper-prev-step absolute inset-y-0 left-0 z-10 -ml-1 h-4/5 flex items-center ${
              hidePrevBtn ? "hidden" : ""
            }`}
          >
            <button
              ref={prevRef}
              className="bg-white -ml-2 lg:-ml-4 flex justify-center items-center w-9 h-9 rounded-full shadow focus:outline-none"
            >
              <ArrowLeftIcon className="w-5 h-5 text-black" />
            </button>
          </div>
          <div
            className={`swiper-next-step absolute inset-y-0 right-0 -mr-1 z-10 h-4/5 flex items-center ${
              hideNextBtn ? "hidden" : ""
            }`}
          >
            <button
              ref={nextRef}
              className="bg-white -mr-2 lg:-mr-4 flex justify-center items-center w-9 h-9 rounded-full shadow focus:outline-none"
            >
              <ArrowRightIcon className="w-5 h-5 text-black" />
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
          >
            {categories.map((c, i) => {
              return (
                <SwiperSlide key={`slider-${i}`}>
                  {
                    <CategoryTile
                      sectionId={sectionId}
                      categoryId={c.id}
                      title={c.title}
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
            className="object-cover rounded-sp-14"
            width={220}
            height={124}
            layout="responsive"
          />
        ) : (
          <ImagePlaceholder />
        )}
      </div>
      <div className="mt-2 flex justify-between antialiased tracking-sp-tighten font-medium">
        <h3 className="text-lg dark:text-sp-white">
          <Link
            href={`/category/${sectionId}/item/${categoryId}?title=${title}`}
          >
            <a>
              <span aria-hidden="true" className="absolute inset-0" />
              {title}
            </a>
          </Link>
        </h3>
      </div>
    </div>
  );
}
