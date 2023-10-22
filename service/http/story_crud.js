import axios from "axios";

import { API_URL } from "../constants";
import { ImagePath } from "../util";

export async function CreateStory(accessToken, storyFormData, locale) {
  return await axios.post(`${API_URL}/wapi/story`, storyFormData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
      "Accept-Language": locale || "en",
    },
  });
}

// Get story in its original language, useful in story editor.
export async function GetStoryInOriginalLang(accessToken, storyId) {
  const res = await axios.get(
    `${API_URL}/wapi/stories/id/${storyId}/original`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (res?.data?.images) {
    res.data.images.forEach((image) => {
      image.url = image.url ? ImagePath(image.url) : null;
    });
  }
  return res;
}

export async function EditStory(accessToken, storyId, storyData) {
  return await axios.put(`${API_URL}/wapi/story/${storyId}`, storyData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function DeleteStory(accessToken, storyId) {
  return await axios.delete(`${API_URL}/wapi/story/${storyId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function DeleteStoryImage(accessToken, imageId) {
  return await axios.delete(`${API_URL}/wapi/story/image/${imageId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function AddStoryImage(accessToken, storyId, imageFormData) {
  return await axios.put(
    `${API_URL}/wapi/story/${storyId}/image`,
    imageFormData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
}
