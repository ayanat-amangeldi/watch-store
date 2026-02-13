import { apiRequest } from "./api.js";

const list = document.getElementById("ordersList");

async function loadOrders() {
  try {
    // Загружаем заказы пользователя
    const orders = await apiRequest("/orders/my");

    if (!orders || orders.length === 0) {
      list.innerHTML = "<p>You have no orders yet.</p>";
      return;
    }

    list.innerHTML = ""; // Очищаем контейнер

    // Перебираем все заказы и отображаем их
    orders.forEach(order => {
      const itemsHtml = order.items
        .map(
          item => `
            <li>
              ${item.model} — ${item.quantity} × ${item.price} $
            </li>
          `
        )
        .join("");

      list.innerHTML += `
        <div class="card">
          <h3>Order #${order._id.slice(-6)}</h3>
          <p>Status: <strong>${order.status}</strong></p>
          <p>Total: <strong>${order.totalPrice} $</strong></p>
          <p>Date: ${new Date(order.createdAt).toLocaleString()}</p>

          <ul>
            ${itemsHtml}
          </ul>
        </div>
      `;
    });
  } catch (err) {
    list.innerHTML = "<p>Failed to load orders.</p>";
    console.error(err);
  }
}

// Загружаем заказы при загрузке страницы
loadOrders();
