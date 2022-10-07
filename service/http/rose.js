import axios from "axios";

export async function ProxySendRose(id, message) {
  const data = { tribute: message };
  return await axios.post(`/api/spiritus/rose/${id}`, data);
}
