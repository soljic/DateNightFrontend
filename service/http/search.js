import axios from "axios";
import { ImagePath } from "../util";
import {
  API_URL,
  defaultLimit,
  defaultOffset,
  validateFilter,
} from "../constants";

export async function GlobalSearch(filter, value, offset, limit) {
  const o = offset ? offset : defaultOffset;
  const l = limit ? limit : defaultLimit;

  if (!validateFilter(filter)) {
    throw `Invalid filter ${filter}`;
  }

  const res = await axios.get(
    encodeURI(
      `${API_URL}/wapi/search?value=${value}&search_type=${filter}page=${o}&size=${l}`
    )
  );
  return res;
}
