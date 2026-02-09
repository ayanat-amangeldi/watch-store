const API_URL = "http://localhost:3000/api/v1";

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(API_URL + path, {
    ...options,
    headers,
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
}
