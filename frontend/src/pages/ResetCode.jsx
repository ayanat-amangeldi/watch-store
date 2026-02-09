import { useState } from "react";
import { changePassword } from "../services/auth";
import { useNavigate } from "react-router-dom";
import "./auth.css";

export default function ResetCode() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleChange() {
    try {
      await changePassword(password);
      alert("Password updated");
      navigate("/watches");
    } catch (err) {
      alert(err.message || "Error");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create new password</h2>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button className="primary-btn" onClick={handleChange}>
          Save password
        </button>
      </div>
    </div>
  );
}

