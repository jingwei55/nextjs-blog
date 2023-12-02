// components/Shop.js
import React, { useState, useEffect } from "react";
import styles from "../styles/Shop.module.css";
import { useAuth } from "../context/AuthContext"; // Import the AuthContext

const Shop = () => {
  const { isLoggedIn, role } = useAuth(); // Access the isLoggedIn state from AuthContext
  const [itemsData, setItemsData] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const response = await fetch("/api/shop");
        const data = await response.json();
        setItemsData(data);
      } catch (error) {
        console.error("Error fetching shop data:", error);
      }
    };

    fetchShopData();
  }, []);

  const handleQuantityChange = (itemId, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: newQuantity,
    }));
  };

  const handleAddToCart = (itemId) => {
    console.log(
      `Item ${itemId} added to cart with quantity: ${quantities[itemId] || 0}`
    );
  };

  const groupedItems = itemsData.reduce((acc, item) => {
    if (!acc[item.item_type]) {
      acc[item.item_type] = [];
    }
    acc[item.item_type].push(item);
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
                  <p className={styles.itemPrice}>
                    Price: ${Number(item.price).toFixed(2)} Quantity:{" "}
                    {item.quantity}
                  </p>
                  <p>Shelter Name: {item.shelter_name}</p>
                  <p>Shelter Location: {item.shelter_location}</p>
                </div>
                {isLoggedIn && role === "member" && (
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
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Shop;
