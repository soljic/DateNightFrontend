import axios from "axios";
import { API_URL } from "../constants";

export async function SaveSpiritus(accessToken, id) {
  return await axios.put(
    `${API_URL}/wapi/spiritus/${id}/save`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

export async function UnSaveSpiritus(accessToken, id) {
  return await axios.put(
    `${API_URL}/wapi/spiritus/${id}/unsave`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

export async function SaveStory(accessToken, id) {
  return await axios.put(
    `${API_URL}/wapi/story/save/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

export async function UnSaveStory(accessToken, id) {
  return await axios.put(
    `${API_URL}/wapi/story/unsave/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}
