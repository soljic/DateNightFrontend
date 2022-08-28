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
    storyOfTheWeek: {},

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
    switch (section.title) {
      case "Discover":
        sections.discover.id = section.id;
        sections.discover.title = section.title;
        sections.discover.itemType = "STORY";

        sections.discover.items = [];
        section.items.content.forEach((item, i) => {
          item.imageUrl = item.imageUrl ? ImagePath(item.imageUrl) : null;
          sections.discover.items.push(item);
        });
        break;
      case "Categories":
        sections.categories.id = section.id;
        sections.categories.title = section.title;
        sections.categories.itemType = "STORY";

        sections.categories.items = [];
        section.items.content.forEach((item) => {
          item.imageUrl = item.imageUrl ? ImagePath(item.imageUrl) : null;
          sections.categories.items.push(item);
        });
        break;
      case "Anniversaries":
        sections.anniversaries.id = section.id;
        sections.anniversaries.title = section.title;
        sections.anniversaries.itemType = "SPIRITUS";

        sections.anniversaries.items = [];
        section.items.content.forEach((item) => {
          item.imageUrl = item.imageUrl ? ImagePath(item.imageUrl) : null;
          sections.anniversaries.items.push(item);
        });
        break;
      case "Featured stories":
        sections.featured.id = section.id;
        sections.featured.title = section.title;
        sections.featured.itemType = "STORY";

        sections.featured.items = [];
        section.items.content.forEach((item) => {
          item.imageUrl = item.imageUrl ? ImagePath(item.imageUrl) : null;
          sections.featured.items.push(item);
        });
        break;
      default:
        // this is the featured story
        if (section.viewType === "FEATURED" && section.items.content.length) {
          const data = section.items.content[0];
          data.imageUrl = data.imageUrl ? ImagePath(data.imageUrl) : null;
          sections.storyOfTheWeek.id = section.id;
          sections.storyOfTheWeek = data;
        }
    }
  });

  return sections;
}

