import React, { useState, useEffect } from "react";
import styles from "../styles/Shop.module.css";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Shop = () => {
  const { isLoggedIn, role, userID } = useAuth();
  const [itemsData, setItemsData] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const response = await fetch("/api/shop");
        const data = await response.json();
        setItemsData(data);
        console.log("Current userID: ", userID);
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

  const handleAddToCart = async (itemId, quantity) => {
    console.log("MemberID: ", isLoggedIn, role, userID);
    try {
      if (!userID) {
        setError("Please log in to add items to the cart.");
        return;
      }

      // Make a request to the API to add the item to the cart
      //cartID same as memberID
      await axios.post("/api/addToCart", {
        userID,
        itemId,
        quantity,
      });
      console.log(
        `Item ${itemId} added to cart with quantity: ${quantities[itemId] || 0}`
      );

      // Reset quantity for the specific item after adding to the cart
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemId]: 0,
      }));
    } catch (error) {
      console.error("Error adding item to cart:", error);
      setError("Error adding item to cart.");
    }
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
      {Object.keys(groupedItems).map((itemType) => (
        <div key={itemType} className={styles.productTypeContainer}>
          <h3>{itemType}</h3>
          <ul className={styles.petStoreItemList}>
            {groupedItems[itemType].map((item) => (
              <li key={item.ItemID} className={styles.petStoreItem}>
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
                      onClick={() => {
                        const currentQuantity = quantities[item.ItemID] || 0;
                        const newQuantity = Math.max(0, currentQuantity - 1);
                        handleQuantityChange(item.ItemID, newQuantity);
                      }}
                    >
                      -
                    </button>
                    <span className={styles.itemQuantity}>
                      {quantities[item.ItemID] || 0}
                    </span>
                    <button
                      onClick={() => {
                        const currentQuantity = quantities[item.ItemID] || 0;
                        const newQuantity = Math.min(
                          currentQuantity + 1,
                          item.quantity
                        );
                        handleQuantityChange(item.ItemID, newQuantity);
                      }}
                    >
                      +
                    </button>
                    <button
                      className={styles.addToCartButton}
                      onClick={() =>
                        handleAddToCart(
                          item.ItemID,
                          quantities[item.ItemID] || 0
                        )
                      }
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
