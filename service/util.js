import { API_URL } from "./constants";

export function ImagePath(subpath) {
  return `${API_URL}${subpath}/`;
}

