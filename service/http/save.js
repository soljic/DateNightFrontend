import axios from "axios";

export async function ProxySaveSpiritus(accessToken, id) {
  return await axios.put(`/api/save/spiritus/${id}`, {}, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function ProxyUnSaveSpiritus(accessToken, id) {
  return await axios.put(`/api/unsave/spiritus/${id}`, {}, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function ProxySaveStory(accessToken, id) {
  return await axios.put(`/api/save/story/${id}`, {}, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function ProxyUnSaveStory(accessToken, id) {
  return await axios.put(`/api/unsave/story/${id}`, {},  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
