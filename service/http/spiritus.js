import axios from "axios";

import { API_URL, defaultLimit, defaultOffset } from "../constants";
import { ImagePath } from "../util";

// Works on both PAID and UNPAID spiritus
// -> used in checkout pages and redirect pages like /spiritus/id/[id]
export async function GetSpiritusById(id, accessToken, lang) {
  let res;
  if (accessToken) {
    res = await axios.get(`${API_URL}/wapi/spiritus/id/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang ? lang : "hr",
      },
    });
  } else {
    res = await axios.get(`${API_URL}/wapi/spiritus/id/${id}`);
  }

  if (res.data?.profileImage) {
    res.data.profileImage.url = res.data.profileImage.url
      ? ImagePath(res.data.profileImage.url)
      : null;
  }

  return res;
}

export async function GetUnpaidSpiritusList(accessToken, lang) {
  const res = await axios.get(`${API_URL}/v2/spiritus/unpaid`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Accept-Language": lang ? lang : "hr",
    },
  });

  res.data.forEach((elem) => {
    if (elem?.image?.url) {
      elem.image.url = ImagePath(elem.image.url);
    }
  });

  return res;
}

// [DEPRECATED] it does not contain the embedded spiritus response
export async function GetSpiritusGalleryImages(spiritusId, offset, limit) {
  const o = offset ? offset : defaultOffset;
  const l = limit ? limit : defaultLimit;

  const res = await axios.get(
    `${API_URL}/wapi/spiritus/${spiritusId}/image?page=${o}&size=${l}`
  );
  // returns [ { id, url, height, width, profile }, ... ]
  res.data.content.forEach((img) => {
    img.url = img.url ? ImagePath(img.url) : null;
  });

  return res;
}

export async function GetSpiritusGalleryImagesV2(
  spiritusId,
  offset,
  limit,
  accessToken
) {
  const o = offset ? offset : defaultOffset;
  const l = limit ? limit : defaultLimit;

  let res;
  if (accessToken) {
    res = await axios.get(
      `${API_URL}/wapi/spiritus/${spiritusId}/images?page=${o}&size=${l}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } else {
    res = await axios.get(
      `${API_URL}/wapi/spiritus/${spiritusId}/images?page=${o}&size=${l}`
    );
  }

  // returns [ { id, url, height, width, profile }, ... ]
  res.data.images.content.forEach((img) => {
    img.url = img.url ? ImagePath(img.url) : null;
  });

  if (res.data?.spiritus?.profileImage) {
    res.data.spiritus.profileImage.url = res.data.spiritus.profileImage.url
      ? ImagePath(res.data.spiritus.profileImage.url)
      : null;
  }

  return res;
}

export async function GetSpiritusTributes(spiritusId, offset, limit, lang) {
  const o = offset ? offset : defaultOffset;
  const l = limit ? limit : defaultLimit;

  const res = await axios.get(
    `${API_URL}/wapi/rose/spiritus/${spiritusId}/tribute?page=${o}&size=${l}`,
    {
      headers: {
        "Accept-Language": lang ? lang : "hr",
      },
    }
  );

  return res;
}

export async function GetSpiritusBySlug(slug, accessToken, lang) {
  const headers = {
    "Accept-Language": lang ? lang : "hr",
  };
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  const res = await axios.get(`${API_URL}/wapi/spiritus/${slug}`, { headers });

  if (res.data?.profileImage) {
    res.data.profileImage.url = res.data.profileImage.url
      ? ImagePath(res.data.profileImage.url)
      : null;
  }

  if (res.data?.funeralOrg?.image) {
    res.data.funeralOrg.image.url = res.data.funeralOrg.image.url
      ? ImagePath(res.data.funeralOrg.image.url)
      : null;
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

export async function GetTags(lang) {
  return await axios.get(`${API_URL}/wapi/tag`, {
    headers: {
      "Accept-Language": lang ? lang : "hr",
    },
  });
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
