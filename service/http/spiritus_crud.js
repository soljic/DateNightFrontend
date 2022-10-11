import axios from "axios";
import { API_URL } from "../constants";

export async function CreateSpiritus(accessToken, spiritusFormData) {
  return await axios.post(`${API_URL}/wapi/spiritus`, spiritusFormData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function EditSpiritus(accessToken, spiritusData) {
  return await axios.put(`${API_URL}/v2/spiritus`, spiritusData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json",
    },
  });
}

export async function DeleteSpiritus(accessToken, spiritusId) {
  return await axios.delete(`${API_URL}/v2/spiritus/${spiritusId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function DeleteSpiritusImage(accessToken, spiritusId, imageId) {
  return await axios.delete(
    `${API_URL}/v2/spiritus/${spiritusId}/image/${imageId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

export async function AddSpiritusImage(accessToken, spiritusId, imageFormData) {
  return await axios.post(
    `${API_URL}/v2/spiritus/${spiritusId}/image`,
    imageFormData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
}
