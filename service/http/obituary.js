import axios from "axios";
import { ImagePath } from "../util";
import { API_URL } from "../constants";

export async function GetObituaries(date, page) {
  const p = page ? page : 0;

  const res = await axios.get(
    `${API_URL}/wapi/obituary/date?date=${date}&page=${p}&size=${20}`
  );

  res.data.content.forEach((item) => {
    if (item?.image?.url) {
      item.image.url = item.image.url ? ImagePath(item.image.url) : null;
    }
  });

  return res;
}

export async function GetSingleObituary(id) {
  const p = page ? page : 0;

  const res = await axios.get(`${API_URL}/wapi/obituary/${id}`);

  res.data.spiritus.images.forEach((img) => {
    img.url = img.url ? ImagePath(img.url) : null;
  });

  res.data.obituary.religiousImage.url = res.data.obituary.religiousImage.url
    ? ImagePath(res.data.obituary.religiousImage.url)
    : null;
  res.data.obituary.obituaryImage.url = res.data.obituary.obituaryImage.url
    ? ImagePath(res.data.obituary.obituaryImage.url)
    : null;

  return res;
}
