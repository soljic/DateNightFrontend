import axios from "axios";

export async function ProxySendRose(id, name, message) {
  const data = { name, tribute: message };
  return await axios.post(`/api/spiritus/rose/${id}`, data);
}
