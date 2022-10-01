import axios from "axios";

export async function ProxySendRose(accessToken, id, name, message) {
  const data = { name, tribute: message }
  console.log("#ID", id, data)
  return await axios.post(
    `/api/spiritus/rose/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}
