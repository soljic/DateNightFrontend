import axios from "axios";
import { ImagePath } from "../util";
import { API_URL, defaultLimit, defaultOffset } from "../constants";

export async function GetSpiritusById(id, accessToken) {
  let res;
  if (accessToken) {
    res = await axios.get(`${API_URL}/wapi/spiritus/id/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } else {
    res = await axios.get(`${API_URL}/wapi/spiritus/id/${id}`);
  }

  if (res.data?.profileImage) {
    res.data.profileImage.url = res.data.profileImage.url ? ImagePath(res.data.profileImage.url) : null;
  }

  return res;
}

export async function GetUnpaidSpiritusList(accessToken) {
  const res = await axios.get(`${API_URL}/v2/spiritus/unpaid`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  res.data.forEach((elem) => {
    elem.images.forEach((img) => {
      img.url = img.url ? ImagePath(img.url) : null;
    });
  });

  return res;
}

export async function GetSpiritusGalleryImages(spiritusId, offset, limit) {
  const o = offset ? offset : defaultOffset;
  const l = limit ? limit : defaultLimit;

  const res = await axios.get(`${API_URL}/wapi/spiritus/${spiritusId}/image?page=${o}&size=${l}`);
  // returns [ { id, url, height, width, profile }, ... ]
  res.data.content.forEach((img) => {
    img.url = img.url ? ImagePath(img.url) : null;
  });

  return res;
}

export async function GetSpiritusTributes(spiritusId, offset, limit) {
  const o = offset ? offset : defaultOffset;
  const l = limit ? limit : defaultLimit;

  const res = await axios.get(
    `${API_URL}/wapi/rose/spiritus/${spiritusId}/tribute?page=${o}&size=${l}`
  );
 
  return res;
}

export async function GetSpiritusBySlug(slug, accessToken) {
  let res;
  if (accessToken) {
    res = await axios.get(`${API_URL}/wapi/spiritus/${slug}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } else {
    res = await axios.get(`${API_URL}/wapi/spiritus/${slug}`);
  }

  if (res.data?.profileImage) {
    res.data.profileImage.url = res.data.profileImage.url ? ImagePath(res.data.profileImage.url) : null;
  }

  return res;
}

export async function PaginatePopularSpiritus(offset, limit) {
  const o = offset ? offset : defaultOffset;
  const l = limit ? limit : defaultLimit;
  const res = await axios.get(
    `${API_URL}/wapi/spiritus/popular?page=${o}&size=${l}`
  );
  res.data.content.forEach((elem) => {
    elem.images.forEach((img) => {
      img.url = ImagePath(img.url);
    });
  });
  return res;
}

export async function GetTags() {
  return await axios.get(`${API_URL}/wapi/tag`);
}

export async function SearchSpiritusNames(fullName, offset, limit) {
  const s = fullName.split(" ", 2);
  const o = offset ? offset : defaultOffset;
  const l = limit ? limit : defaultLimit;

  let res;
  if (s.length > 1) {
    res = await axios.get(
      encodeURI(
        `${API_URL}/wapi/spiritus/search?name=${s[0]}&lastname=${s[1]}&page=${o}&size=${l}`
      )
    );
  } else {
    res = await axios.get(
      encodeURI(
        `${API_URL}/wapi/spiritus/search?name=${s[0]}&page=${o}&size=${l}`
      )
    );
  }

  res.data.content.forEach((spiritus) => {
    spiritus.images.forEach((img) => {
      img.url = img.url ? ImagePath(img.url) : null;
    });
  });

  return res;
}

export async function SearchSpiritusFullText(text, offset, limit) {
  const o = offset ? offset : defaultOffset;
  const l = limit ? limit : defaultLimit;

  const res = await axios.get(
    encodeURI(
      `${API_URL}/wapi/spiritus/search/full?value=${text}&page=${o}&size=${l}`
    )
  );

  res.data.content.forEach((spiritus) => {
    spiritus.images.forEach((img) => {
      img.url = img.url ? ImagePath(img.url) : null;
    });
  });

  return res;
}

export async function GetSpiritusByPlaceId(placeId, offset, limit) {
  const o = offset ? offset : defaultOffset;
  const l = limit ? limit : defaultLimit;

  const res = await axios.get(
    encodeURI(`${API_URL}/wapi/spiritus/place/${placeId}?page=${o}&size=${l}`)
  );

  res.data.content.forEach((spiritus) => {
    spiritus.images.forEach((img) => {
      img.url = img.url ? ImagePath(img.url) : null;
    });
  });

  return res;
}

export async function GetSpiritusCoverImages() {
  const res = await axios.get(`${API_URL}/wapi/spiritus/coverImage`);
  res.data.forEach((img) => {
    img.url = img.url ? ImagePath(img.url) : null;
  });
  return res;
}
