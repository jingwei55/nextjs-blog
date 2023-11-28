// components/Shop.js
import React, { useState } from "react";
import styles from "../styles/Shop.module.css"; // Import the CSS module

const Shop = () => {
  // Hardcoded pet store items
  const petStoreItems = [
    { id: 1, name: "Pet Food", price: 15.99, product_type: "Food" },
    { id: 2, name: "Pet Toys", price: 9.99, product_type: "Toy" },
    { id: 3, name: "Pet Bed", price: 25.99, product_type: "Bed" },
    // Add more items as needed
  ];

  // State to manage quantities for each item
  const [quantities, setQuantities] = useState({});

  // Function to handle quantity change
  const handleQuantityChange = (itemId, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: newQuantity,
    }));
  };

  // Function to handle "Add to Cart" button click
  const handleAddToCart = (itemId) => {
    // You can implement logic to add a specific item to the cart here
    console.log(
      `Item ${itemId} added to cart with quantity: ${quantities[itemId] || 0}`
    );
  };

  // Group items by product type
  const groupedItems = petStoreItems.reduce((acc, item) => {
    if (!acc[item.product_type]) {
      acc[item.product_type] = [];
    }
    acc[item.product_type].push(item);
    return acc;
  }, {});

  return (
    <div className={styles.shopContainer}>
      <h2>Pet Store</h2>
      {Object.keys(groupedItems).map((productType) => (
        <div key={productType} className={styles.productTypeContainer}>
          <h3>{productType}</h3>
          <ul className={styles.petStoreItemList}>
            {groupedItems[productType].map((item) => (
              <li key={item.id} className={styles.petStoreItem}>
                <div>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemPrice}>
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                <div className={styles.quantityContainer}>
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.id,
                        Math.max(0, (quantities[item.id] || 0) - 1)
                      )
                    }
                  >
                    -
                  </button>
                  <span className={styles.itemQuantity}>
                    {quantities[item.id] || 0}
                  </span>
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.id,
                        (quantities[item.id] || 0) + 1
                      )
                    }
                  >
                    +
                  </button>
                  <button
                    className={styles.addToCartButton}
                    onClick={() => handleAddToCart(item.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Shop;
