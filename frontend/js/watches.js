const API = "http://localhost:3000/api/v1";

const list = document.getElementById("watchesList");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");

async function loadWatches() {
  const search = searchInput?.value || "";
  const sort = sortSelect?.value || "asc";

  try {
    const res = await fetch(
      `${API}/watches?q=${encodeURIComponent(search)}&sort=price&order=${sort}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch watches");
    }

    const items = await res.json();

    list.innerHTML = "";

    if (!items || items.length === 0) {
      list.innerHTML = "<p>No watches found</p>";
      return;
    }

    items.forEach(w => {
      list.innerHTML += `
        <div class="card">
          <h3>${w.model}</h3>
          <p>${w.price} $</p>

          <button class="btn" onclick="addToCart('${w._id}')">
            Add to cart
          </button>
        </div>
      `;
    });
  } catch (err) {
    console.error(err);
    list.innerHTML = "<p>Error loading watches</p>";
  }
}

/* ===== ADD TO CART ===== */
async function addToCart(id) {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "./login.html";
    return;
  }

  const res = await fetch(`${API}/cart/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      watchId: id,
      quantity: 1
    })
  });

  if (!res.ok) {
    const err = await res.json();
    alert(err.message || "Failed to add to cart");
  } else {
    alert("Added to cart");
  }
}

/* 🔴 ОБЯЗАТЕЛЬНО: делаем доступной для onclick */
window.addToCart = addToCart;

/* ===== EVENTS ===== */
searchInput?.addEventListener("input", loadWatches);
sortSelect?.addEventListener("change", loadWatches);

/* ===== INIT ===== */
loadWatches();
