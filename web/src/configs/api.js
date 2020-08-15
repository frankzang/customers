const api = "http://localhost:5000/";

function requestApi(endpoint, { method = "GET" } = {}) {
  const path = `${api}${endpoint}`;
  return fetch(path, {
    method,
  });
}

export { requestApi };
