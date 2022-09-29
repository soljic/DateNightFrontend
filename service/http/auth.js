import axios from "axios";
import { ImagePath } from "../util";
import { API_URL, defaultLimit, defaultOffset } from "../constants";

export async function LoginCredentials(username, password) {
  return await axios.post(
    `${API_URL}/authentication/login?grant_type=credentials`,
    {
      username,
      password,
    }
  );
}

export async function Register(name, lastName, email, password) {
  const res = await axios.post(`${API_URL}/authentication/register`, {
    name,
    lastName,
    email,
    password,
  });
  return res;
}

export async function RefreshToken(refreshToken) {
  const res = await axios.post(
    `${API_URL}/authentication/refresh`,
    refreshToken
  );
  return res;
}

export async function GetProfile(accessToken) {
  return await axios.get(`${API_URL}/v2/user/account`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function ProfileSpiritus(accessToken, offset, limit) {
  const o = offset ? offset : defaultOffset;
  const l = limit ? limit : defaultLimit;

  const res = await axios.get(
    `${API_URL}/v2/user/account/spiritus?page=${0}&size=${l}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  res.data.content.forEach((elem) => {
    if (elem.image?.url) {
      elem.image.url = ImagePath(elem.image.url);
    }
  });
  return res;
}

// on self-origin
export async function ProxyProfile(accessToken) {
  return await axios.get(`/api/authentication/user/profile`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// on-self-origin
export async function ProxyProfileSpiritus(accessToken, offset, limit) {
  const o = offset ? offset : defaultOffset;
  const l = limit ? limit : defaultLimit;

  const res = await axios.get(
    `/api/authentication/user/spiritus?page=${o}&size=${l}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  res.data.content.forEach((elem) => {
    if (elem.image?.url) {
      elem.image.url = ImagePath(elem.image.url);
    }
  });
  return res;
}
