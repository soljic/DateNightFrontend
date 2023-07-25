import axios from "axios";

import { API_URL } from "../constants";
import { ImagePath } from "../util";

// import { MockResponse } from "./hp";

// default language is "hr"
export async function GetHomepage(lang) {
  return await axios.get(`${API_URL}/wapi/homepage`, {
    headers: {
      "Accept-Language": lang ? lang : "hr",
    },
  });
}

// check example/example_homepage.json for details
// Sections are parsed and their imageUrls are expanded
// to include the full image URL.
export async function GetParsedHomepage(lang) {
  const res = await GetHomepage(lang);

  const sections = {
    featured: {},
    categories: {},
    anniversaries: {},
    recent: {},
  };

  if (!res?.data?.homeListItems) {
    return sections;
  }

  // does in-place replacements on imageUrl string while iterating
  res.data.homeListItems.forEach((section) => {
    if (section.flags.includes("CATEGOIRES_SECTION")) {
      sections.categories.id = section.id;
      sections.categories.title = section.title;
      sections.categories.itemType = "SECTION";

      sections.categories.items = [];
      section.items.content.forEach((item) => {
        if (item?.imageObject?.url) {
          item.imageObject.url = item.imageObject.url
            ? ImagePath(item.imageObject.url)
            : null;
        }
        sections.categories.items.push(item);
      });
    } else if (section.flags.includes("ANNIVERSARIES_SECTION")) {
      sections.anniversaries.id = section.id;
      sections.anniversaries.title = section.title;
      sections.anniversaries.itemType = "SPIRITUS";

      sections.anniversaries.items = [];

      section.items.content.forEach((item) => {
        if (item?.imageObject?.url) {
          item.imageObject.url = item.imageObject.url
            ? ImagePath(item.imageObject.url)
            : null;
        }
        sections.anniversaries.items.push(item);
      });
    } else if (section.flags.includes("FEATURED_STORIES")) {
      sections.featured.id = section.id;
      sections.featured.title = section.title;
      sections.featured.itemType = "STORY";

      sections.featured.items = [];
      section.items.content.forEach((item) => {
        if (item?.imageObject?.url) {
          item.imageObject.url = item.imageObject.url
            ? ImagePath(item.imageObject.url)
            : null;
        }
        sections.featured.items.push(item);
      });
    } else if (section.flags.includes("NEW_SECTION")) {
      sections.recent.id = section.id;
      sections.recent.title = section.title;
      sections.recent.subtitle = section.subtitle;
      sections.recent.itemType = "SPIRITUS";

      sections.recent.items = [];
      section.items.content.forEach((item) => {
        if (item?.imageObject?.url) {
          item.imageObject.url = item.imageObject.url
            ? ImagePath(item.imageObject.url)
            : null;
        }
        sections.recent.items.push(item);
      });
    }
  });

  return sections;
}
