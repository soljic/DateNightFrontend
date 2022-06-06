import Image from "next/image";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";

import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/outline";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const DataSwipper = () => {
  return [
    {
      id: 68419,
      born: 1926,
      deceased: 1998,
      name: "Ronald Richards",
      city: "Chigago",
      country: "USA",
      text1: "He could have left me",
      url: "/slider/slider-1.jpeg",
    },
    {
      id: 98769,
      born: 1949,
      deceased: 2013,
      name: "Ankica Modrić",
      city: "Zagreb",
      country: "Croatia",
      text1: "How she and her husband saved me",
      url: "/slider/slider-3.jpeg",
    },
    {
      id: 88764,
      born: 1938,
      deceased: 2008,
      name: "Andrija Čordaš",
      city: "Županja",
      country: "Croatia",
      text1: "He lived his life by his own rules",
      url: "/slider/slider-2.jpeg",
    },
  ];
};

SwiperCore.use([Pagination, Navigation, Autoplay]);

export default function SpiritusCarousel({ images }) {
  const [index, setIndex] = useState(0);
  return (
    images.length && (
      <div className="container slider overflow-visible ">
        <Swiper
          spaceBetween={120}
          // autoplay={{
          // delay: 2500,
          // disableOnInteraction: true,
          // }}
          slidesPerView="auto"
          loop={false}
          onSlideChange={(swiper) => {
            setIndex(swiper.realIndex);
          }}
          onSwiper={(swiper) => {
            setIndex(swiper.realIndex);
          }}
          centeredSlides={true}
        >
          {images.map((img, i) => {
            return (
              <SwiperSlide key={`slider-image-${i}`}>
                <div className="slider-image-wrap my-4">
                  <div className="slider-image">
                    <img src={img.url} alt={""} className="rounded-xl" />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    )
  );
}
