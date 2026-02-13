const API = "http://localhost:3000/api/v1";

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const errorEl = document.getElementById("error");

/* LOGIN */
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
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
        errorEl.textContent = data.message || "Login failed";
        return;
      }

      localStorage.setItem("token", data.token);

      
      window.location.href = "index.html";

    } catch (err) {
      errorEl.textContent = "Network error";
    }
  });
}


/* REGISTER */
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        errorEl.textContent = data.message || "Registration failed";
        return;
      }

      
      localStorage.setItem("token", data.token);

      window.location.href = "index.html";

    } catch (err) {
      errorEl.textContent = "Network error";
    }
  });
}
