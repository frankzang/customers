const api = "http://localhost:5000/";

function requestApi(endpoint, { method = "GET" } = {}) {
  return fetch(`${api}${endpoint}`, {
    method,
  });
}

export { requestApi };
