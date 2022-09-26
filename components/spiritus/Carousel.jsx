import { useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
import { EffectCards } from "swiper";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline";

// import {
//   ArrowCircleLeftIcon,
//   ArrowCircleRightIcon,
//   ArrowLeftIcon,
//   ArrowRightIcon,
// } from "@heroicons/react/outline";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-cards";

SwiperCore.use([Pagination, Navigation, Autoplay]);

export function SpiritusCarousel({ images }) {
  const [index, setIndex] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    !!images.length && (
      <div className="sw-spiritus relative w-full mt-16 mb-14 overflow-hidden">
        <div className="swiper-prev-step absolute inset-y-0 left-4 md:left-16 z-10 h-5/6 flex items-center">
          <button
            ref={prevRef}
            className="bg-white flex justify-center items-center w-9 h-9 rounded-full shadow focus:outline-none"
          >
            <ArrowLeftIcon className="w-5 h-5 text-black" />
          </button>
        </div>
        <div className="swiper-next-step absolute inset-y-0 right-4 md:right-16 z-10 h-5/6 flex items-center">
          <button
            ref={nextRef}
            className="bg-white flex justify-center items-center w-9 h-9 rounded-full shadow focus:outline-none"
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
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          onSlideChange={(swiper) => {
            setIndex(swiper.realIndex);
          }}
          slidesPerView={2}
          onSwiper={(swiper) => {
            setIndex(swiper.realIndex);
          }}
          centeredSlides={true}
          loop={images.length > 2 ? true : false}
          autoplay={{
            delay: 10000,
            disableOnInteraction: true,
          }}
        >
          {images.map((img, i) => {
            return (
              <SwiperSlide key={`slider-image-${i}`}>
                <div className="w-full h-full">
                  <Image
                    src={img.url}
                    alt={"spiritus-image"}
                    layout="fill"
                    className="object-cover rounded-sp-14"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    )
  );
}
