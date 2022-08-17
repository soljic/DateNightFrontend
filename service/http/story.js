import axios from "axios";
import { ImagePath } from "../util";
import { API_URL, defaultLimit, defaultOffset } from "../constants";

export async function GetStoryById(id) {
  return await axios.get(`${API_URL}/wapi/stories/id/${id}`);
}

export async function GetStoryBySlug(slug) {
  return await axios.get(`${API_URL}/wapi/stories/${slug}`);
}

export async function GetSpiritusStoriesBySlug(spiritus_slug, offset, limit) {
  const o = offset ? offset : defaultOffset;
  const l = limit ? limit : defaultLimit;

  const res = await axios.get(
    `${API_URL}/wapi/stories/spiritus/${spiritus_slug}?page=${o}&size=${l}`
  );

  // expand image paths to full paths
  res.data.content.forEach((story) => {
    story.paragraphs.forEach((p) => {
      p.imageUrl = p.imageUrl ? ImagePath(p.imageUrl) : null;
    });
  });
  return res;
}

export async function GetSpiritusStoriesByID(id, offset, limit) {
  const o = offset ? offset : defaultOffset;
  const l = limit ? limit : defaultLimit;
  const res = await axios.get(
    `${API_URL}/stories/spiritus/${id}?page=${o}&size=${l}&sort=id`
  );

  // expand image paths to full paths
  res.data.content.forEach((story) => {
    story.paragraphs.forEach((p) => {
      p.imageUrl = p.imageUrl ? ImagePath(p.imageUrl) : null;
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
