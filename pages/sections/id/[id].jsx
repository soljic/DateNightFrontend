import Head from 'next/head'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Layout from '../../../components/layout/Layout'
import { SectionGrid } from '../../../components/sections/Section'
import { GetSection } from '../../../service/http/sections'

// TODO: in this part I need some description tags too
// I only have:
// {
//		"id": 2,
//		"viewType": null,
//		"gridCount": null,
//		"items": {
//			"content": [...]
//		}
//  // NEEDED:
//  // title
//  // subtitle
// }
export default function Section ({
  id,
  title,
  totalPages,
  isLastPage,
  initialItems
}) {
  const { t } = useTranslation('common')

  return (
    <Layout>
      <Head>
        <title>{t('meta_section_title')}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content={t('meta_section_description')} />
      </Head>
      <SectionGrid
        id={id}
        title={title}
        totalPages={totalPages}
        isLastPage={isLastPage}
        initialItems={initialItems}
      />
    </Layout>
  )
}

export async function getServerSideProps (context) {
  const { id, title } = context.query

  const res = await GetSection(id)
  // const res = {
  //   data: content
  // }

  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common'])),
      id: res.data.id,
      title: title,
      totalPages: res.data.items.totalPages,
      isLastPage: res.data.items.last,
      initialItems: res.data.items.content
    }
  }
}

const content = {
  id: 2,
  viewType: null,
  gridCount: null,
  items: {
    content: [
      {
        id: 50427,
        title: ' Fran Galović kao „Hrvatski đak“',
        subtitle: 'Fran Galović',
        placeholderText: 'Nejasna teorija ostaje',
        actionButtonText: null,
        negativeActionButtonText: null,
        parentId: 50427,
        parentNavigationType: 'SPIRITUS_DETAILS',
        itemId: 39,
        itemNavigationType: 'STORY_DETAILS',
        itemPayload: null,
        imageUrl: 'https://walk.spiritusapp.com/images/522/spiritus',
        flags: []
      },
      {
        id: 50420,
        title: 'Velimir Chytil - poetično lutkarstvo',
        subtitle: 'Velimir Chytil',
        placeholderText: 'Ugledni hrvatski lutkarski umjetnik',
        actionButtonText: null,
        negativeActionButtonText: null,
        parentId: 50420,
        parentNavigationType: 'SPIRITUS_DETAILS',
        itemId: 26,
        itemNavigationType: 'STORY_DETAILS',
        itemPayload: null,
        imageUrl: 'https://walk.spiritusapp.com/images/508/spiritus',
        flags: []
      },
      {
        id: 13359,
        title: 'Reincarnation: the path to invention',
        subtitle: 'Henry Ford',
        placeholderText: "Ford's realization of life – and objects",
        actionButtonText: null,
        negativeActionButtonText: null,
        parentId: 13359,
        parentNavigationType: 'SPIRITUS_DETAILS',
        itemId: 14,
        itemNavigationType: 'STORY_DETAILS',
        itemPayload: null,
        imageUrl: 'https://walk.spiritusapp.com/images/495/spiritus',
        flags: []
      },
      {
        id: 13346,
        title: 'Elizabeth Arden or The Queen – or maybe both?',
        subtitle: 'Elizabeth Arden',
        placeholderText: 'How did Florence Nightingale become Elizabeth Arden?',
        actionButtonText: null,
        negativeActionButtonText: null,
        parentId: 13346,
        parentNavigationType: 'SPIRITUS_DETAILS',
        itemId: 1,
        itemNavigationType: 'STORY_DETAILS',
        itemPayload: null,
        imageUrl: 'https://walk.spiritusapp.com/images/465/spiritus',
        flags: []
      },
      {
        id: 50418,
        title: 'Zlata Bartl – Teta Vegeta',
        subtitle: 'Zlata Bartl',
        placeholderText: 'Kraj 1950-ih godina obilježio našu današnjicu',
        actionButtonText: null,
        negativeActionButtonText: null,
        parentId: 50418,
        parentNavigationType: 'SPIRITUS_DETAILS',
        itemId: 23,
        itemNavigationType: 'STORY_DETAILS',
        itemPayload: null,
        imageUrl: 'https://walk.spiritusapp.com/images/504/spiritus',
        flags: []
      }
    ],
    pageable: {
      sort: {
        sorted: false,
        unsorted: true,
        empty: true
      },
      offset: 0,
      pageNumber: 0,
      pageSize: 5,
      paged: true,
      unpaged: false
    },
    totalElements: 18,
    totalPages: 4,
    last: false,
    size: 5,
    number: 0,
    sort: {
      sorted: false,
      unsorted: true,
      empty: true
    },
    numberOfElements: 5,
    first: true,
    empty: false
  }
}
