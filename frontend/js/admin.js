const API = "http://localhost:3000/api/v1";
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

function parseJWT(token) {
  return JSON.parse(atob(token.split('.')[1]));
}

const user = parseJWT(token);

if (user.role !== "admin") {
  alert("Admin only");
  window.location.href = "index.html";
}

/* =====================
   LOAD STATS
===================== */

async function loadStats() {
  const res = await fetch(API + "/admin/stats/total-sales", {
    headers: { Authorization: "Bearer " + token }
  });

  const data = await res.json();

  document.getElementById("stats").innerHTML = `
    <p>Total Sales: $${data.totalSales}</p>
    <p>Orders Count: ${data.ordersCount}</p>
  `;
}

/* =====================
   LOAD ALL WATCHES
===================== */

async function loadWatches() {
  const res = await fetch(API + "/watches");
  const watches = await res.json();

  const container = document.getElementById("adminWatches");

  container.innerHTML = watches.map(w => `
    <div class="card">
      <img src="${w.imageUrl || 'https://via.placeholder.com/220'}">
      <h4>${w.model}</h4>
      <p>$${w.price}</p>
      <p>Stock: ${w.stock}</p>
      <button onclick="deleteWatch('${w._id}')">Delete</button>
    </div>
  `).join("");
}

/* =====================
   DELETE WATCH
===================== */

async function deleteWatch(id) {
  if (!confirm("Delete this watch?")) return;

  await fetch(API + "/watches/" + id, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token }
  });

  loadWatches();
}

loadStats();
loadWatches();
