import { useState } from "react";
import { forgotPassword } from "../services/auth";
import { Link } from "react-router-dom";
import "./auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  async function handleSend() {
    try {
      await forgotPassword(email);
      alert("Temporary password sent");
    } catch (err) {
      alert(err.message || "Error");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Reset password</h2>

        <label>Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} />

        <button className="primary-btn" onClick={handleSend}>
          Send temporary password
        </button>

        <div className="auth-footer">
          <Link to="/login">Back to login</Link>
        </div>
      </div>
    </div>
  );
}

