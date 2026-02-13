import { apiRequest } from "./api.js";

const form = document.getElementById("registerForm");
const errorEl = document.getElementById("error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });

    alert("Registration successful. Please login.");
    window.location.href = "./login.html";
  } catch (err) {
    errorEl.textContent = err.message;
  }
});
