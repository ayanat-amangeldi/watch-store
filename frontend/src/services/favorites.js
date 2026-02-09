import { apiFetch } from "./api";

/**
 * POST /api/v1/favorites/:watchId
 * Добавить в избранные
 */
export const addToFavorites = (watchId) =>
  apiFetch(`/favorites/${watchId}`, {
    method: "POST",
  });

/**
 * DELETE /api/v1/favorites/:watchId
 * Удалить из избранных
 */
export const removeFromFavorites = (watchId) =>
  apiFetch(`/favorites/${watchId}`, {
    method: "DELETE",
  });

/**
 * GET /api/v1/favorites
 * Получить мои избранные
 */
export const getFavorites = () =>
  apiFetch("/favorites");
