import axios from "axios";

import { API_URL } from "../constants";

// uses v2/spiritus web API endpoint
export async function CreateSpiritus(accessToken, spiritusFormData) {
  return await axios.post(`${API_URL}/wapi/spiritus`, spiritusFormData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  });
}

// uses v2/spiritus mobile API endpoint
export async function CreateSpiritusV2(accessToken, spiritusFormData) {
  return await axios.post(`${API_URL}/v2/spiritus`, spiritusFormData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function EditSpiritus(accessToken, spiritusData, locale) {
  const loc = locale || "en";

  return await axios.put(`${API_URL}/wapi/spiritus`, spiritusData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json",
      "Accept-Language": locale,
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

export async function SetSpiritusCoverImage(
  accessToken,
  spiritusId,
  coverImageId
) {
  return await axios.put(
    `${API_URL}/wapi/spiritus/${spiritusId}/coverImage?coverImageId=${coverImageId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

export async function AddSpiritusProfileImage(
  accessToken,
  spiritusId,
  imageFormData
) {
  return await axios.post(
    `${API_URL}/wapi/spiritus/${spiritusId}/profileImage`,
    imageFormData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

export async function SetSpiritusProfileImage(
  accessToken,
  spiritusId,
  profileImageId
) {
  return await axios.put(
    `${API_URL}/wapi/spiritus/${spiritusId}/profileImage?profileImageId=${profileImageId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}
