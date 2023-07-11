import axios from "axios";

import { API_URL } from "../constants";
import { ImagePath } from "../util";
import { MockResponse } from "./hp";

export async function GetHomepage() {
  return await axios.get(`${API_URL}/wapi/homepage`);
}

// check example/example_homepage.json for details
// Sections are parsed and their imageUrls are expanded
// to include the full image URL.
export async function GetParsedHomepage() {
  // const res = await GetHomepage();
  const res = MockResponse;
  const sections = {
    featured: {},
    categories: {},
    anniversaries: {},
    recent: {},
  };

  if (!res?.homeListItems) {
    return sections;
  }

  // does in-place replacements on imageUrl string while iterating
  res.homeListItems.forEach((section) => {
    if (section.flags.includes("CATEGOIRES_SECTION")) {
      sections.categories.id = section.id;
      sections.categories.title = section.title;
      sections.categories.itemType = "SECTION";

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
    } else if (section.flags.includes("NEW_SECTION")) {
      sections.recent.id = section.id;
      sections.recent.title = section.title;
      sections.recent.subtitle = section.subtitle;
      sections.recent.itemType = "SPIRITUS";

      sections.recent.items = [];
      section.items.content.forEach((item) => {
        item.imageUrl = item.imageUrl ? ImagePath(item.imageUrl) : null;
        sections.recent.items.push(item);
      });
    }
  });

  return sections;
}
