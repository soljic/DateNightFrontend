// Methods in /service/http/proxy are proxied by nextjs to BE api server.
// This is done primarily to aviod CORS issues since the BE server is slightly misconfigured.
// The BE server development is focused on mobile apps.

import axios from "axios";

export function ProxySearchSpiritus(searchTerm) {
  return axios.get(`/api/search?q=${searchTerm}`);
}

// The request is proxied to BE - check next.config.js::rewrites()
export async function ProxyCreateSpiritus(accessToken, spiritusFormData) {
  return await axios.post("/api/spiritus/create", spiritusFormData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  });
}

// The request is proxied to BE - check next.config.js::rewrites()
export async function ProxyCreateStory(accessToken, storyFormData) {
  return await axios.post("/api/story/create", storyFormData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  });
}

// The request is proxied to BE - check next.config.js::rewrites()
export async function ProxyEditStory(accessToken, storyId, storyData) {
  return await axios.put(`/api/story/edit/${storyId}`, storyData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function ProxyDeleteStory(accessToken, storyId) {
  return await axios.delete(`/api/story/delete/${storyId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// Deletes a Story image.
// The request is proxied to BE - check next.config.js::rewrites()
export async function ProxyDeleteStoryImage(accessToken, imageId) {
  return await axios.delete(`/api/story/image/delete/${imageId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// Adds a Story image.
// The request is proxied to BE - check next.config.js::rewrites()
export async function ProxyAddStoryImage(accessToken, storyId, imageFormData) {
  return await axios.put(`/api/story/${storyId}/image`, imageFormData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  });
}


// The request is proxied to BE - check next.config.js::rewrites()
export async function ProxyEditSpiritus(accessToken, spiritusData) {
  return await axios.put(`/api/spiritus/edit`, spiritusData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json",
    },
  });
}

// Deletes a Spiritus.
// The request is proxied to BE - check next.config.js::rewrites()
export async function ProxyDeleteSpiritus(accessToken, spiritusId) {
  return await axios.delete(`/api/spiritus/delete/${spiritusId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// Deletes a Spiritus image.
// The request is proxied to BE - check next.config.js::rewrites()
export async function ProxyDeleteSpiritusImage(accessToken, spiritusId, imageId) {
  return await axios.delete(`/api/spiritus/${spiritusId}/image/delete/${imageId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// Adds a Spiritus image.
// The request is proxied to BE - check next.config.js::rewrites()
export async function ProxyAddSpiritusImage(accessToken, spiritusId, imageFormData) {
  return await axios.post(`/api/spiritus/${spiritusId}/image`, imageFormData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  });
}

export function ProxyGetTags() {
  return axios.get("/api/tags");
}

export function ProxyGetSection(id, page) {
  return axios.get(`/api/section?id=${id}&page=${page}`);
}


