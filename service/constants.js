export const API_URL = process.env.NEXT_API_URL;
export const MOVIE_API = "http://localhost:5000"
export const defaultOffset = 0;
export const defaultLimit = 10;

export const FILTER_SPIRITUS = "SPIRITUS";
export const FILTER_CEMETERY = "CEMETERY";
export const FILTER_PLACE = "PLACE";
export const FILTER_STORY = "STORY";

const validFilters = [
  FILTER_SPIRITUS,
  FILTER_CEMETERY,
  FILTER_PLACE,
  FILTER_STORY,
];

export function validateFilter(filter) {
  if (validFilters.includes(filter)) {
    return true;
  }
  return false;
}
