import axios from "axios";
import { API_URL } from "../constants";

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

