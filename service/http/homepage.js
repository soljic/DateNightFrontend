import axios from "axios";
import { ImagePath } from "../util";
import { API_URL } from "../constants";

export async function GetHomepage() {
  return await axios.get(`${API_URL}/wapi/homepage`);
}

// check example/example_homepage.json for details
// Sections are parsed and their imageUrls are expanded
// to include the full image URL.
export async function GetParsedHomepage() {
  const res = await GetHomepage();
  const sections = {
    featuredStory: {},

    featured: {},
    discover: {},
    categories: {},
    anniversaries: {},

    // maybe parse memory walk to extract
    // number of spiritus near user (requires location access)
    // "memory_walk": [],
  };

  if (!res.data?.homeListItems) {
    return sections;
  }

  // does in-place replacements on imageUrl string while iterating
  res.data.homeListItems.forEach((section) => {
    if (section.flags.includes("DISCOVERY_SECTION")) {
      sections.discover.id = section.id;
      sections.discover.title = section.title;
      sections.discover.itemType = "STORY";

      sections.discover.items = [];
      section.items.content.forEach((item, i) => {
        item.imageUrl = item.imageUrl ? ImagePath(item.imageUrl) : null;
        sections.discover.items.push(item);
      });
    } else if (section.flags.includes("CATEGOIRES_SECTION")) {
      sections.categories.id = section.id;
      sections.categories.title = section.title;
      sections.categories.itemType = "STORY";

      sections.categories.items = [];
      section.items.content.forEach((item) => {
        item.imageUrl = item.imageUrl ? ImagePath(item.imageUrl) : null;
        sections.categories.items.push(item);
      });
    } else if (section.flags.includes("ANNIVERSARIES_SECTION")) {
      sections.anniversaries.id = section.id;
      sections.anniversaries.title = section.title;
      sections.anniversaries.itemType = "SPIRITUS";

      sections.anniversaries.items = [];
      section.items.content.forEach((item) => {
        item.imageUrl = item.imageUrl ? ImagePath(item.imageUrl) : null;
        sections.anniversaries.items.push(item);
      });
    } else if (section.flags.includes("FEATURED_STORIES")) {
      sections.featured.id = section.id;
      sections.featured.title = section.title;
      sections.featured.itemType = "STORY";

      sections.featured.items = [];
      section.items.content.forEach((item) => {
        item.imageUrl = item.imageUrl ? ImagePath(item.imageUrl) : null;
        sections.featured.items.push(item);
      });
    } else if (section.flags.includes("FEATURED_SECTION")) {
      // this is the featured story
      if (section.viewType === "FEATURED" && section.items.content.length) {
        const data = section.items.content[0];
        data.imageUrl = data.imageUrl ? ImagePath(data.imageUrl) : null;
        sections.featuredStory.id = section.id;
        sections.featuredStory.title = data.title;
        sections.featuredStory.subtitle = data.subtitle;
        sections.featuredStory = data;
      }
    }
  });

  return sections;
}
