import axios from "axios";
import { ImagePath } from "../util";
import { API_URL, defaultLimit, defaultOffset } from "../constants";

export async function GetSpiritusById(id) {
  const res = await axios.get(`${API_URL}/wapi/spiritus/id/${id}`);
  res.data.images.forEach((img) => {
    img.url = img.url ? ImagePath(img.url) : null;
  });
  return res;
}

export async function GetSpiritusBySlug(slug) {
  const res = await axios.get(`${API_URL}/wapi/spiritus/${slug}`);
  res.data.images.forEach((img) => {
    img.url = img.url ? ImagePath(img.url) : null;
  });

  return res;
}

export async function CreateSpiritusFromObj(accessToken, obj) {
  return await axios.post(`${API_URL}/wapi/spiritus`, obj, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function CreateSpiritusImage(accessToken, id, file) {
  return await axios.post(`${API_URL}/wapi/spiritus/${id}/image`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: file,
  });
}

export async function PaginatePopularSpiritus(offset, limit) {
  const o = offset ? offset : defaultOffset;
  const l = limit ? limit : defaultLimit;
  const res = await axios.get(
    `${API_URL}/wapi/spiritus/popular?page=${o}&size=${l}`
  );
  res.data.content.forEach((elem) => {
    elem.images.forEach((img) => {
      img.url = ImagePath(img.url);
    });
  });
  return res;
}

export async function GetTags() {
  return await axios.get(`${API_URL}/tags`);
}

export async function SearchSpiritusNames(fullName, offset, limit) {
  const s = fullName.split(" ", 2);
  const o = offset ? offset : defaultOffset;
  const l = limit ? limit : defaultLimit;

  let res;
  if (s.length > 1) {
    res = await axios.get(
      encodeURI(
        `${API_URL}/wapi/spiritus/search?name=${s[0]}&lastname=${s[1]}&page=${o}&size=${l}&sort=id`
      )
    );
  } else {
    res = await axios.get(
      encodeURI(
        `${API_URL}/wapi/spiritus/search?name=${s[0]}&page=${o}&size=${l}&sort=id`
      )
    );
  }

  res.data.content.forEach((spiritus) => {
    spiritus.images.forEach((img) => {
      img.url = img.url ? ImagePath(img.url) : null;
    });
  });

  return res;
}

export async function SearchSpiritusFullText(text, offset, limit) {
  const o = offset ? offset : defaultOffset;
  const l = limit ? limit : defaultLimit;

  const res = await axios.get(
    encodeURI(
      `${API_URL}/wapi/spiritus/search/full?value=${text}&page=${o}&size=${l}&sort=id`
    )
  );

  res.data.content.forEach((spiritus) => {
    spiritus.images.forEach((img) => {
      img.url = img.url ? ImagePath(img.url) : null;
    });
  });

  return res;
}

