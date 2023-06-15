import { Fragment, useState } from "react";

import Image from "next/image";

import { Dialog, Transition } from "@headlessui/react";
import { EffectFade } from "swiper";
import { Navigation, Pagination } from "swiper/core";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

export function FullScreenSwiper({
  isOpen,
  closeModal,
  images,
  fullScreenIndex,
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-1000"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-40 bg-black bg-opacity-95" />
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
                              fill
                              className="object-contain"
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

export function Gallery({ images }) {
  let [isOpen, setIsOpen] = useState(false);
  const [fullScreenIndex, setFullScreenIndex] = useState(0);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(index) {
    setFullScreenIndex(index);
    setIsOpen(true);
  }

  return (
    <>
      <FullScreenSwiper
        isOpen={isOpen}
        closeModal={closeModal}
        images={images}
        fullScreenIndex={fullScreenIndex}
      />
      <div className="mt-6 h-full w-full">
        <div className="mt-7 space-y-4 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-4">
          {images.map((image, index) => {
            return (
              <div
                key={index}
                onClick={() => openModal(index)}
                className="h-full w-full"
              >
                <Image
                  src={image.url}
                  alt={`sp-gallery-image-${index}`}
                  height={image.height}
                  width={image.width}
                  className="rounded-sp-10 object-contain"
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
