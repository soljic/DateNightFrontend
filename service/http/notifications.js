import axios from "axios";

import { API_URL } from "../constants";

export async function GetNotificationsCount(accessToken) {
  return await axios.get(`${API_URL}/v2/notification/count`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function GetNotifications(accessToken, lang) {
  return await axios.get(`${API_URL}/v2/notification`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Accept-Language": lang ? lang : "hr",
    },
  });
}

export async function ReadAllNotifications(accessToken) {
  return await axios.put(
    `${API_URL}/v2/notification`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}
