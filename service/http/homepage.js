import axios from 'axios'
import { ImagePath } from '../util'
import { API_URL } from '../constants'

export async function GetHomepage () {
  const res = await axios.get(`${API_URL}/wapi/homepage`)
  return res
}

// check example/example_homepage.json for details
// Sections are parsed and their imageUrls are expanded
// to include the full image URL.
export async function GetParsedHomepage () {
  console.log('CALLING ELVIS')
  const res = await GetHomepage()
  const sections = {
    main_story: {},

    featured_section: {},
    discover_section: {},
    categories_section: {},
    anniversaries_section: {}

    // maybe parse memory walk to extract
    // number of spiritus near user (requires location access)
    // "memory_walk": [],
  }

  if (!res.data?.homeListItems) {
    return sections
  }

  res.data.homeListItems.forEach(section => {
    switch (section.title) {
      case 'Discover':
        sections.discover_section.section_id = section.id
        sections.discover_section.items = []
        section.items.content.forEach(item => {
          item.imageUrl = item.imageUrl ? ImagePath(item.imageUrl) : null
          sections.discover_section.items.push(item)
        })
      case 'Categories':
        sections.categories_section.section_id = section.id
        sections.categories_section.items = []
        section.items.content.forEach(item => {
          item.imageUrl = item.imageUrl ? ImagePath(item.imageUrl) : null
          sections.categories_section.items.push(item)
        })
      case 'Anniversaries':
        sections.anniversaries_section.section_id = section.id
        sections.anniversaries_section.items = []
        section.items.content.forEach(item => {
          item.imageUrl = item.imageUrl ? ImagePath(item.imageUrl) : null
          sections.anniversaries_section.items.push(item)
        })
      case 'Featured stories':
        sections.featured_section.section_id = section.id
        sections.featured_section.items = []
        section.items.content.forEach(item => {
          item.imageUrl = item.imageUrl ? ImagePath(item.imageUrl) : null
          sections.featured_section.items.push(item)
        })
      default:
        // this is the featured story
        if (section.viewType === 'FEATURED' && section.items.content.length) {
          const data = section.items.content[0]
          data.imageUrl = data.imageUrl ? ImagePath(data.imageUrl) : null
          sections.main_story.section_id = section.id
          sections.main_story = data
        }
    }
  })

  return sections
}
