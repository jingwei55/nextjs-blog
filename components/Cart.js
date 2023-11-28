// pages/cart.js
import { useState, useEffect } from "react";
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

  return (
    <div className={styles.cartContainer}>
      <h2>Your Shopping Cart</h2>
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
          </li>
        ))}
      </ul>
      <div className={styles.totalContainer}>
        <span className={styles.totalText}>Total Cost:</span>
        <span className={styles.totalAmount}>${cart.totalCost.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Cart;
