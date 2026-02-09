import { apiFetch } from "./api";

/**
 * GET /api/v1/watches
 * Каталог часов + фильтры
 */
export const getWatches = (query = "") =>
  apiFetch(`/watches${query}`);

/**
 * GET /api/v1/watches/:id
 * Детальная страница
 */
export const getWatchById = (id) =>
  apiFetch(`/watches/${id}`);
