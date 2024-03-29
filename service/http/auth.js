import axios from "axios";

import { API_URL, MOVIE_API, defaultLimit, defaultOffset } from "../constants";
import { ImagePath } from "../util";

export async function LoginCredentials(email, password) {
  console.log("MOVIE_API",MOVIE_API);
  return await axios.post(
    `${MOVIE_API}/api/account/login`,
    {
      email,
      password,
    }
  );
}

export async function LoginCode(code) {
  return await axios.post(
    `${API_URL}/v2/authentication/login?grant_type=authorization_code`,
    { code }
  );
}

export async function Logout(token) {
  if (!token) {
    return true;
  }

  return await axios.put(`${API_URL}/v2/authentication/logout`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function Register(name, username, email, password) {
  return await axios.post(`${API_URL}/v2/authentication/register`, {
    name,
    username,
    email,
    password,
  });
}

export async function SendPasswordResetEmail(email) {
  return await axios.post(
    `${API_URL}/v2/authentication/password/email?email=${email}`
  );
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
    `${API_URL}/v2/user/account/spiritus?page=${o}&size=${l}`,
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

// updateData = { name, surname, email, phone }
export async function UpdateProfile(accessToken, updateData) {
  return await axios.put(`${API_URL}/wapi/user/account`, updateData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function DeleteProfile(accessToken) {
  return await axios.delete(`${API_URL}/wapi/user/account`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
