// pages/cart.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/Cart.module.css"; // Import the CSS module

const Cart = () => {
  const [cart, setCart] = useState({
    totalCost: 0,
    totalItems: 0,
    items: [],
  });

  useEffect(() => {
    // Fetch cart data from your API endpoint
    const fetchCartData = async () => {
      try {
        const response = await axios.get("/api/cart"); // Replace with your actual API endpoint
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, []);

  const handleRemoveItem = async (itemID) => {
    try {
      // Send a request to remove the item from the cart
      await axios.delete(`../api/cart/${itemID}`); // Replace with your actual API endpoint
      // Refresh the cart data after removal
      const response = await axios.get("../api/cart");
      setCart(response.data);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handlePurchase = async () => {
    if (cart.totalItems > 0) {
      try {
        // Simulate purchase logic (replace with actual purchase API call)
        alert("Items bought! Expect delivery to take 1 - 2 business days");
        // Clear the cart after successful purchase
        await axios.delete("../api/cart"); // Replace with your actual API endpoint for clearing the cart
        setCart({
          totalCost: 0,
          totalItems: 0,
          items: [],
        });
      } catch (error) {
        console.error("Error processing purchase:", error);
      }
    } else {
      alert("Shopping Cart is empty");
    }
  };

  return (
    <div className={styles.cartContainer}>
      <h2>Your Shopping Cart</h2>
      {cart.totalItems > 0 ? (
        <React.Fragment>
          <ul className={styles.cartList}>
            {cart.items.map((cartItem) => (
              <li key={cartItem.itemID} className={styles.cartItem}>
                <span className={styles.itemName}>{cartItem.item.name}</span>
                <span className={styles.itemQuantity}>
                  Quantity: {cartItem.quantity}
                </span>
                <span className={styles.itemPrice}>
                  Price: ${cartItem.item.price.toFixed(2)}
                </span>
                <button onClick={() => handleRemoveItem(cartItem.itemID)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.totalContainer}>
            <span className={styles.totalText}>Total Cost:</span>
            <span className={styles.totalAmount}>
              ${cart.totalCost.toFixed(2)}
            </span>
          </div>
          <button className={styles.purchaseButton} onClick={handlePurchase}>
            Purchase
          </button>
        </React.Fragment>
      ) : (
        <div className={styles.emptyCartContainer}>
          <p className={styles.emptyCartMessage}>Shopping Cart is empty</p>
          <img
            className={styles.emptyCartImage}
            src="/path/to/shopping-cart-image.png"
            alt="Empty Shopping Cart"
          />
        </div>
      )}
    </div>
  );
};

export default Cart;
