import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { ArrowNarrowRightIcon } from '@heroicons/react/outline'
import { ImagePlaceholder } from '../layout/Common'

// there's some weird things going on:
// - "title" from the response is ignored (it just says "STORY OF THE WEEK")
// - "subtitle" which is just Spiritus name is used as StoryOfTheWeek.title
export function StoryOfTheWeek ({ itemId, title, imageUrl }) {
  const { t } = useTranslation('common')

  return (
    <div key={itemId} className='container mx-auto mt-12'>
      <div className='container w-full xl:w-4/5 mx-auto rounded-lg py-12'>
        <div className='relative overflow-hidden'>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              className='h-full w-full object-cover rounded-lg opacity-60'
              width={500}
              height={500}
              layout='responsive'
              priority // add priority since this is the first thing loaded in the UI
            />
          ) : (
            <div className='h-64'>
              <ImagePlaceholder />
            </div>
          )}

          <div className='absolute bottom-10 left-5 w-full p-4 text-white'>
            <h2 className='uppercase font-semibold'>
              {t('story_of_the_week')}
            </h2>
            <h3 className='text-4xl xl:text-4xl md:text-2xl sm:text-xl font-semibold mb-2 text'>
              {`${title}`}
            </h3>
            <Link href={`/story-of-the-week?id=${itemId}`}>
              <a className='inline-flex bg-sp-white text-sp-black border border-sp-black rounded-full px-5 py-3 items-center'>
                {t('read_story')}
                <ArrowNarrowRightIcon className='h-5 w-5 text-sp-black' />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
