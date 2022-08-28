import Link from 'next/link'
import Image from 'next/image'

import { useState, useRef } from 'react'
import { ImagePlaceholder } from '../layout/Common'
import { useTranslation } from 'next-i18next'

import SwiperCore, { Navigation, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronRightIcon
} from '@heroicons/react/outline'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { CrownIcon } from '../Icons'

SwiperCore.use([Navigation, A11y])

// Swiper component for the home page swipable/scrollable sections.
// Uses React Swiper with custom navigation buttons.
export function HomepageSwiper ({
  sectionId,
  titleTranslation,
  items,
  itemType,
  title,
  featured
}) {
  const { t } = useTranslation('common')
  const [currSlide, setCurrSlide] = useState(0)
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  const hidePrevBtn = () => {
    return currSlide === 0
  }

  const hideNextBtn = () => {
    return Math.floor(currSlide > (items.length + 3) / 2)
  }

  return (
    items && (
      <div className='container w-full xl:w-4/5 mx-auto my-10'>
        <div className='inline-flex w-full items-center justify-between pb-3'>
          <h2 className='text-2xl font-extrabold tracking-tight text-sp-black dark:text-sp-white'>
            {t(titleTranslation)}
          </h2>
          <Link href={`/section/id/${sectionId}?title=${title}`}>
            <a className='bg-sp-day-900 bg-opacity-10 dark:bg-sp-dark-brown rounded-lg p-1.5 mx-2'>
              <ChevronRightIcon className='h-5 w-5 text-sp-day-900 dark:text-sp-fawn' />
            </a>
          </Link>
        </div>
        <div className='relative'>
          <div
            className={`swiper-prev-step absolute inset-y-0 left-0 z-10 -ml-1 h-3/4 flex items-center ${
              hidePrevBtn() ? 'hidden' : ''
            }`}
          >
            <button
              ref={prevRef}
              className='bg-white -ml-2 lg:-ml-4 flex justify-center items-center w-9 h-9 rounded-full shadow focus:outline-none'
            >
              <ArrowLeftIcon className='w-5 h-5 text-black' />
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
            spaceBetween={50}
            slidesPerView={3}
          >
            {items.map((item, i) => {
              return (
                <SwiperSlide key={`slider-${i}`}>
                  {
                    <HomepageTile
                      itemId={item.itemId}
                      title={item.title}
                      // mapping is weird and all over the place
                      // due to BE respones being weird
                      spiritusName={item.subtitle}
                      imageUrl={item.imageUrl}
                      itemType={itemType}
                      featured={featured}
                    />
                  }
                </SwiperSlide>
              )
            })}
            <SwiperSlide>
              <ExpandSectionTile sectionId={sectionId} title={title} />
            </SwiperSlide>
          </Swiper>
          <div
            className={`swiper-next-step absolute inset-y-0 right-0 -mr-1 z-10 h-3/4 flex items-center ${
              hideNextBtn() ? 'hidden' : ''
            }`}
          >
            <button
              ref={nextRef}
              className='bg-white -mr-2 lg:-mr-4 flex justify-center items-center w-9 h-9 rounded-full shadow focus:outline-none'
            >
              <ArrowRightIcon className='w-5 h-5 text-black' />
            </button>
          </div>
        </div>
      </div>
    )
  )
}

// itemType is used to calculate the link to the correct item
// if itemType === "SPIRITUS_DETAILS" the link will point to SPIRITUS, ELSE will point to Story
function HomepageTile ({
  itemId,
  itemType,
  title,
  spiritusName,
  imageUrl,
  featured
}) {
  return (
    <div key={itemId} className='group'>
      <div className='relative rounded-xl overflow-hidden group-hover:opacity-75 lg:h-80 h-80'>
        {featured && (
          <div className='absolute z-10 top-3 left-3 p-1.5 bg-sp-black bg-opacity-75 rounded-lg'>
            <CrownIcon width={5} height={5} />
          </div>
        )}
        {imageUrl ? (
          <Image
            src={imageUrl}
            className='w-full h-full'
            width={200}
            height={260}
            layout='responsive'
          />
        ) : (
          <ImagePlaceholder />
        )}
      </div>
      <div className='mt-4 flex flex-col justify-between'>
        <h3 className='text-lg dark:text-sp-white'>
          <Link href={itemType === "SPIRITUS" ?  `/spiritus/${itemId}` : `/stories/${itemId}`}>
            <a>
              <span aria-hidden='true' className='absolute inset-0' />
              {title}
            </a>
          </Link>
        </h3>
        <p className='mt-1 dark:text-sp-white opacity-50'>{`${spiritusName}`}</p>
      </div>
    </div>
  )
}

// Tile that redirects users to a section page.
// Section pages are: /featured, /anniversaries, /categories, /nearby.
// NOTE: currently we navigate to sections using IDs and title
function ExpandSectionTile ({ sectionId, title }) {
  return (
    <Link href={`/sections/id/${sectionId}?title=${title}`}>
      <a className='flex w-full h-80 sm:h-60 md:h-80 mx-auto border-3 dark:border-3 border-sp-day-200 dark:border-sp-fawn dark:border-opacity-10 rounded-xl justify-center items-center'>
        <div className='mx-auto'>
          <div className='bg-sp-day-900 bg-opacity-10 dark:bg-sp-dark-brown rounded-lg p-1.5 mx-2 mb-2'>
            <ChevronRightIcon className='h-5 w-5 text-sp-day-900 dark:text-sp-fawn' />
          </div>
          <p className='dark:text-sp-white'>See all</p>
        </div>
      </a>
    </Link>
  )
}

// Swiper component for the home page Categories section.
// Uses React Swiper with custom navigation buttons.
// Basically copy/paste from HomepageSwiper with different tiles.
// TODO: refactor!
export function CategoriesSwiper ({ sectionId, categories, titleTranslation }) {
  const { t } = useTranslation('common')
  const [currSlide, setCurrSlide] = useState(0)
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  const hidePrevBtn = () => {
    return currSlide === 0
  }

  const hideNextBtn = () => {
    return Math.floor(currSlide > (categories.length + 3) / 2)
  }

  return (
    categories && (
      <div className='container w-full xl:w-4/5 mx-auto my-8'>
        <div className='inline-flex w-full items-center justify-between pb-3'>
          <h2 className='text-2xl font-extrabold tracking-tight text-sp-black dark:text-sp-white'>
            {t(titleTranslation)}
          </h2>
          <div className='bg-sp-day-900 bg-opacity-10 dark:bg-sp-dark-brown rounded-lg p-1.5 mx-2'>
            <ChevronRightIcon className='h-5 w-5 text-sp-day-900 dark:text-sp-fawn' />
          </div>
        </div>
        <div className='relative'>
          <div
            className={`swiper-prev-step absolute inset-y-0 left-0 z-10 -ml-1 h-4/5 flex items-center ${
              hidePrevBtn() ? 'hidden' : ''
            }`}
          >
            <button
              ref={prevRef}
              className='bg-white -ml-2 lg:-ml-4 flex justify-center items-center w-9 h-9 rounded-full shadow focus:outline-none'
            >
              <ArrowLeftIcon className='w-5 h-5 text-black' />
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
            spaceBetween={50}
            slidesPerView={3}
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
              )
            })}
          </Swiper>
          <div
            className={`swiper-next-step absolute inset-y-0 right-0 -mr-1 z-10 h-4/5 flex items-center ${
              hideNextBtn() ? 'hidden' : ''
            }`}
          >
            <button
              ref={nextRef}
              className='bg-white -mr-2 lg:-mr-4 flex justify-center items-center w-9 h-9 rounded-full shadow focus:outline-none'
            >
              <ArrowRightIcon className='w-5 h-5 text-black' />
            </button>
          </div>
        </div>
      </div>
    )
  )
}

function CategoryTile ({ sectionId, categoryId, title, imageUrl }) {
  return (
    <div key={title} className='group relative'>
      <div className='w-full aspect-w-1 aspect-h-1 rounded-xl overflow-hidden group-hover:opacity-75'>
        {imageUrl ? (
          <Image
            src={imageUrl}
            className='w-full h-full'
            width={220}
            height={130}
            layout='responsive'
          />
        ) : (
          <ImagePlaceholder />
        )}
      </div>
      <div className='mt-2 flex justify-between'>
        <div>
          <h3 className='text-lg dark:text-sp-white'>
            <Link href={`/category/${sectionId}/item/${categoryId}?title=${title}`}>
              <a>
                <span aria-hidden='true' className='absolute inset-0' />
                {title}
              </a>
            </Link>
          </h3>
        </div>
      </div>
    </div>
  )
}
