import { API_URL } from "./constants";

export function ImagePath(subpath) {
  return `${API_URL}${subpath}/`;
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