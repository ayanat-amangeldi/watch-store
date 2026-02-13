const API = "http://localhost:3000/api/v1";

const form = document.getElementById("loginForm");
const errorEl = document.getElementById("error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    localStorage.setItem("token", data.token);

    if (data.mustChangePassword) {
      window.location.href = "reset-password.html";
      return;
    }

    window.location.href = "index.html"; // 🔥 ВАЖНО
  } catch (err) {
    errorEl.textContent = err.message;
  }
});
