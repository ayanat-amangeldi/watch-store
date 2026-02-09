import { apiFetch } from "./api";

/**
 * POST /api/v1/cart/items
 */
export const addToCart = (watchId, quantity = 1) =>
  apiFetch("/cart/items", {
    method: "POST",
    body: JSON.stringify({ watchId, quantity }),
  });

/**
 * GET /api/v1/cart
 */
export const getCart = () =>
  apiFetch("/cart");

/**
 * PATCH /api/v1/cart/items/:watchId
 */
export const updateCartItem = (watchId, quantity) =>
  apiFetch(`/cart/items/${watchId}`, {
    method: "PATCH",
    body: JSON.stringify({ quantity }),
  });

/**
 * DELETE /api/v1/cart/items/:watchId
 */
export const removeCartItem = (watchId) =>
  apiFetch(`/cart/items/${watchId}`, {
    method: "DELETE",
  });
