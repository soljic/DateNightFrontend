import axios from "axios";

import { API_URL } from "../constants";
import { ImagePath } from "../util";

export async function GetSection(id, page) {
  const p = page ? page : 0;

  const res = await axios.get(
    `${API_URL}/wapi/homepage/section/${id}?page=${p}&size=${12}`
  );

  res.data.items.content.forEach((item) => {
    item.imageUrl = item.imageUrl ? ImagePath(item.imageUrl) : null;
  });

  return res;
}

export async function GetSectionItem(sectionId, itemId, page) {
  const p = page ? page : 0;

  const res = await axios.get(
    `${API_URL}/wapi/homepage/section/${sectionId}/item/${itemId}?page=${p}&size=${12}`
  );

  res.data.items.content.forEach((item) => {
    item.imageUrl = item.imageUrl ? ImagePath(item.imageUrl) : null;
  });

  return res;
}
