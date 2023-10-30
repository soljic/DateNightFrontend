import axios from "axios";

import { API_URL } from "../constants";

export async function GetLinks(id, accessToken, locale) {
  let res;
  if (accessToken) {
    res = await axios.get(`${API_URL}/v2/spiritus/${id}/link`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": locale ? locale : "en",
      },
    });
  } else {
    res = await axios.get(`${API_URL}/v2/spiritus/${id}/link`);
  }

  return res;
}
// uses v2/spiritus web API endpoint
// data: { text, link }
export async function AddLink(accessToken, spiritus_id, data, locale) {
  return await axios.post(
    `${API_URL}/wapi/spiritus/id/${spiritus_id}/link`,
    data,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
        "Accept-Language": locale || "en",
      },
    }
  );
}

// data: { id: link_id, text, link }
// I guess BE checks link_id is valid and user has access to it
export async function EditLink(accessToken, data, locale) {
  return await axios.put(`${API_URL}/wapi/spiritus/link/`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json",
      "Accept-Language": locale || "en",
    },
  });
}

export async function DeleteLink(accessToken, link_id) {
  return await axios.delete(`${API_URL}/wapi/spiritus/link/${link_id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
