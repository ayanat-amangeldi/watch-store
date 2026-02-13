import { apiRequest } from "./api.js";

const userEl = document.getElementById("user");
const logoutBtn = document.getElementById("logout");

async function loadProfile() {
  const user = await apiRequest("/auth/me");
  userEl.textContent = JSON.stringify(user, null, 2);
}

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "./login.html";
});

loadProfile();
