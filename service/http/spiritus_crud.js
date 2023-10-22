import axios from "axios";

import { API_URL } from "../constants";
import { ImagePath } from "../util";

// uses v2/spiritus web API endpoint
export async function CreateSpiritus(accessToken, spiritusFormData, locale) {
  return await axios.post(`${API_URL}/wapi/spiritus`, spiritusFormData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
      "Accept-Language": locale || "en",
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

// Get spiritus in original language, useful in spiritus editor.
export async function GetSpiritusInOriginalLanguage(id, accessToken) {
  if (accessToken) {
    const res = await axios.get(`${API_URL}/wapi/spiritus/id/${id}/original`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (res.data?.profileImage) {
      res.data.profileImage.url = res.data.profileImage.url
        ? ImagePath(res.data.profileImage.url)
        : null;
    }
    return res;
  }
  return {};
}

export async function EditSpiritus(accessToken, spiritusData, locale) {
  return await axios.put(`${API_URL}/wapi/spiritus`, spiritusData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json",
      "Accept-Language": locale || "en",
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
  profileImageId,
  imageFormData // cropped image inside form data
) {
  return await axios.put(
    `${API_URL}/wapi/spiritus/${spiritusId}/profileImage?profileImageId=${profileImageId}`,
    imageFormData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
}
