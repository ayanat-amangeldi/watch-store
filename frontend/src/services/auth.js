import { apiFetch } from "./api";

export const login = (email, password) =>
  apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const register = (email, password) =>
  apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const getMe = () => apiFetch("/auth/me");

export const forgotPassword = (email) =>
  apiFetch("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });

export const changePassword = (newPassword) =>
  apiFetch("/auth/change-password", {
    method: "POST",
    body: JSON.stringify({ newPassword }),
  });
