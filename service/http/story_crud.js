import axios from "axios";

import { API_URL } from "../constants";

export async function CreateStory(accessToken, storyFormData, locale) {
  return await axios.post(`${API_URL}/wapi/story`, storyFormData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
      "Accept-Language": locale,
    },
  });
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
