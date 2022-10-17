import axios from "axios";
import { ImagePath } from "../util";
import { API_URL } from "../constants";
import { defaultLimit, defaultOffset, validateFilter } from "../constants";

// Supports SPIRITUS, PLACES and STORY.
export async function GlobalSearch(searchType, value, offset, limit) {
  const o = offset ? offset : defaultOffset;
  const l = limit ? limit : defaultLimit;

  if (!validateFilter(searchType)) {
    throw `Invalid filter ${searchType}`;
  }

  const res = await axios.get(
    encodeURI(
      `${API_URL}/wapi/search?value=${value}&search_type=${searchType}&page=${o}&size=${l}`
    )
  );

  res.data.content.forEach((item) => {
    item.imageUrl = item.imageUrl ? ImagePath(item.imageUrl) : null;
  });

  return res;
}

// Performs full text spiritus search -> can match name, lastname etc.
// This might get better results when running fulltext search for spiritus names.
export async function FulltextSpiritusSearch(searchTerm, offset, limit) {
  const o = offset ? offset : defaultOffset;
  const l = limit ? limit : defaultLimit;

  const res = await axios.get(
    `${API_URL}/wapi/spiritus/search/full?value=${searchTerm}&page=${o}&size=${l}`
  );

  res.data.content.forEach((spiritus) => {
    spiritus.images.forEach((img) => {
      img.url = img.url ? ImagePath(img.url) : null;
    });
  });

  return res;
}
