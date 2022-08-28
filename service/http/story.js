import axios from "axios";
import { ImagePath } from "../util";
import { API_URL, defaultLimit, defaultOffset } from "../constants";

export async function GetStoryById(id) {
  const res = await axios.get(`${API_URL}/wapi/stories/id/${id}`);
  res.data.images.forEach((img) => {
    img.url = img.url ? ImagePath(img.url) : null;
  });
  return res;
}

export async function GetStoryBySlug(slug) {
  const res = await axios.get(`${API_URL}/wapi/stories/${slug}`);
  res.data.images.forEach((img) => {
    img.url = img.url ? ImagePath(img.url) : null;
  });
  return res;
}

export async function GetSpiritusStoriesBySlug(spiritus_slug, offset, limit) {
  const o = offset ? offset : defaultOffset;
  const l = limit ? limit : defaultLimit;

  const res = await axios.get(
    `${API_URL}/wapi/stories/spiritus/${spiritus_slug}?page=${o}&size=${l}`
  );

  // expand image paths to full paths
  res.data.content.forEach((story) => {
    story.images.forEach((img) => {
      img.url = img.url ? ImagePath(img.url) : null;
    });
  });
  return res;
}

export async function GetSpiritusStoriesByID(id, offset, limit) {
  const o = offset ? offset : defaultOffset;
  const l = limit ? limit : defaultLimit;

  const res = await axios.get(
    `${API_URL}/stories/spiritus/${id}?page=${o}&size=${l}`
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
