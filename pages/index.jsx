import Head from 'next/head'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import {
  CreateSpiritusCTA,
  SearchSpiritusCTA
} from '../components/stories/CTAs'
import { TopStory } from '../components/stories/TopStory'
import { Discover, DiscoverSwiper } from '../components/stories/Discover'
import Layout from '../components/layout/Layout'
import { PaginatePopularSpiritus } from '../service/http/spiritus'

export default function Home ({ top, popular }) {
  const { t } = useTranslation('common')

  return (
    <Layout>
      <Head>
        <title>{t('meta_home_title')}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content={t('meta_home_description')} />
      </Head>
      <CreateSpiritusCTA />
      <TopStory
        id={top.id}
        name={top.name}
        surname={top.surname}
        images={top.images}
      />
      {/* <Discover popular={popular} /> */}
      <DiscoverSwiper popular={popular} />
      <SearchSpiritusCTA />
    </Layout>
  )
}

// fetch top 10 popular spirituses
export async function getServerSideProps ({ locale }) {
  const popular = await PaginatePopularSpiritus(0, 10)

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      top: popular.data.content[0],
      popular: popular.data.content.slice(1, 9)
    }
  }
}
