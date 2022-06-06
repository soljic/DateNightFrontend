import axios from "axios";
import { ImagePath } from "../util";
import { API_URL, defaultLimit, defaultOffset } from "../constants";

// TODO:
// this route should be public
// refactor this once the route becomes public
export async function GetSpiritus(id, accessToken) {
  return await axios.get(`${API_URL}/spiritus/self/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function GetSpiritusStories(id, offset, limit) {
  const o = offset ? offset : defaultOffset;
  const l = limit ? limit : defaultLimit;
  const res = await axios.get(
    // NOTE: sorting by ID is hardcoded
    // the API does not support sort order - it always returns descending order
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

export async function PaginatePopularSpiritus(offset, limit) {
  const o = offset ? offset : defaultOffset;
  const l = limit ? limit : defaultLimit;
  const res = await axios.get(
    `${API_URL}/spiritus/popular?page=${o}&size=${l}`
  );
  res.data.content.forEach((elem) => {
    elem.images.forEach((img) => {
      img.url = ImagePath(img.url);
    });
  });
  return res;
}

export async function GetSpiritusTags() {
  return await axios.get(`${API_URL}/tags`);
}

export async function SearchSpiritus(fullName, offset, limit) {
  const s = fullName.split(" ", 2);
  const o = offset ? offset : defaultOffset;
  const l = limit ? limit : defaultLimit;

  if (s.length > 1) {
    return await axios.get(
      encodeURI(`${API_URL}/spiritus/search?name=${s[0]}&lastname=${s[1]}&page=${o}&size=${l}&sort=id`)
    );
  }
  return await axios.get(
    encodeURI(`${API_URL}/spiritus/search?name=${s[0]}&page=${o}&size=${l}&sort=id`)
  );
}

export async function GetStory(id) {
  return await axios.get(`${API_URL}/stories/${id}`);
}
