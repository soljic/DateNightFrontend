import axios from "axios";

import { API_URL, defaultLimit, defaultOffset } from "../constants";
import { ImagePath } from "../util";

export async function GetStoryById(id, lang) {
  const res = await axios.get(`${API_URL}/wapi/stories/id/${id}`, {
    headers: {
      "Accept-Language": lang ? lang : "en",
    },
  });
  res.data?.images?.forEach((img) => {
    img.url = img.url ? ImagePath(img.url) : null;
  });
  return res;
}

export async function GetStoryBySlug(slug, accessToken, lang) {
  const headers = {
    "Accept-Language": lang ? lang : "en",
  };
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  const res = await axios.get(`${API_URL}/wapi/stories/${slug}`, { headers });

  res.data?.images?.forEach((img) => {
    img.url = img.url ? ImagePath(img.url) : null;
  });

  if (res.data?.spiritus?.profileImage?.url) {
    res.data.spiritus.profileImage.url = res.data.spiritus.profileImage.url
      ? ImagePath(res.data.spiritus.profileImage.url)
      : null;
  }

  if (res.data?.spiritus?.funeralOrg?.image) {
    res.data.spiritus.funeralOrg.image.url = res.data.spiritus.funeralOrg.image
      .url
      ? ImagePath(res.data.spiritus.funeralOrg.image.url)
      : null;
  }

  return res;
}

export async function GetSpiritusStoriesBySlug(
  spiritus_slug,
  offset,
  limit,
  accessToken,
  lang
) {
  const o = offset ? offset : defaultOffset;
  const l = limit ? limit : defaultLimit;

  const headers = {
    "Accept-Language": lang ? lang : "en",
  };
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  const res = await axios.get(
    `${API_URL}/wapi/stories/spiritus/${spiritus_slug}?page=${o}&size=${l}`,
    { headers }
  );

  // expand image paths to full paths
  res.data.content.forEach((story) => {
    story.images.forEach((img) => {
      img.url = img.url ? ImagePath(img.url) : null;
    });
  });
  return res;
}

export async function GetSpiritusStoriesByID(id, offset, limit, lang) {
  const o = offset ? offset : defaultOffset;
  const l = limit ? limit : defaultLimit;

  const res = await axios.get(
    `${API_URL}/stories/spiritus/${id}?page=${o}&size=${l}`,
    {
      headers: {
        "Accept-Language": lang ? lang : "en",
      },
    }
  );

  // expand image paths to full paths
  res.data.content.forEach((story) => {
    story.images.forEach((img) => {
      img.url = img.url ? ImagePath(img.url) : null;
    });
  });
  return res;
}

// Deprecated
export async function CreateStoryFromObj(accessToken, spiritusId, obj) {
  return await axios.post(`${API_URL}/stories/spiritus/${spiritusId}`, obj, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// Creates story from formData.
// formData contains both the file and the story request body.
// Story body:
// {
// 	"title": "naslov nove price",
// 	"paragraphs": [
// 		{
// 			"index": 0,
// 			"text": "nova prica je ovdje sa sacuvanim whitespaceom"
// 		}
// 	],
// 	"tags": [
// 		34,
// 		36
// 	],
// 	"private": false,
// 	"spiritusId": 73748
// }
export async function CreateStoryV2(accessToken, formData) {
  return await axios.post(`${API_URL}/wapi/story`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
}
