import { API_URL } from "./constants";

export function localFormatDate(ds, lang) {
  const dt = new Date(ds);
  const res = lang
    ? dt.toLocaleDateString(lang, {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : dt.toLocaleDateString("en", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
  return res.replaceAll(".", "");
}

export function ImagePath(path) {
  // check if path is already expanded
  // this happens sometimes with nextjs or browser caching
  if (path && path.startsWith("http")) {
    return path;
  }
  return `${API_URL}${path}`;
}

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
// Used in /pages/api/*
export function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
