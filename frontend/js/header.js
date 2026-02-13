(function () {
  const authSection = document.getElementById("authSection");
  const token = localStorage.getItem("token");

  if (!authSection) return;

  // НЕ АВТОРИЗОВАН
  if (!token) {
    authSection.innerHTML = `
      <a href="login.html">Login</a>
      <a href="register.html">Register</a>
    `;
    return;
  }

  // АВТОРИЗОВАН
  let user = null;

  try {
    user = JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    localStorage.removeItem("token");
    window.location.reload();
    return;
  }

  authSection.innerHTML = `
    <div class="profile-dropdown">
      ${user.email} ▼
      <div class="dropdown-menu" id="dropdownMenu">
        <a href="profile.html">Profile</a>
        <a href="orders.html">My Orders</a>
        <a href="sell.html">My Listings</a>
        ${user.role === "admin" ? '<a href="admin.html">Admin Panel</a>' : ''}
        <a id="logoutBtn">Logout</a>
      </div>
    </div>
  `;

  const dropdown = document.querySelector(".profile-dropdown");
  const menu = document.getElementById("dropdownMenu");

  dropdown.addEventListener("click", () => {
    menu.style.display =
      menu.style.display === "block" ? "none" : "block";
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "index.html";
  });
})();
