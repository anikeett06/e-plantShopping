
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/CartSlice";

const plantCategories = [
  {
    name: "Air Purifying Plants",
    plants: [
      { id: 1, name: "Snake Plant", price: 299, image: "photo-1501004318641-b39e6451bec6", description: "A hardy plant with upright leaves." },
      { id: 2, name: "Peace Lily", price: 349, image: "photo-1497250681960-ef046c08a56e", description: "Elegant foliage and beautiful white flowers." },
      { id: 3, name: "Spider Plant", price: 249, image: "photo-1459411552884-841db9b3cc2a", description: "A favorite with arching striped leaves." },
      { id: 4, name: "Areca Palm", price: 599, image: "photo-1485955900006-10f4d324d411", description: "A tropical palm for a lush indoor look." },
      { id: 5, name: "Boston Fern", price: 399, image: "photo-1509423350716-97f9360b4e09", description: "Feathery green foliage for bright spaces." },
      { id: 6, name: "Rubber Plant", price: 499, image: "photo-1501004318641-b39e6451bec6", description: "Glossy broad leaves make a bold statement." },
    ],
  },
  {
    name: "Low Maintenance Plants",
    plants: [
      { id: 7, name: "ZZ Plant", price: 399, image: "photo-1501004318641-b39e6451bec6", description: "A resilient plant that tolerates occasional missed watering." },
      { id: 8, name: "Aloe Vera", price: 199, image: "photo-1509423350716-97f9360b4e09", description: "A succulent with fleshy, sculptural leaves." },
      { id: 9, name: "Jade Plant", price: 249, image: "photo-1485955900006-10f4d324d411", description: "A compact succulent with rounded leaves." },
      { id: 10, name: "Pothos", price: 229, image: "photo-1497250681960-ef046c08a56e", description: "A trailing plant for shelves and hanging pots." },
      { id: 11, name: "Cast Iron Plant", price: 449, image: "photo-1459411552884-841db9b3cc2a", description: "A dependable foliage plant for indoor spaces." },
      { id: 12, name: "Lucky Bamboo", price: 179, image: "photo-1483794344563-d27a8d18014e", description: "Decorative stems for desks and tabletops." },
    ],
  },
  {
    name: "Decorative Plants",
    plants: [
      { id: 13, name: "Monstera", price: 699, image: "photo-1497250681960-ef046c08a56e", description: "A statement plant with distinctive split leaves." },
      { id: 14, name: "Calathea", price: 549, image: "photo-1501004318641-b39e6451bec6", description: "Patterned foliage adds character to a room." },
      { id: 15, name: "Anthurium", price: 499, image: "photo-1459411552884-841db9b3cc2a", description: "Glossy leaves and colorful tropical blooms." },
      { id: 16, name: "Bird of Paradise", price: 899, image: "photo-1485955900006-10f4d324d411", description: "Large tropical leaves create a dramatic display." },
      { id: 17, name: "Philodendron", price: 379, image: "photo-1509423350716-97f9360b4e09", description: "Attractive foliage for a cozy corner." },
      { id: 18, name: "Chinese Money Plant", price: 329, image: "photo-1483794344563-d27a8d18014e", description: "Rounded leaves give this plant a unique appearance." },
    ],
  },
];

function getImageUrl(imageId) {
  return `https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=700&q=80`;
}

export function Navbar({
  cartCount = 0,
  onHome = () => {},
  onPlants = () => {},
  onCart = () => {},
}) {
  return (
    <nav className="navbar">
      <div className="brand" onClick={onHome}>
        🌿 Paradise Nursery
      </div>

      <div className="nav-links">
        <button onClick={onHome}>Home</button>
        <button onClick={onPlants}>Plants</button>
        <button className="cart-link" onClick={onCart}>
          🛒 Cart ({cartCount})
        </button>
      </div>
    </nav>
  );
}

export default function ProductList() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const [addedToCart, setAddedToCart] = useState({});

  useEffect(() => {
    const added = {};
    cart.forEach((item) => {
      added[item.name] = true;
    });
    setAddedToCart(added);
  }, [cart]);

  const handleAddToCart = (plant) => {
    if (addedToCart[plant.name]) return;

    dispatch(addItem(plant));

    setAddedToCart((previous) => ({
      ...previous,
      [plant.name]: true,
    }));
  };

  return (
    <main className="catalog">
      <h1 className="page-heading">Our Houseplant Collection</h1>
      <p className="page-intro">
        Explore beautiful plants for every home, lifestyle, and space.
      </p>

      {plantCategories.map((category) => (
        <section className="category-section" key={category.name}>
          <h2 className="category-title">{category.name}</h2>

          <div className="product-list">
            {category.plants.map((plant) => (
              <article className="plant-card" key={plant.id}>
                <img
                  className="plant-image"
                  src={getImageUrl(plant.image)}
                  alt={plant.name}
                  loading="lazy"
                />

                <div className="plant-info">
                  <h3>{plant.name}</h3>
                  <p>{plant.description}</p>
                  <div className="price">
                    ₹{plant.price.toFixed(2)}
                  </div>

                  <button
                    className="add-btn"
                    disabled={Boolean(addedToCart[plant.name])}
                    onClick={() => handleAddToCart(plant)}
                  >
                    {addedToCart[plant.name]
                      ? "Added to Cart ✓"
                      : "Add to Cart"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
