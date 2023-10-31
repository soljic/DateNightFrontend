import axios from "axios";

import { API_URL } from "../constants";

export async function GetCounter(accessToken) {
  return await axios.get(`${API_URL}/cms/payment/lifetime/count`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function GetRecentPaid(accessToken) {
  return await axios.get(`${API_URL}/cms/payment/lifetime`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
