import axios from 'axios'
import { ImagePath } from '../util'
import { API_URL } from '../constants'

export async function GetHomepage () {
  // const res = await axios.get(`${API_URL}/wapi/homepage`)
  const res = {
    data: data
  }
  return res
}

// check example/example_homepage.json for details
// Sections are parsed and their imageUrls are expanded
// to include the full image URL.
export async function GetParsedHomepage () {
  const res = await GetHomepage()
  const sections = {
    storyOfTheWeek: {},

    featured: {},
    discover: {},
    categories: {},
    anniversaries: {}

    // maybe parse memory walk to extract
    // number of spiritus near user (requires location access)
    // "memory_walk": [],
  }

  if (!res.data?.homeListItems) {
    return sections
  }

  // does in-place replacements on imageUrl string while iterating
  res.data.homeListItems.forEach(section => {
    switch (section.title) {
      case 'Discover':
        sections.discover.id = section.id
        sections.discover.title = section.title
        sections.discover.itemType = "STORY"

        sections.discover.items = []
        section.items.content.forEach((item, i) => {
          item.imageUrl = item.imageUrl ? ImagePath(item.imageUrl) : null
          sections.discover.items.push(item)
        })
        break
      case 'Categories':
        sections.categories.id = section.id
        sections.categories.title = section.title
        sections.categories.itemType = "STORY"

        sections.categories.items = []
        section.items.content.forEach(item => {
          item.imageUrl = item.imageUrl ? ImagePath(item.imageUrl) : null
          sections.categories.items.push(item)
        })
        break
      case 'Anniversaries':
        sections.anniversaries.id = section.id
        sections.anniversaries.title = section.title
        sections.anniversaries.itemType = "SPIRITUS"

        sections.anniversaries.items = []
        section.items.content.forEach(item => {
          item.imageUrl = item.imageUrl ? ImagePath(item.imageUrl) : null
          sections.anniversaries.items.push(item)
        })
        break
      case 'Featured stories':
        sections.featured.id = section.id
        sections.featured.title = section.title
        sections.featured.itemType = "STORY"

        sections.featured.items = []
        section.items.content.forEach(item => {
          item.imageUrl = item.imageUrl ? ImagePath(item.imageUrl) : null
          sections.featured.items.push(item)
        })
        break
      default:
        // this is the featured story
        if (section.viewType === 'FEATURED' && section.items.content.length) {
          const data = section.items.content[0]
          data.imageUrl = data.imageUrl ? ImagePath(data.imageUrl) : null
          sections.storyOfTheWeek.id = section.id
          sections.storyOfTheWeek = data
        }
    }
  })

  return sections
}

const data = {
  homeListItems: [
    {
      id: 1,
      viewType: 'FEATURED',
      title: null,
      state: null,
      subtitle: null,
      flags: ['FEATURED_SECTION'],
      listPayload: null,
      version: 'v1',
      items: {
        content: [
          {
            id: 1,
            title: 'STORY OF THE WEEK',
            subtitle: 'Fran Galović',
            placeholderText: 'Pojava avangarde i postmodernizma Frana Galovića',
            actionButtonText: 'Read story',
            negativeActionButtonText: null,
            parentId: 50427,
            parentNavigationType: 'SPIRITUS_DETAILS',
            itemId: 40,
            itemNavigationType: 'STORY_DETAILS',
            itemPayload: null,
            imageUrl: '/images/522/spiritus',
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
          pageSize: 1,
          paged: true,
          unpaged: false
        },
        totalElements: 1,
        totalPages: 1,
        last: true,
        size: 1,
        number: 0,
        sort: {
          sorted: false,
          unsorted: true,
          empty: true
        },
        numberOfElements: 1,
        first: true,
        empty: false
      }
    },
    {
      id: 2,
      viewType: 'LARGE',
      title: 'Discover',
      state: null,
      subtitle: null,
      flags: ['DISCOVERY_SECTION', 'SHOW_ALL'],
      listPayload: null,
      version: 'v1',
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
            imageUrl: '/images/522/spiritus',
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
            imageUrl: '/images/508/spiritus',
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
            imageUrl: '/images/495/spiritus',
            flags: []
          },
          {
            id: 13346,
            title: 'Elizabeth Arden or The Queen – or maybe both?',
            subtitle: 'Elizabeth Arden',
            placeholderText:
              'How did Florence Nightingale become Elizabeth Arden?',
            actionButtonText: null,
            negativeActionButtonText: null,
            parentId: 13346,
            parentNavigationType: 'SPIRITUS_DETAILS',
            itemId: 1,
            itemNavigationType: 'STORY_DETAILS',
            itemPayload: null,
            imageUrl: '/images/465/spiritus',
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
            imageUrl: '/images/504/spiritus',
            flags: []
          },
          {
            id: 50419,
            title: 'Vinko Vošicki – koprivnički tiskar',
            subtitle: 'Vinko Vošicki',
            placeholderText: 'Ideali koji ne posustaju',
            actionButtonText: null,
            negativeActionButtonText: null,
            parentId: 50419,
            parentNavigationType: 'SPIRITUS_DETAILS',
            itemId: 25,
            itemNavigationType: 'STORY_DETAILS',
            itemPayload: null,
            imageUrl: '/images/506/spiritus',
            flags: []
          },
          {
            id: 50433,
            title: 'Tomo Šestak – hrvatski glazbenik ',
            subtitle: 'Tomo Šestak',
            placeholderText: 'Osnivanje prvog limenog orkestra',
            actionButtonText: null,
            negativeActionButtonText: null,
            parentId: 50433,
            parentNavigationType: 'SPIRITUS_DETAILS',
            itemId: 46,
            itemNavigationType: 'STORY_DETAILS',
            itemPayload: null,
            imageUrl: '/images/532/spiritus',
            flags: []
          },
          {
            id: 50421,
            title: 'Pavao Vuk – Pavlović : "Pavao Wolf"',
            subtitle: 'Pavao Vuk Pavlović',
            placeholderText: ' Filozofska i pedagoška aktivnost',
            actionButtonText: null,
            negativeActionButtonText: null,
            parentId: 50421,
            parentNavigationType: 'SPIRITUS_DETAILS',
            itemId: 28,
            itemNavigationType: 'STORY_DETAILS',
            itemPayload: null,
            imageUrl: '/images/510/spiritus',
            flags: []
          },
          {
            id: 50422,
            title: 'Mariška Holoubek Funjak – domaća rock zvijezda',
            subtitle: 'Mariška Holoubek Funjak',
            placeholderText: 'Vitalnost i u zalasku dana.',
            actionButtonText: null,
            negativeActionButtonText: null,
            parentId: 50422,
            parentNavigationType: 'SPIRITUS_DETAILS',
            itemId: 30,
            itemNavigationType: 'STORY_DETAILS',
            itemPayload: null,
            imageUrl: '/images/512/spiritus',
            flags: []
          },
          {
            id: 50424,
            title: 'Josip Vargović – čovjek koji je modernizirao Koprivnicu',
            subtitle: 'Josip Vargović',
            placeholderText: 'Gradonačelnik i vizionar',
            actionButtonText: null,
            negativeActionButtonText: null,
            parentId: 50424,
            parentNavigationType: 'SPIRITUS_DETAILS',
            itemId: 34,
            itemNavigationType: 'STORY_DETAILS',
            itemPayload: null,
            imageUrl: '/images/516/spiritus',
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
          pageSize: 10,
          paged: true,
          unpaged: false
        },
        totalElements: 18,
        totalPages: 2,
        last: false,
        size: 10,
        number: 0,
        sort: {
          sorted: false,
          unsorted: true,
          empty: true
        },
        numberOfElements: 10,
        first: true,
        empty: false
      }
    },
    {
      id: 3,
      viewType: 'MEDIUM',
      title: 'Categories',
      state: null,
      subtitle: null,
      flags: ['CATEGOIRES_SECTION'],
      listPayload: null,
      version: 'v1',
      items: {
        content: [
          {
            id: 31,
            title: 'Ljubav',
            subtitle: null,
            placeholderText: null,
            actionButtonText: null,
            negativeActionButtonText: null,
            parentId: null,
            parentNavigationType: null,
            itemId: 31,
            itemNavigationType: 'STORIES_LIST_CATEGORY',
            itemPayload: null,
            imageUrl: '/images/558/tag',
            flags: null
          },
          {
            id: 32,
            title: 'Rat',
            subtitle: null,
            placeholderText: null,
            actionButtonText: null,
            negativeActionButtonText: null,
            parentId: null,
            parentNavigationType: null,
            itemId: 32,
            itemNavigationType: 'STORIES_LIST_CATEGORY',
            itemPayload: null,
            imageUrl: '/images/559/tag',
            flags: null
          },
          {
            id: 33,
            title: 'Život',
            subtitle: null,
            placeholderText: null,
            actionButtonText: null,
            negativeActionButtonText: null,
            parentId: null,
            parentNavigationType: null,
            itemId: 33,
            itemNavigationType: 'STORIES_LIST_CATEGORY',
            itemPayload: null,
            imageUrl: '/images/560/tag',
            flags: null
          },
          {
            id: 34,
            title: 'Family',
            subtitle: null,
            placeholderText: null,
            actionButtonText: null,
            negativeActionButtonText: null,
            parentId: null,
            parentNavigationType: null,
            itemId: 34,
            itemNavigationType: 'STORIES_LIST_CATEGORY',
            itemPayload: null,
            imageUrl: '/images/561/tag',
            flags: null
          },
          {
            id: 35,
            title: 'Posveta',
            subtitle: null,
            placeholderText: null,
            actionButtonText: null,
            negativeActionButtonText: null,
            parentId: null,
            parentNavigationType: null,
            itemId: 35,
            itemNavigationType: 'STORIES_LIST_CATEGORY',
            itemPayload: null,
            imageUrl: '/images/562/tag',
            flags: null
          },
          {
            id: 36,
            title: 'Hobi',
            subtitle: null,
            placeholderText: null,
            actionButtonText: null,
            negativeActionButtonText: null,
            parentId: null,
            parentNavigationType: null,
            itemId: 36,
            itemNavigationType: 'STORIES_LIST_CATEGORY',
            itemPayload: null,
            imageUrl: '/images/563/tag',
            flags: null
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
          pageSize: 10,
          paged: true,
          unpaged: false
        },
        totalElements: 6,
        totalPages: 1,
        last: true,
        size: 10,
        number: 0,
        sort: {
          sorted: false,
          unsorted: true,
          empty: true
        },
        numberOfElements: 6,
        first: true,
        empty: false
      }
    },
    {
      id: 4,
      viewType: 'LARGE',
      title: 'Anniversaries',
      state: null,
      subtitle: null,
      flags: ['SHOW_ALL', 'ANNIVERSARIES_SECTION'],
      listPayload: null,
      version: 'v1',
      items: {
        content: [
          {
            id: 50423,
            title: 'Leander Brozović',
            subtitle: '02 Oct 1897 — 31 Aug 1962',
            placeholderText: 'Povjesničar vrijedan spomena',
            actionButtonText: null,
            negativeActionButtonText: null,
            parentId: null,
            parentNavigationType: null,
            itemId: 50423,
            itemNavigationType: 'SPIRITUS_DETAILS',
            itemPayload: null,
            imageUrl: '/images/514/spiritus',
            flags: []
          },
          {
            id: 50430,
            title: 'Fedor Malančec',
            subtitle: '12 Feb 1902 — 09 Aug 1985',
            placeholderText: 'Od slikanja do glazbe',
            actionButtonText: null,
            negativeActionButtonText: null,
            parentId: null,
            parentNavigationType: null,
            itemId: 50430,
            itemNavigationType: 'SPIRITUS_DETAILS',
            itemPayload: null,
            imageUrl: '/images/526/spiritus',
            flags: []
          },
          {
            id: 13350,
            title: 'Maria Montessori',
            subtitle: '31 Aug 1870 — 06 May 1952',
            placeholderText: 'The woman for people',
            actionButtonText: null,
            negativeActionButtonText: null,
            parentId: null,
            parentNavigationType: null,
            itemId: 13350,
            itemNavigationType: 'SPIRITUS_DETAILS',
            itemPayload: null,
            imageUrl: '/images/474/spiritus',
            flags: []
          },
          {
            id: 13352,
            title: 'Coco Chanel',
            subtitle: '19 Aug 1883 — 10 Jan 1971',
            placeholderText:
              'How did The Queen of fashion influence even when it was not her intention',
            actionButtonText: null,
            negativeActionButtonText: null,
            parentId: null,
            parentNavigationType: null,
            itemId: 13352,
            itemNavigationType: 'SPIRITUS_DETAILS',
            itemPayload: null,
            imageUrl: '/images/478/spiritus',
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
          pageSize: 10,
          paged: true,
          unpaged: false
        },
        totalElements: 4,
        totalPages: 1,
        last: true,
        size: 10,
        number: 0,
        sort: {
          sorted: false,
          unsorted: true,
          empty: true
        },
        numberOfElements: 4,
        first: true,
        empty: false
      }
    },
    {
      id: 10,
      viewType: 'BANNER',
      title: null,
      state: null,
      subtitle: null,
      flags: ['BANNERS_SECTION'],
      listPayload: null,
      version: 'v1',
      items: {
        content: [
          {
            id: 6,
            title: 'Login or register account!',
            subtitle: 'Keep memories of loved ones',
            placeholderText: null,
            actionButtonText: 'Create account',
            negativeActionButtonText: 'Login',
            parentId: null,
            parentNavigationType: null,
            itemId: null,
            itemNavigationType: 'REGISTER_ACCOUNT',
            itemPayload: null,
            imageUrl: null,
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
          pageSize: 1,
          paged: true,
          unpaged: false
        },
        totalElements: 1,
        totalPages: 1,
        last: true,
        size: 1,
        number: 0,
        sort: {
          sorted: false,
          unsorted: true,
          empty: true
        },
        numberOfElements: 1,
        first: true,
        empty: false
      }
    },
    {
      id: 6,
      viewType: 'LARGE',
      title: 'Featured stories',
      state: null,
      subtitle: 'The best stories that we think are on Spiritus.',
      flags: ['SHOW_ALL', 'FEATURED_STORIES'],
      listPayload: null,
      version: 'v1',
      items: {
        content: [
          {
            id: 39,
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
            imageUrl: '/images/522/spiritus',
            flags: ['FEATURED', 'PUBLIC']
          },
          {
            id: 27,
            title: ' „Pošten odnos prema lutki, predstavi i teatru“',
            subtitle: 'Velimir Chytil',
            placeholderText: 'Lutke kao stil života',
            actionButtonText: null,
            negativeActionButtonText: null,
            parentId: 50420,
            parentNavigationType: 'SPIRITUS_DETAILS',
            itemId: 27,
            itemNavigationType: 'STORY_DETAILS',
            itemPayload: null,
            imageUrl: '/images/508/spiritus',
            flags: ['FEATURED', 'PUBLIC']
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
          pageSize: 10,
          paged: true,
          unpaged: false
        },
        totalElements: 2,
        totalPages: 1,
        last: true,
        size: 10,
        number: 0,
        sort: {
          sorted: false,
          unsorted: true,
          empty: true
        },
        numberOfElements: 2,
        first: true,
        empty: false
      }
    },
    {
      id: 11,
      viewType: 'BANNER',
      title: null,
      state: null,
      subtitle: null,
      flags: ['BANNERS_SECTION'],
      listPayload: null,
      version: 'v1',
      items: {
        content: [
          {
            id: 7,
            title: null,
            subtitle:
              'Turn on location for Memory Walks and graveyards in your area.',
            placeholderText:
              'Turn on location for Memory Walks and graveyards in your area.',
            actionButtonText: 'Turn on location',
            negativeActionButtonText: 'About',
            parentId: null,
            parentNavigationType: null,
            itemId: null,
            itemNavigationType: 'ENABLE_LOCATION',
            itemPayload: null,
            imageUrl: null,
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
          pageSize: 1,
          paged: true,
          unpaged: false
        },
        totalElements: 1,
        totalPages: 1,
        last: true,
        size: 1,
        number: 0,
        sort: {
          sorted: false,
          unsorted: true,
          empty: true
        },
        numberOfElements: 1,
        first: true,
        empty: false
      }
    },
    {
      id: 7,
      viewType: 'MEMORY_WALK',
      title: 'Memory Walk',
      state: null,
      subtitle:
        'Explore cemeteries and all of the beautiful Stories that are near you',
      flags: ['SHOW_ALL', 'MEMORY_WALK_SECTION'],
      listPayload: null,
      version: 'v1',
      items: {
        content: [
          {
            id: 8,
            title: 'Memory walk',
            subtitle: 'Pri Sv. Duhu Koprivnica,Koprivnic,Croatia',
            placeholderText: null,
            actionButtonText: 'Enter Memory Walk',
            negativeActionButtonText: 'About',
            parentId: null,
            parentNavigationType: null,
            itemId: 8,
            itemNavigationType: 'MEMORY_WALK',
            itemPayload:
              "{  'numberOfSpiritus':'15.8k',  'numberOfFeaturedSpiritus':18 }",
            imageUrl: '/images/544/graveyard',
            flags: null
          },
          {
            id: 35,
            title: 'Memory walk',
            subtitle: 'Novo groblje Dubrava,Vukovar,Croatia',
            placeholderText: null,
            actionButtonText: 'Enter Memory Walk',
            negativeActionButtonText: 'About',
            parentId: null,
            parentNavigationType: null,
            itemId: 35,
            itemNavigationType: 'MEMORY_WALK',
            itemPayload:
              "{  'numberOfSpiritus':'8.7k',  'numberOfFeaturedSpiritus':0 }",
            imageUrl: '/images/545/graveyard',
            flags: null
          },
          {
            id: 39,
            title: 'Memory walk',
            subtitle: 'Vukovar - staro katoličko groblje,Vukovar,Croatia',
            placeholderText: null,
            actionButtonText: 'Enter Memory Walk',
            negativeActionButtonText: 'About',
            parentId: null,
            parentNavigationType: null,
            itemId: 39,
            itemNavigationType: 'MEMORY_WALK',
            itemPayload:
              "{  'numberOfSpiritus':'2.0k',  'numberOfFeaturedSpiritus':0 }",
            imageUrl: '/images/553/graveyard',
            flags: null
          },
          {
            id: 12,
            title: 'Memory walk',
            subtitle: 'Reka,Koprivnic,Croatia',
            placeholderText: null,
            actionButtonText: 'Enter Memory Walk',
            negativeActionButtonText: 'About',
            parentId: null,
            parentNavigationType: null,
            itemId: 12,
            itemNavigationType: 'MEMORY_WALK',
            itemPayload:
              "{  'numberOfSpiritus':'1.7k',  'numberOfFeaturedSpiritus':0 }",
            imageUrl: '/images/552/graveyard',
            flags: null
          },
          {
            id: 38,
            title: 'Memory walk',
            subtitle: 'Vukovar - pravoslavno groblje,Vukovar,Croatia',
            placeholderText: null,
            actionButtonText: 'Enter Memory Walk',
            negativeActionButtonText: 'About',
            parentId: null,
            parentNavigationType: null,
            itemId: 38,
            itemNavigationType: 'MEMORY_WALK',
            itemPayload:
              "{  'numberOfSpiritus':'1.3k',  'numberOfFeaturedSpiritus':0 }",
            imageUrl: '/images/549/graveyard',
            flags: null
          },
          {
            id: 36,
            title: 'Memory walk',
            subtitle: 'Sotin - katoličko groblje,Vukovar,Croatia',
            placeholderText: null,
            actionButtonText: 'Enter Memory Walk',
            negativeActionButtonText: 'About',
            parentId: null,
            parentNavigationType: null,
            itemId: 36,
            itemNavigationType: 'MEMORY_WALK',
            itemPayload:
              "{  'numberOfSpiritus':'600+',  'numberOfFeaturedSpiritus':0 }",
            imageUrl: '/images/546/graveyard',
            flags: null
          },
          {
            id: 11,
            title: 'Memory walk',
            subtitle: 'Jagnjedovec,Koprivnic,Croatia',
            placeholderText: null,
            actionButtonText: 'Enter Memory Walk',
            negativeActionButtonText: 'About',
            parentId: null,
            parentNavigationType: null,
            itemId: 11,
            itemNavigationType: 'MEMORY_WALK',
            itemPayload:
              "{  'numberOfSpiritus':'400+',  'numberOfFeaturedSpiritus':0 }",
            imageUrl: '/images/551/graveyard',
            flags: null
          },
          {
            id: 10,
            title: 'Memory walk',
            subtitle: 'Herešin,Koprivnic,Croatia',
            placeholderText: null,
            actionButtonText: 'Enter Memory Walk',
            negativeActionButtonText: 'About',
            parentId: null,
            parentNavigationType: null,
            itemId: 10,
            itemNavigationType: 'MEMORY_WALK',
            itemPayload:
              "{  'numberOfSpiritus':'300+',  'numberOfFeaturedSpiritus':0 }",
            imageUrl: '/images/550/graveyard',
            flags: null
          },
          {
            id: 9,
            title: 'Memory walk',
            subtitle: 'Bakovčice,Koprivnic,Croatia',
            placeholderText: null,
            actionButtonText: 'Enter Memory Walk',
            negativeActionButtonText: 'About',
            parentId: null,
            parentNavigationType: null,
            itemId: 9,
            itemNavigationType: 'MEMORY_WALK',
            itemPayload:
              "{  'numberOfSpiritus':'300+',  'numberOfFeaturedSpiritus':0 }",
            imageUrl: '/images/547/graveyard',
            flags: null
          },
          {
            id: 34,
            title: 'Memory walk',
            subtitle: 'Lipovača,Vukovar,Croatia',
            placeholderText: null,
            actionButtonText: 'Enter Memory Walk',
            negativeActionButtonText: 'About',
            parentId: null,
            parentNavigationType: null,
            itemId: 34,
            itemNavigationType: 'MEMORY_WALK',
            itemPayload:
              "{  'numberOfSpiritus':'300+',  'numberOfFeaturedSpiritus':0 }",
            imageUrl: '/images/555/graveyard',
            flags: null
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
          pageSize: 10,
          paged: true,
          unpaged: false
        },
        totalElements: 12,
        totalPages: 2,
        last: false,
        size: 10,
        number: 0,
        sort: {
          sorted: false,
          unsorted: true,
          empty: true
        },
        numberOfElements: 10,
        first: true,
        empty: false
      }
    }
  ]
}
