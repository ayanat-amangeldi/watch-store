// frontend/js/api.js
import { API_URL } from "./config.js";

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers
  });

 
  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login.html";
    return;
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "API error");
  }

  return data;
}
