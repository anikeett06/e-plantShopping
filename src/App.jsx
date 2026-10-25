
import React, { useState } from "react";
import { useSelector } from "react-redux";
import AboutUs from "./components/AboutUs";
import ProductList, { Navbar } from "./components/ProductList";
import CartItem from "./components/CartItem";

export default function App() {
  const [page, setPage] = useState("home");

  const cart = useSelector((state) => state.cart.items);

  const cartCount = cart.reduce(
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
      <Navbar
        cartCount={cartCount}
        onHome={goHome}
        onPlants={goPlants}
        onCart={goCart}
      />

      {page === "home" && (
        <>
          <main className="background-image">
            <div className="hero-content">
              <p className="eyebrow">GROW YOUR OWN PARADISE</p>
              <h1>Welcome to Paradise Nursery</h1>
              <p>
                Discover beautiful houseplants that brighten your home,
                bring nature closer, and help you create a greener space.
              </p>
              <button
                className="get-started-button"
                onClick={goPlants}
              >
                Get Started
              </button>
            </div>
          </main>

          <AboutUs />

          <section className="about-section">
            <div className="about-content">
              <h2>Find Your Perfect Plant</h2>
              <p>
                Explore our collection of air-purifying, low-maintenance,
                and decorative houseplants.
              </p>
              <button className="primary-btn" onClick={goPlants}>
                Explore Plants
              </button>
            </div>
          </section>
        </>
      )}

      {page === "plants" && <ProductList />}

      {page === "cart" && (
        <CartItem onContinueShopping={goPlants} />
      )}

      <footer className="site-footer">
        <p>
          © {new Date().getFullYear()} Paradise Nursery | Grow Green, Live Green
        </p>
      </footer>
    </>
  );
}
