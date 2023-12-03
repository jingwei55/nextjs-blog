// // components/Cart.js

import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Cart.module.css";

const Cart = () => {
  const { isLoggedIn, role, userID } = useAuth();
  console.log("UserID Cart: ", userID);
  const [cart, setCart] = useState({
    items: [],
    totalItems: 0,
    totalCost: 0,
  });

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(`/api/cart?memberID=${userID}`);
        const cartData = response.data;
        const { rows } = cartData;

        setCart({
          items: cartData.rows,
          totalItems: cartData.totalItems,
          totalCost: cartData.totalCost,
        });

        console.log("Data: ", cartData);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, [userID]);

  // const handleRemoveItem = async (itemID) => {
  //   try {
  //     await axios.delete(`/api/cart?itemID=${itemID}`);
  //     const response = await axios.get(`/api/cart?memberID=${memberID}`);
  //     setCart(response.data);
  //   } catch (error) {
  //     console.error("Error removing item from cart:", error);
  //   }
  // };

  // const handlePurchase = async () => {
  //   // Add logic for completing the purchase, e.g., calling a payment API
  //   console.log("Purchase logic goes here");
  // };

  return (
    <div className={styles.cartContainer}>
      <h2>Your Shopping Cart</h2>
      {cart.totalItems > 0 ? (
        <>
          <ul className={styles.cartList}>
            {cart.items.map((cartItem) => (
              <li className={styles.cartItem} key={cartItem.itemID}>
                <span className={styles.itemName}>{cartItem.name}</span>
                <span className={styles.itemQuantity}>
                  Quantity: {cartItem.item_quantity}
                </span>
                <span className={styles.itemPrice}>
                  Price: ${parseFloat(cartItem.price).toFixed(2)}
                </span>
                <button onClick={() => handleRemoveItem(cartItem.itemID)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.totalContainer}>
            <span className={styles.totalText}>Total Cost: </span>
            <span className={styles.totalAmount}>
              ${parseFloat(cart.totalCost).toFixed(2)}
            </span>
          </div>
          <div>
            <span className={styles.totalText}>
              Total Items: {cart.totalItems}
            </span>
          </div>
          {/* <button onClick={handlePurchase}>Purchase</button> */}
        </>
      ) : (
        <p>Shopping Cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
