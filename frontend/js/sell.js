const API = "http://localhost:3000/api/v1";
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "./login.html";
}

/* =========================
   LOAD BRANDS
========================= */

async function loadBrands() {
  try {
    const res = await fetch(API + "/brands");
    const brands = await res.json();

    const select = document.getElementById("brand");
    select.innerHTML = `<option value="">Select Brand</option>`;

    brands.forEach(b => {
      select.innerHTML += `
        <option value="${b._id}">
          ${b.name}
        </option>
      `;
    });

  } catch (err) {
    document.getElementById("message").textContent =
      "Failed to load brands";
  }
}

/* =========================
   SUBMIT FORM
========================= */

document
  .getElementById("sellForm")
  .addEventListener("submit", async (e) => {

    e.preventDefault();

    const message = document.getElementById("message");

    const data = {
      brandId: document.getElementById("brand").value,
      model: document.getElementById("model").value,
      price: Number(document.getElementById("price").value),
      stock: Number(document.getElementById("stock").value),
      imageUrl: document.getElementById("imageUrl").value,
      specs: {
        caseMaterial: document.getElementById("caseMaterial").value,
        movement: document.getElementById("movement").value,
        waterResistance: document.getElementById("waterResistance").value
      }
    };

    try {
      const res = await fetch(API + "/watches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      message.style.color = "green";
      message.textContent = "Watch published successfully ✔";

      e.target.reset();

    } catch (err) {
      message.style.color = "red";
      message.textContent = err.message;
    }
  });

loadBrands();
