import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, A11y } from "swiper";
import { ImagePlaceholder } from "../layout/Common";
import SliderCard from "./SliderCard";
import Image from "next/legacy/image";
import Paper from "../../public/images/aboutPage/ShapeArrow.png";

import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { CrownIcon } from "../Icons";
import { useTranslation } from "next-i18next";
import Link from "next/link";

SwiperCore.use([Pagination, Navigation, A11y]);

export function SwiperComponent({ images }) {
  const { t } = useTranslation("common");
  const [currSlide, setCurrSlide] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const navigationPrev = useRef(null);
  const navigationNext = useRef(null);

  const isMobile = false;

  const hidePrevBtn = () => {
    return currSlide === 0;
  };

  const hideNextBtn = () => {
    return isMobile ? currSlide === 2 : currSlide === 1;
  };

  return (
    <div className="slider container  mx-auto my-10 sm:w-[90%] md:w-[90%] lg:w-[84%] xl:w-[67%] xl:pl-[15px]  2xl:w-[55%]">
      <div className="inline-flex w-full items-center justify-between pb-3"></div>
      <div className="relative">
        <div
          className={`swiper-prev-step absolute inset-y-0 left-0 z-10 -ml-1 flex h-3/4 items-center sm:-ml-5 sm:mt-24 md:-ml-1  md:-mr-2 lg:mr-2 ${
            hidePrevBtn() ? "hidden" : ""
          }`}
        >
          <button
            ref={prevRef}
            className="-ml-2 flex items-center justify-center rounded-full bg-white shadow focus:outline-none  sm:h-14 sm:w-14 md:h-9 md:w-9 lg:-ml-4"
          >
            <ArrowLeftIcon className="text-black sm:h-12 sm:w-12 md:h-5 md:w-5" />
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
          }}
          modules={[Pagination, Navigation]}
          navigation={{
            clickable: true,
            nextEl: ".slider-arrow-left",
            prevEl: ".slider-arrow-right",
          }}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className}"></span>`;
            },
          }}
          loop={false}
          spaceBetween={30}
          slidesPerView={isMobile ? 1 : 2}
        >
          <SwiperSlide key={`slider`}>
            <SliderCard />
          </SwiperSlide>
          <SwiperSlide key={`slider`}>
            <SliderCard />
          </SwiperSlide>
          <SwiperSlide key={`slider`}>
            <SliderCard />
          </SwiperSlide>
        </Swiper>
        <div
          className={`swiper-next-step absolute inset-y-0 right-0 z-10 -ml-0 flex h-3/4 items-center   sm:-mr-5 sm:mt-24 md:mr-4 lg:mr-2 ${
            hideNextBtn() ? "hidden" : ""
          }`}
        >
          <button
            ref={nextRef}
            className={`-mr-2 flex items-center justify-center rounded-full bg-white shadow focus:outline-none  sm:h-14 sm:w-14 md:h-9 md:w-9 lg:-mr-4`}
          >
            <ArrowRightIcon className="text-black sm:h-12 sm:w-12 md:h-5 md:w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
