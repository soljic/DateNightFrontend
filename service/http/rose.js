import axios from "axios";
import { API_URL } from "../constants";

export async function SendRose(id, message, accessToken) {
  const data = { tribute: message };
  if (accessToken) {
    return await axios.post(`${API_URL}/wapi/rose/spiritus/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
  return await axios.post(`${API_URL}/wapi/rose/spiritus/${id}`, data);
}
