import { Link } from "react-router-dom";
import "./Home.css";

const popularWatches = [
  {
    id: 1,
    brand: "Rolex",
    model: "Datejust",
    image:
      "https://www.mercury.ru/upload/photo/%D0%90%D0%A0%D0%A20124072/5637313358.jpg",
  },
  {
    id: 2,
    brand: "Rolex",
    model: "Submariner",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRzgPYPxPt63dvEriWvdAD89jUHexMIcYMTg&s",
  },
  {
    id: 3,
    brand: "Rolex",
    model: "Daytona",
    image:
      "https://316.watch/upload/medialibrary/fc1/fc16c478a8bb53165a23d79b3bc21a25.jpg",
  },
  {
    id: 4,
    brand: "Omega",
    model: "Speedmaster",
    image:
      "https://golden-time.ru/upload/iblock/54a/1qrsce5zt9988ezrihurr8ts3gsssi13.jpg",
  },
];

export default function Home() {
  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay" />

        <div className="hero-content">
          <span className="hero-subtitle">PRESENTING</span>
          <h1>TIME IS OUR THING</h1>

          <Link to="/watches" className="hero-btn">
            Browse watches
          </Link>
        </div>
      </section>

      {/* POPULAR */}
      <section className="popular">
        <h2>Our most popular models</h2>

        <div className="watch-grid">
          {popularWatches.map((watch) => (
            <Link
              key={watch.id}
              to={`/watches/${watch.id}`}
              className="watch-card"
            >
              <img src={watch.image} alt={watch.model} />
              <span className="brand">{watch.brand}</span>
              <h3>{watch.model}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

