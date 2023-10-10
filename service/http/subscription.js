import axios from "axios";

import { API_URL } from "../constants";

export async function GetAccountSubscriptions(accessToken) {
  return await axios.get(`${API_URL}/v2/user/subscriptions`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
