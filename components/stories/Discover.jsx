import Link from 'next/link'
import Image from 'next/image'

import { useState, useRef } from 'react'
import { ImagePlaceholder } from '../layout/Common'
import { useTranslation } from 'next-i18next'

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useSwiper } from 'swiper/react'

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronRightIcon
} from '@heroicons/react/outline'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

SwiperCore.use([Navigation, A11y])

const stories = [
  {
    id: 1,
    images: [],
    // images: [{url: "/images/top-story.png"}],
    description: 'Ruka koja život znači',
    name: 'Pavao',
    surname: 'Vukelić'
  },
  {
    id: 2,
    images: [{ url: '/images/spiritus-1.png' }],
    description: 'Grad, to ste vi!',
    name: 'Devon',
    surname: 'Lane'
  },
  {
    id: 3,
    images: [{ url: '/images/spiritus-2.png' }],
    description: 'Ruka koja život znači',
    name: 'Pavao',
    surname: 'Vukelić'
  },
  {
    id: 4,
    images: [{ url: '/images/spiritus-3.png' }],
    description: 'Grad, to ste vi!',
    name: 'Devon',
    surname: 'Lane'
  }
]

// Swiper component for the home page Discover section.
// Uses React Swiper with custom navigation buttons.
export function DiscoverSwiper ({ popular }) {
  const { t } = useTranslation('common')
  const [currSlide, setCurrSlide] = useState(0)
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  const hidePrevBtn = () => {
    return currSlide === 0
  }

  const hideNextBtn = () => {
    return Math.floor(currSlide > (popular.length + 3) / 2)
  }

  return (
    popular && (
      <div className='container w-full xl:w-4/5 mx-auto mb-16'>
        <h2 className='text-2xl font-extrabold tracking-tight text-sp-black dark:text-sp-white mb-3'>
          {t('discover')}
        </h2>
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
            {popular.map((s, i) => {
              return (
                <SwiperSlide key={`slider-${i}`}>
                  {
                    <StoryTile
                      key={s.slug}
                      id={s.id}
                      slug={s.slug}
                      name={s.name}
                      surname={s.surname}
                      description={s.description}
                      images={s.images}
                    />
                  }
                </SwiperSlide>
              )
            })}
            <SwiperSlide>
              <ExpandSectionTile />
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

export function Discover ({ popular }) {
  const { t } = useTranslation('common')

  return (
    popular && (
      <div className='container w-full xl:w-4/5 mx-auto mb-16'>
        <h2 className='text-2xl font-extrabold tracking-tight text-sp-black dark:text-sp-white'>
          {t('discover')}
        </h2>

        <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {popular.map(s => (
            <StoryTile
              key={s.slug}
              id={s.id}
              slug={s.slug}
              name={s.name}
              surname={s.surname}
              description={s.description}
              images={s.images}
            />
          ))}
        </div>
      </div>
    )
  )
}

function StoryTile ({ id, slug, name, surname, description, images }) {
  const image = images.length ? images[0] : null
  return (
    <div key={slug} className='group relative'>
      <div className='w-full aspect-w-1 aspect-h-1 rounded-xl overflow-hidden group-hover:opacity-75 lg:h-80 h-80'>
        {image ? (
          <Image
            src={image.url}
            className='w-full h-full'
            width={220}
            height={248}
            layout='responsive'
          />
        ) : (
          <ImagePlaceholder />
        )}
      </div>
      <div className='mt-4 flex justify-between'>
        <div>
          <h3 className='text-xl dark:text-sp-white'>
            {/* <Link href={`/stories/spiritus/${slug}?id=${id}`}> */}
            <Link href={`/spiritus/${slug}`}>
              <a>
                <span aria-hidden='true' className='absolute inset-0' />
                {description}
              </a>
            </Link>
          </h3>
          <p className='mt-1 text-lg dark:text-sp-white opacity-50'>{`${name} ${surname}`}</p>
        </div>
      </div>
    </div>
  )
}

// Tile that redirects users to a section page.
// Section pages are: /featured, /anniversaries, /categories, /nearby.
function ExpandSectionTile ({ sectionLink }) {
  return (
    <div className='flex w-full h-80 mx-auto border-3 dark:border-3 border-sp-day-200 dark:border-sp-fawn dark:border-opacity-10 rounded-xl justify-center items-center'>
      <div className='mx-auto'>
        <div className='bg-sp-day-900 bg-opacity-10 dark:bg-sp-dark-brown rounded-lg p-1.5 mx-2 mb-2'>
          <ChevronRightIcon className='h-5 w-5 text-sp-day-900 dark:text-sp-fawn' dark />
        </div>
        <p className="dark:text-sp-white">See all</p>
      </div>
    </div>
  )
}
