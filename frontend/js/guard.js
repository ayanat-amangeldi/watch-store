// js/guard.js

const token = localStorage.getItem("token");

if (!token) {
  // пользователь не авторизован
  window.location.href = "./login.html";
}
