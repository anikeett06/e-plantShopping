
import React, { useState } from "react";
import AboutUs from "./components/AboutUs";
import ProductList from "./components/ProductList";
import CartItem from "./components/CartItem";
import { useSelector } from "react-redux";

export default function App() {
  const [page, setPage] = useState("home");
  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const goHome = () => {
    setPage("home");
    window.scrollTo(0, 0);
  };

  const goPlants = () => {
    setPage("plants");
    window.scrollTo(0, 0);
  };

  const goCart = () => {
    setPage("cart");
    window.scrollTo(0, 0);
  };

  return (
    <>
      <nav className="navbar">
        <div className="brand" onClick={goHome}>
          🌿 Paradise Nursery
        </div>

        <div className="nav-links">
          <button onClick={goHome}>Home</button>
          <button onClick={goPlants}>Plants</button>
          <button className="cart-link" onClick={goCart}>
            🛒 Cart ({cartCount})
          </button>
        </div>
      </nav>

      {page === "home" && (
        <>
          <main className="landing">
            <div className="hero-content">
              <p className="eyebrow">GROW YOUR OWN PARADISE</p>
              <h1>Bring Nature Into Your Home</h1>
              <p>
                Discover beautiful houseplants that brighten your space,
                purify your air, and bring everyday moments to life.
                Your greener home starts here.
              </p>
              <button className="primary-btn" onClick={goPlants}>
                Get Started →
              </button>
            </div>
          </main>

          <AboutUs />

          <section className="about-section">
            <div className="about-content">
              <h2>Find Your Perfect Plant</h2>
              <p>
                Explore our collection of air-purifying, easy-care,
                and decorative houseplants.
              </p>
              <button className="primary-btn" onClick={goPlants}>
                Explore Plants
              </button>
            </div>
          </section>
        </>
      )}

      {page === "plants" && (
        <ProductList onNavigateToCart={goCart} />
      )}

      {page === "cart" && (
        <CartItem onContinueShopping={goPlants} />
      )}

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Paradise Nursery | Grow Green, Live Green 🌱</p>
      </footer>
    </>
  );
}
