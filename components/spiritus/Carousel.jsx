import { Fragment, useEffect, useRef, useState } from "react";

import Image from "next/legacy/image";

import { Dialog, Transition } from "@headlessui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline";
import { EffectCards, EffectFade } from "swiper";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper/core";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Pagination, Navigation, Autoplay]);

export function SpiritusCarousel({ images }) {
  const [mounted, setMounted] = useState(false);

  const [index, setIndex] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  let [isOpen, setIsOpen] = useState(false);
  const [fullScreenIndex, setFullScreenIndex] = useState(0);

  // wait for component to mount to avoid hydration errs
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(index) {
    setFullScreenIndex(index);
    setIsOpen(true);
  }

  return (
    !!images &&
    images.length > 0 && (
      <>
        <FullScreenSwiper
          isOpen={isOpen}
          closeModal={closeModal}
          images={images}
          fullScreenIndex={fullScreenIndex}
        />
        <div className="sw-spiritus relative my-16 w-full overflow-hidden">
          <div className="swiper-prev-step absolute inset-y-1/2 left-0 z-10 sm:left-4">
            <button
              ref={prevRef}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow focus:outline-none"
            >
              <ArrowLeftIcon className="h-5 w-5 text-black" />
            </button>
          </div>
          <div className="swiper-next-step absolute inset-y-1/2 right-0 z-10 sm:right-4 ">
            <button
              ref={nextRef}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow focus:outline-none"
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
              300: {
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
                  <div onClick={() => openModal(i)} className="h-full w-full">
                    <Image
                      src={img.url}
                      alt={"spiritus-image"}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-sp-14"
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
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="z-100 relative" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-1000"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-40 bg-black bg-opacity-90" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 overflow-y-auto">
          <div className="flex h-full min-w-full items-center justify-center p-4 text-center">
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
                className="absolute transform content-center overflow-hidden transition-all"
              >
                <div className="sw-gallery-spiritus relative h-[66vh] overflow-hidden">
                  <Swiper
                    initialSlide={fullScreenIndex}
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={images.length > 1 ? true : false}
                    navigation={true}
                    modules={[EffectFade, Navigation, Pagination]}
                    pagination={{
                      clickable: true,
                    }}
                  >
                    {images.map((img, i) => {
                      return (
                        <SwiperSlide key={`slider-image-${i}`}>
                          <div className="inset-0 flex h-[66vh] max-h-screen w-[60vw] content-center sm:h-[80vh]">
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
