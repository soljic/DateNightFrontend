// Methods in /service/http/proxy call same-origin (NextJS) api server
// This is done primarily to aviod CORS issues

import axios from "axios";

export function ProxySearchSpiritus(searchTerm) {
  return axios.get(`/api/search?q=${searchTerm}`);
}

export function ProxyCreateSpiritus(spiritusObj, accessToken) {
  return axios.post("/api/spiritus/create", spiritusObj, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}


export function ProxyCreateStory(storyObj, accessToken) {
  return axios.post("/api/story/create", storyObj, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}