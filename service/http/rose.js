import axios from "axios";
import { API_URL } from "../constants";

export async function SendRose(id, message) {
  const data = { tribute: message };
  return await axios.post(`${API_URL}/wapi/rose/spiritus/${id}`, data);
}
