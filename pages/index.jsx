import Head from 'next/head'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import {
  // CreateSpiritusCTA,
  CreateSpiritusCTABgImage,
  SearchPlacesCTA,
  SearchSpiritusCTA
} from '../components/stories/CTAs'
import { StoryOfTheWeek } from '../components/stories/StoryOfTheWeek'
import {
  CategoriesSwiper,
  HomepageSwiper
} from '../components/stories/Discover'
import Layout from '../components/layout/Layout'
import { GetParsedHomepage } from '../service/http/homepage'

export default function Home ({
  storyOfTheWeek,
  featured,
  discover,
  categories,
  anniversaries
}) {
  const { t } = useTranslation('common')

  return (
    <Layout>
      <Head>
        <title>{t('meta_home_title')}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content={t('meta_home_description')} />
      </Head>
      {/* <CreateSpiritusCTA /> */}
      <CreateSpiritusCTABgImage />
      <StoryOfTheWeek
        // mapping is weird...
        // itemId == storyId
        story_id={storyOfTheWeek.itemId}
        title={storyOfTheWeek.subtitle}
        imageUrl={storyOfTheWeek.imageUrl}
      />
      <HomepageSwiper sectionId={discover.id} itemType={discover.itemType} titleTranslation={"section_discover_title"} items={discover.items} title={discover.title}/>
      <SearchSpiritusCTA />
      <CategoriesSwiper categories={categories.items} itemType={categories.itemType} titleTranslation={"section_categories_title"}/>
      <HomepageSwiper sectionId={anniversaries.id} itemType={anniversaries.itemType} titleTranslation={"section_anniversaries_title"} items={anniversaries.items} title={anniversaries.title}/>
      <HomepageSwiper sectionId={featured.id} itemType={featured.itemType} titleTranslation={"section_featured_title"} items={featured.items} featured={true} title={featured.title}/>
      <SearchPlacesCTA />
    </Layout>
  )
}

// fetch parsed homepage sections
// in the parsed output check "content_type" to figure out
// if the item is a Spiritus or a Story and act accordinly
export async function getServerSideProps ({ locale }) {
  const sections = await GetParsedHomepage()

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      storyOfTheWeek: sections.storyOfTheWeek,
      featured: sections.featured,
      discover: sections.discover,
      categories: sections.categories,
      anniversaries: sections.anniversaries,
    }
  }
}
