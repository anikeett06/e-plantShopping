

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/CartSlice";

const plantCategories = [
  {
    name: "Air Purifying Plants",
    plants: [
      {
        id: 1,
        name: "Snake Plant",
        price: 299,
        image: "photo-1501004318641-b39e6451bec6",
        description: "A hardy plant known for its upright leaves and easy care.",
      },
      {
        id: 2,
        name: "Peace Lily",
        price: 349,
        image: "photo-1497250681960-ef046c08a56e",
        description: "Elegant green foliage with beautiful white flowers.",
      },
      {
        id: 3,
        name: "Spider Plant",
        price: 249,
        image: "photo-1459411552884-841db9b3cc2a",
        description: "A fast-growing favorite with arching striped leaves.",
      },
      {
        id: 4,
        name: "Areca Palm",
        price: 599,
        image: "photo-1485955900006-10f4d324d411",
        description: "A tropical palm that adds a lush look to your room.",
      },
      {
        id: 5,
        name: "Boston Fern",
        price: 399,
        image: "photo-1509423350716-97f9360b4e09",
        description: "A leafy fern that looks lovely in bright indirect light.",
      },
      {
        id: 6,
        name: "Rubber Plant",
        price: 499,
        image: "photo-1509423350716-97f9360b4e09",
        description: "Glossy, broad leaves make this plant a bold focal point.",
      },
    ],
  },
  {
    name: "Low Maintenance Plants",
    plants: [
      {
        id: 7,
        name: "ZZ Plant",
        price: 399,
        image: "photo-1501004318641-b39e6451bec6",
        description: "A resilient plant that tolerates occasional missed watering.",
      },
      {
        id: 8,
        name: "Aloe Vera",
        price: 199,
        image: "photo-1509423350716-97f9360b4e09",
        description: "A succulent with fleshy leaves and a sculptural shape.",
      },
      {
        id: 9,
        name: "Jade Plant",
        price: 249,
        image: "photo-1485955900006-10f4d324d411",
        description: "A compact succulent with thick, rounded green leaves.",
      },
      {
        id: 10,
        name: "Pothos",
        price: 229,
        image: "photo-1497250681960-ef046c08a56e",
        description: "A trailing plant that looks beautiful on shelves.",
      },
      {
        id: 11,
        name: "Cast Iron Plant",
        price: 449,
        image: "photo-1459411552884-841db9b3cc2a",
        description: "A dependable foliage plant that tolerates low light.",
      },
      {
        id: 12,
        name: "Lucky Bamboo",
        price: 179,
        image: "photo-1483794344563-d27a8d18014e",
        description: "Decorative green stems that suit desks and tabletops.",
      },
    ],
  },
  {
    name: "Decorative Plants",
    plants: [
      {
        id: 13,
        name: "Monstera",
        price: 699,
        image: "photo-1497250681960-ef046c08a56e",
        description: "A statement plant with distinctive split leaves.",
      },
      {
        id: 14,
        name: "Calathea",
        price: 549,
        image: "photo-1501004318641-b39e6451bec6",
        description: "Decorative patterned foliage adds character to interiors.",
      },
      {
        id: 15,
        name: "Anthurium",
        price: 499,
        image: "photo-1459411552884-841db9b3cc2a",
        description: "A tropical favorite known for its glossy leaves and colorful blooms.",
      },
      {
        id: 16,
        name: "Bird of Paradise",
        price: 899,
        image: "photo-1485955900006-10f4d324d411",
        description: "Large tropical leaves create a dramatic indoor display.",
      },
      {
        id: 17,
        name: "Philodendron",
        price: 379,
        image: "photo-1509423350716-97f9360b4e09",
        description: "Attractive foliage that works well in a cozy corner.",
      },
      {
        id: 18,
        name: "Chinese Money Plant",
        price: 329,
        image: "photo-1483794344563-d27a8d18014e",
        description: "Rounded leaves give this compact plant a unique appearance.",
      },
    ],
  },
];

function getPlantImage(imageId) {
  return `https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=700&q=80`;
}

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <main className="catalog">
      <h1 className="page-heading">Discover Your Green Paradise</h1>
      <p className="page-intro">
        Find the perfect plants to bring your home to life.
        Choose your favorites from our collection.
      </p>

      {plantCategories.map((category) => (
        <section className="category-section" key={category.name}>
          <h2 className="category-title">{category.name}</h2>

          <div className="plant-grid">
            {category.plants.map((plant) => {
              const isAdded = cartItems.some(
                (item) => item.id === plant.id
              );

              return (
                <article className="plant-card" key={plant.id}>
                  <img
                    className="plant-image"
                    src={getPlantImage(plant.image)}
                    alt={plant.name}
                    loading="lazy"
                  />

                  <div className="plant-info">
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <div className="price">₹{plant.price.toFixed(2)}</div>

                    <button
                      className="add-btn"
                      disabled={isAdded}
                      onClick={() => dispatch(addItem(plant))}
                    >
                      {isAdded ? "Added to Cart ✓" : "Add to Cart"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}
