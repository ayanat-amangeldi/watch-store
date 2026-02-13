export const API_URL = "http://localhost:3000/api/v1";

export function authHeaders() {
  const token = localStorage.getItem("token");

  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
}
