import { ImagePath } from "../util";
import { defaultLimit, defaultOffset, validateFilter } from "../constants";
import { ProxyGlobalSearch, ProxySearchSpiritus } from "./proxy";

// Supports SPIRITUS, PLACES and STORY. The API response does not contain images.
export async function GlobalSearch(searchType, value, offset, limit) {
  const o = offset ? offset : defaultOffset;
  const l = limit ? limit : defaultLimit;

  if (!validateFilter(searchType)) {
    throw `Invalid filter ${searchType}`;
  }

  const res = await ProxyGlobalSearch(searchType, value, o, l);
  return res;
}

// Performs full text spiritus search -> can match name, lastname etc.
// Unline GlobalSearch (ProxyGlobalSearch) this returns Spiritus image URLs.
export async function FulltextSpiritusSearch(searchTerm, offset, limit) {
  const o = offset ? offset : defaultOffset;
  const l = limit ? limit : defaultLimit;

  const res = await ProxySearchSpiritus(searchTerm, o, l);
  res.data.content.forEach((spiritus) => {
    spiritus.images.forEach((img) => {
      img.url = img.url ? ImagePath(img.url) : null;
    });
  });

  return res;
}
