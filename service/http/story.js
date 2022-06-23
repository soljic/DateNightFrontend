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
