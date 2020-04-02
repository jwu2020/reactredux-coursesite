import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/authors/";

export function getAuthors() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}


export function deleteAuthor(authorId) {
  return fetch(baseUrl + authorId, { method: "DELETE" })
      .then(handleResponse)
      .catch(handleError);
}

export function createAuthor(author) {
  return fetch(baseUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(author)
  })
      .then(handleResponse)
      .catch(handleError);
}