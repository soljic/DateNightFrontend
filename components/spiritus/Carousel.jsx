import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
import { EffectCards } from "swiper";

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

  return (
    !!images.length && (
      <div className="container w-full mt-16 mb-48 slider">
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards]}
          onSlideChange={(swiper) => {
            setIndex(swiper.realIndex);
          }}
          slidesPerView={3}
          loop={false}
          onSwiper={swiper => {
            setIndex(swiper.realIndex)
          }}
          centeredSlides={true}
          // autoHeight={true}
        >
          {images.map((img, i) => {
            return (
              <SwiperSlide key={`slider-image-${i}`}>
                <div className="rounded-sp-14">
                  <Image
                    src={img.url}
                    alt={"spiritus-image"}
                    layout="responsive"
                    width={395}
                    height={500}
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

const mock = () => {
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
