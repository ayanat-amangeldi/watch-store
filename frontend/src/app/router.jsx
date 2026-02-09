import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetCode from "../pages/ResetCode";
import Watches from "../pages/Watches";
import WatchDetails from "../pages/WatchDetails";

import Cart from "../pages/Cart";
import Favorites from "../pages/Favorites";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import Profile from "../pages/Profile";
import Sell from "../pages/Sell";
import Support from "../pages/Support";

import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRouter() {
  return (
    <Routes>
      {/* 🟢 PUBLIC (GUEST) */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-code" element={<ResetCode />} />

      <Route path="/watches" element={<Watches />} />
      <Route path="/watches/:id" element={<WatchDetails />} />

      {/* 🔐 PROTECTED (AUTH REQUIRED) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/support" element={<Support />} />
      </Route>
    </Routes>
  );
}
