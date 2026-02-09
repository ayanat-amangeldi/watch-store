import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./WatchDetails.css";

import { getWatchById } from "../services/watches";
import { addToCart } from "../services/cart";
import { addToFavorites } from "../services/favorites";

export default function WatchDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [watch, setWatch] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuth = !!localStorage.getItem("token");

  useEffect(() => {
    getWatchById(id)
      .then(setWatch)
      .catch(() => setWatch(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div style={{ padding: 40 }}>Loading...</div>;
  }

  if (!watch) {
    return <div style={{ padding: 40 }}>Watch not found</div>;
  }

  const handleAddToCart = async () => {
    if (!isAuth) {
      navigate("/register");
      return;
    }

    await addToCart(watch._id);
    navigate("/cart");
  };

  const handleAddToFavorites = async () => {
    if (!isAuth) {
      navigate("/register");
      return;
    }

    await addToFavorites(watch._id);
  };

  return (
    <div className="details-page">
      <div className="details-top">
        <img
          src={watch.image || "/placeholder-watch.png"}
          alt={watch.model}
          className="watch-image"
        />

        <div className="details-info">
          <h1>{watch.model}</h1>
          <h2>${watch.price}</h2>

          <button className="primary-btn" onClick={handleAddToCart}>
            Add to cart
          </button>

          <button className="secondary-btn" onClick={handleAddToFavorites}>
            Add to favorites
          </button>
        </div>
      </div>

      <section className="details-section">
        <h3>Description</h3>
        <p>{watch.description || "No description provided."}</p>
      </section>

      <section className="details-section">
        <h3>Specifications</h3>

        <div className="specs-grid">
          <div className="spec-row">
            <span>Brand</span>
            <strong>{watch.brandName || "—"}</strong>
          </div>

          <div className="spec-row">
            <span>Movement</span>
            <strong>{watch.specs?.movement || "—"}</strong>
          </div>

          <div className="spec-row">
            <span>Case material</span>
            <strong>{watch.specs?.caseMaterial || "—"}</strong>
          </div>

          <div className="spec-row">
            <span>Water resistance</span>
            <strong>{watch.specs?.waterResistance || "—"}</strong>
          </div>
        </div>
      </section>
    </div>
  );
}
