import axios from "axios";

import { API_URL } from "../constants";
import { ImagePath } from "../util";

export async function GetSection(id, page, lang) {
  const p = page ? page : 0;

  const res = await axios.get(
    `${API_URL}/wapi/homepage/section/${id}?page=${p}&size=${12}`,
    {
      headers: {
        "Accept-Language": lang ? lang : "hr",
      },
    }
  );

  res.data.items.content.forEach((item) => {
    if (item?.imageObject?.url) {
      item.imageObject.url = item.imageObject.url
        ? ImagePath(item.imageObject.url)
        : null;
    }
  });

  return res;
}

export async function GetSectionItem(sectionId, itemId, page) {
  const p = page ? page : 0;

  const res = await axios.get(
    `${API_URL}/wapi/homepage/section/${sectionId}/item/${itemId}?page=${p}&size=${12}`
  );

  res.data.items.content.forEach((item) => {
    if (item?.imageObject?.url) {
      item.imageObject.url = item.imageObject.url
        ? ImagePath(item.imageObject.url)
        : null;
    }
  });

  return res;
}
