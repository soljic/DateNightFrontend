// Methods in /service/http/proxy call same-origin (NextJS) api server.
// This is done primarily to aviod CORS issues.
// Check /pages/api for implementation details.

import axios from "axios";

export function ProxySearchSpiritus(searchTerm) {
  return axios.get(`/api/search?q=${searchTerm}`);
}

export function ProxyCreateSpiritus(accessToken, spiritusFormData) {
  return axios.post("/api/spiritus/create", spiritusFormData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  });
}

export function ProxyCreateStory(accessToken, storyFormData) {
  return axios.post("/api/story/create", storyFormData, {
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
