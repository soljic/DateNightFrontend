import { useState, useRef, Fragment } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
import { EffectCards, EffectFade } from "swiper";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline";

import { Dialog, Transition } from "@headlessui/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-cards";

SwiperCore.use([Pagination, Navigation, Autoplay]);

export function SpiritusCarousel({ images }) {
  const [index, setIndex] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    !!images.length && (
      <>
        <FullScreenSwiper
          isOpen={isOpen}
          closeModal={closeModal}
          images={images}
        />
        <div className="sw-spiritus relative w-full mt-16 overflow-hidden">

          <div className="swiper-prev-step absolute inset-y-1/2 left-0 sm:left-4 z-10">
            <button
              ref={prevRef}
              className="bg-white flex justify-center items-center w-9 h-9 rounded-full shadow focus:outline-none"
            >
              <ArrowLeftIcon className="w-5 h-5 text-black" />
            </button>
          </div>
          <div className="swiper-next-step absolute inset-y-1/2 right-0 sm:right-4 z-10 ">
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
            loop={images.length > 2 ? true : false}
            onSwiper={(swiper) => {
              setIndex(swiper.realIndex);
            }}
            centeredSlides={true}
            breakpoints={{
              340: {
                slidesPerView: 1,
              },
              576: {
                slidesPerView: 1.5,
              },
              719: {
                slidesPerView: 2,
              },
            }}
          >
            {images.map((img, i) => {
              return (
                <SwiperSlide key={`slider-image-${i}`}>
                  <div onClick={openModal} className="w-full h-full">
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
      </>
    )
  );
}

function FullScreenSwiper({ isOpen, closeModal, images, fullScreenIndex }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [index, setIndex] = useState(fullScreenIndex);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-100" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-1000"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-90 z-10" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto z-10">
          <div className="flex items-center justify-center min-w-full h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-1000"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                onClick={closeModal}
                className="absolute overflow-hidden content-center transition-all transform"
              >
                <div className="sw-gallery-spiritus relative h-[66vh] overflow-hidden">
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={true}
                    navigation={true}
                    modules={[EffectFade, Navigation, Pagination]}
                    pagination={{
                      clickable: true,
                    }}
                  >
                    {images.map((img, i) => {
                      return (
                        <SwiperSlide key={`slider-image-${i}`}>
                          <div className="flex inset-0 w-[60vw] h-[66vh] sm:h-[80vh] max-h-screen content-center">
                            <Image
                              src={img.url}
                              alt={"spiritus-gallery-image"}
                              layout="fill"
                              objectFit="contain"
                            />
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
