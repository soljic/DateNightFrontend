import axios from "axios";

import { API_URL } from "../constants";
import { ImagePath } from "../util";

export async function GetObituaries(date, page) {
  const p = page ? page : 0;

  const res = await axios.get(
    `${API_URL}/wapi/obituary/date?date=${date}&page=${p}&size=${20}`
  );

  res.data.content.forEach((item) => {
    if (item?.image?.url) {
      item.image.url = item.image.url ? ImagePath(item.image.url) : null;
    }
  });

  return res;
}

export async function GetSingleObituary(id) {
  const res = await axios.get(`${API_URL}/wapi/obituary/${id}`);

  res.data.spiritus.images.forEach((img) => {
    img.url = img.url ? ImagePath(img.url) : null;
  });

  if (res?.data?.obituary?.religiousImage) {
    res.data.obituary.religiousImage.url = res.data.obituary.religiousImage.url
      ? ImagePath(res.data.obituary.religiousImage.url)
      : null;
  }

  if (res?.data?.obituary?.obituaryImage) {
    res.data.obituary.obituaryImage.url = res.data.obituary.obituaryImage.url
      ? ImagePath(res.data.obituary.obituaryImage.url)
      : null;
  }

  return res;
}

export async function GetObituaryBySpiritusSlug(slug, accessToken) {
  let res;
  if (accessToken) {
    res = await axios.get(`${API_URL}/wapi/obituary/spiritus/${slug}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } else {
    res = await axios.get(`${API_URL}/wapi/obituary/spiritus/${slug}`);
  }

  if (res?.data?.obituary?.religiousImage) {
    res.data.obituary.religiousImage.url = res.data.obituary.religiousImage.url
      ? ImagePath(res.data.obituary.religiousImage.url)
      : null;
  }

  if (res?.data?.obituary?.obituaryImage) {
    res.data.obituary.obituaryImage.url = res.data.obituary.obituaryImage.url
      ? ImagePath(res.data.obituary.obituaryImage.url)
      : null;
  }

  if (res?.data?.organization?.image) {
    res.data.organization.image.url = res.data.organization.image.url
      ? ImagePath(res.data.organization.image.url)
      : null;
  }

  if (res.data?.spiritus?.profileImage) {
    res.data.spiritus.profileImage.url = res.data.spiritus.profileImage.url
      ? ImagePath(res.data.spiritus.profileImage.url)
      : null;
  }

  if (res.data?.spiritus?.funeralOrg?.image) {
    res.data.spiritus.funeralOrg.image.url = res.data.spiritus.funeralOrg.image
      .url
      ? ImagePath(res.data.spiritus.funeralOrg.image.url)
      : null;
  }

  return res;
}

export async function GetReligiousImages() {
  const res = await axios.get(`${API_URL}/v2/partner/religious-image`);

  res.data.forEach((img) => {
    img.url = img?.url ? ImagePath(img.url) : null;
  });

  return res;
}

export async function GetPartners() {
  const res = await axios.get(`${API_URL}/v2/organization`);

  res.data.forEach((org) => {
    if (org.image && org.image?.url) {
      org.image.url = org.image.url ? ImagePath(org.image.url) : null;
    }
  });

  return res;
}
