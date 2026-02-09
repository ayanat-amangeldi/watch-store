import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        
        {/* LEFT */}
        <div className="logo">
          <Link to="/">WATCHSTORE</Link>
        </div>

        {/* CENTER */}
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/watches">Watches</Link>
          <Link to="/sell">Sell</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/support">Support</Link>
        </nav>

        {/* RIGHT */}
        <div className="auth-links">
          <Link to="/login">Login</Link>
          <Link to="/register" className="register-btn">Register</Link>
        </div>

      </div>
    </header>
  );
}
