import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getWatches } from "../services/watches";

export default function Watches() {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [brandId, setBrandId] = useState("");

  const navigate = useNavigate();
  const isAuth = !!localStorage.getItem("token");

  useEffect(() => {
    loadWatches();
  }, []);

  async function loadWatches() {
    try {
      const query = buildQuery();
      const data = await getWatches(query);
      setWatches(data);
    } catch (err) {
      alert("Failed to load watches");
    } finally {
      setLoading(false);
    }
  }

  function buildQuery() {
    const params = new URLSearchParams();
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (brandId) params.append("brandId", brandId);
    return `?${params.toString()}`;
  }

  function handleFilter() {
    setLoading(true);
    loadWatches();
  }

  if (loading) {
    return <div style={{ padding: 40 }}>Loading...</div>;
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Watches</h1>

      {/* FILTERS */}
      <div style={{ display: "flex", gap: 16, marginBottom: 32 }}>
        <input
          placeholder="Min price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <input
          placeholder="Brand ID"
          value={brandId}
          onChange={(e) => setBrandId(e.target.value)}
        />

        <button onClick={handleFilter}>Apply</button>
      </div>

      {/* GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
        {watches.map((w) => (
          <div key={w._id} className="watch-card">
            <h3>{w.model}</h3>
            <p>${w.price}</p>

            <Link to={`/watches/${w._id}`}>View details</Link>

            <button
              onClick={() =>
                isAuth ? navigate(`/watches/${w._id}`) : navigate("/register")
              }
            >
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
