
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  updateQuantity,
} from "../redux/CartSlice";

export default function CartItem({ onContinueShopping = () => {} }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const getImageUrl = (image) =>
    `https://images.unsplash.com/${image}?auto=format&fit=crop&w=400&q=80`;

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity <= 1) {
      dispatch(removeItem(item.name));
    } else {
      dispatch(
        updateQuantity({
          id: item.id,
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    }
  };

  const handleDelete = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    window.alert("Checkout Coming Soon! Thank you for shopping with Paradise Nursery.");
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
    window.scrollTo(0, 0);
  };

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <div className="empty-cart">
          <h1 className="page-heading">Your Shopping Cart</h1>
          <p>Your cart is empty. Let's find a plant for your home!</p>
          <button
            className="get-started-button"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <h1 className="page-heading">Shopping Cart</h1>
      <p className="page-intro">
        You have {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart.
      </p>

      <div className="cart-layout">
        <section className="cart-container">
          {cart.map((item) => (
            <article className="cart-row" key={item.id}>
              <img
                className="cart-image"
                src={getImageUrl(item.image)}
                alt={item.name}
              />

              <div className="cart-details">
                <h3>{item.name}</h3>

                <p>
                  Unit Price: ₹{item.price.toFixed(2)}
                </p>

                <div className="quantity-controls">
                  <button
                    aria-label={`Decrease ${item.name} quantity`}
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    aria-label={`Increase ${item.name} quantity`}
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>

                <p>
                  <strong>
                    Item Total: ₹
                    {(item.price * item.quantity).toFixed(2)}
                  </strong>
                </p>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() => handleDelete(item)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </section>

        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-line">
            <span>Total Items</span>
            <strong>{totalItems}</strong>
          </div>

          <div className="summary-line total-line">
            <span>Total Amount</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>

          <button
            type="button"
            className="primary-btn full-btn"
            onClick={handleCheckout}
          >
            Checkout
          </button>

          <button
            type="button"
            className="secondary-btn full-btn get-started-button"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
        </aside>
      </div>
    </main>
  );
}
