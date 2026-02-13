const API = "/api/v1";
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

const list = document.getElementById("cartList");
const totalEl = document.getElementById("total");
const msg = document.getElementById("msg");

async function loadCart() {
  const res = await fetch(API + "/cart", {
    headers: { Authorization: "Bearer " + token }
  });

  const cart = await res.json();

  list.innerHTML = "";
  let total = 0;

  if (!cart.items || cart.items.length === 0) {
    list.innerHTML = "<p>Your cart is empty.</p>";
    totalEl.textContent = "Total: 0 $";
    return;
  }

  for (const item of cart.items) {
    const wRes = await fetch(API + "/watches/" + item.watchId);
    const watch = await wRes.json();

    const itemTotal = watch.price * item.quantity;
    total += itemTotal;

    list.innerHTML += `
      <div class="cart-card">
        <img src="${watch.imageUrl || 'https://via.placeholder.com/150'}">
        <div class="cart-info">
          <h3>${watch.model}</h3>
          <p>$${watch.price}</p>

          <div class="qty-box">
            <button onclick="changeQty('${item.watchId}', ${item.quantity - 1})">-</button>
            <span>${item.quantity}</span>
            <button onclick="changeQty('${item.watchId}', ${item.quantity + 1})">+</button>
          </div>

          <button class="remove" onclick="removeItem('${item.watchId}')">
            Remove
          </button>
        </div>
      </div>
    `;
  }

  totalEl.textContent = "Total: " + total + " $";
}

async function changeQty(id, qty) {
  if (qty <= 0) {
    return removeItem(id);
  }

  await fetch(API + "/cart/items/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ quantity: qty })
  });

  loadCart();
}

async function removeItem(id) {
  await fetch(API + "/cart/items/" + id, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token }
  });

  loadCart();
}

document.getElementById("checkoutBtn").onclick = async () => {
  const res = await fetch(API + "/orders", {
    method: "POST",
    headers: { Authorization: "Bearer " + token }
  });

  const data = await res.json();

  if (!res.ok) {
    msg.textContent = data.message;
    return;
  }

  msg.textContent = "Order placed successfully ✔";
  loadCart();
};

window.changeQty = changeQty;
window.removeItem = removeItem;

loadCart();
