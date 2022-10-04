import {useState, useRef} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper'
import { ImagePlaceholder } from '../layout/Common'
import SliderCard from "./SliderCard";
import Image from "next/image";
import Paper from "../../public/images/aboutPage/ShapeArrow.png";

import {
    ArrowCircleLeftIcon,
    ArrowCircleRightIcon,
    ArrowLeftIcon,
    ArrowRightIcon, ChevronRightIcon,
} from "@heroicons/react/outline";

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { CrownIcon } from '../Icons'
import {useTranslation} from "next-i18next";
import Link from "next/link";




SwiperCore.use([Pagination,Navigation, A11y])

export function SwiperComponent({images}){
    const { t } = useTranslation('common')
    const [currSlide, setCurrSlide] = useState(0)
    const prevRef = useRef(null)
    const nextRef = useRef(null)
    const navigationPrev = useRef(null);
    const navigationNext = useRef(null);

    const isMobile = false

    const hidePrevBtn = () => {
        return currSlide === 0
    }

    const hideNextBtn = () => {
        return isMobile ? currSlide === 2 : currSlide === 1

    }

    return (
            <div className='container slider  sm:w-[90%] md:w-[90%] lg:w-[84%] xl:w-[67%] 2xl:w-[55%] mx-auto my-10  xl:pl-[15px]'>
                <div className='inline-flex w-full items-center justify-between pb-3'>

                </div>
                <div className='relative'>
                    <div
                        className={`swiper-prev-step absolute inset-y-0 left-0 z-10 -ml-1 h-3/4 sm:-ml-5 sm:mt-24 md:-ml-1 md:-mr-2 lg:mr-2  flex items-center ${
                            hidePrevBtn() ? 'hidden' : ''
                        }`}
                    >
                        <button
                            ref={prevRef}
                            className='bg-white -ml-2 lg:-ml-4 flex justify-center items-center sm:w-14 sm:h-14  md:w-9 md:h-9 rounded-full shadow focus:outline-none'
                        >
                            <ArrowLeftIcon className='md:w-5 md:h-5 sm:w-12 sm:h-12 text-black text-black' />
                        </button>
                    </div>
                    <Swiper
                        //
                        onInit={swiper => {
                            swiper.params.navigation.prevEl = prevRef.current
                            swiper.params.navigation.nextEl = nextRef.current
                            swiper.navigation.init()
                            swiper.navigation.update()
                        }}
                        // set current page index so nav arrows can be rendered properly
                        onSlideChange={swiper => {
                            setCurrSlide(swiper.realIndex)
                        }}
                        modules={[Pagination, Navigation]}
                        navigation={{
                            clickable: true,
                            nextEl: '.slider-arrow-left',
                            prevEl: '.slider-arrow-right',
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
                        className={`swiper-next-step absolute inset-y-0 right-0 -ml-0 sm:-mr-5 sm:mt-24 md:mr-4 lg:mr-2   z-10 h-3/4 flex items-center ${
                            hideNextBtn() ? 'hidden' : ''
                        }`}
                    >
                        <button
                            ref={nextRef}
                            className={`bg-white -mr-2 lg:-mr-4 flex justify-center items-center sm:w-14 sm:h-14  md:w-9 md:h-9 rounded-full shadow focus:outline-none`}
                        >
                            <ArrowRightIcon className='md:w-5 md:h-5 sm:w-12 sm:h-12 text-black' />
                        </button>
                    </div>
                </div>
            </div>

    )
}


