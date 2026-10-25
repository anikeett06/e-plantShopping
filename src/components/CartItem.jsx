
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  updateQuantity,
} from "../redux/CartSlice";

export default function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const getImageUrl = (image) =>
    `https://images.unsplash.com/${image}?auto=format&fit=crop&w=400&q=80`;

  const handleCheckout = () => {
    window.alert("Thank you for shopping with Paradise Nursery! Checkout is Coming Soon.");
  };

  if (items.length === 0) {
    return (
      <main className="cart-page">
        <div className="empty-cart">
          <h1 className="page-heading">Your Shopping Cart</h1>
          <p>Your cart is looking a little empty. Let's add some greenery!</p>
          <button
            className="primary-btn"
            onClick={onContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <h1 className="page-heading">Your Shopping Cart 🛒</h1>
      <p className="page-intro">
        You have {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart.
      </p>

      <div className="cart-layout">
        <section>
          {items.map((item) => (
            <article className="cart-row" key={item.id}>
              <img
                className="cart-image"
                src={getImageUrl(item.image)}
                alt={item.name}
              />

              <div className="cart-details">
                <h3>{item.name}</h3>
                <p>Unit price: ₹{item.price.toFixed(2)}</p>

                <div className="quantity-controls">
                  <button
                    aria-label={`Decrease ${item.name} quantity`}
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity - 1,
                        })
                      )
                    }
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    aria-label={`Increase ${item.name} quantity`}
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity + 1,
                        })
                      )
                    }
                  >
                    +
                  </button>
                </div>

                <p>
                  <strong>
                    Item total: ₹{(item.price * item.quantity).toFixed(2)}
                  </strong>
                </p>

                <button
                  className="remove-btn"
                  onClick={() => dispatch(removeItem(item.id))}
                >
                  🗑 Remove
                </button>
              </div>
            </article>
          ))}
        </section>

        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-line">
            <span>Total items</span>
            <strong>{totalItems}</strong>
          </div>

          <div className="summary-line total-line">
            <span>Total amount</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>

          <button
            className="primary-btn full-btn"
            onClick={handleCheckout}
          >
            Checkout
          </button>

          <button
            className="secondary-btn full-btn"
            onClick={onContinueShopping}
          >
            ← Continue Shopping
          </button>
        </aside>
      </div>
    </main>
  );
}
