import { useState } from "react";
import { login } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const res = await login(email, password);
      localStorage.setItem("token", res.token);

      if (res.mustChangePassword) {
        navigate("/reset-code");
      } else {
        navigate("/watches");
      }
    } catch (err) {
      alert(err.message || "Login failed");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>

        <label>Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <div className="auth-options">
          <Link to="/forgot-password">Forgot password?</Link>
        </div>

        <button className="primary-btn" onClick={handleLogin}>
          Login
        </button>

        <div className="auth-footer">
          No account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}
