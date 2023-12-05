// // components/Cart.js

import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Cart.module.css";

const Cart = () => {
  const { isLoggedIn, role, userID } = useAuth();
  const [removeQuantity, setRemoveQuantity] = useState(1);
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

        setCart({
          items: cartData.rows,
          totalItems: cartData.totalItems,
          totalCost: cartData.totalCost,
        });
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, [userID]);

  // console.log("Cart Data: ", cart);

  const handleRemoveItem = async (itemID) => {
    console.log("Data sent to api: ", userID, itemID, removeQuantity);
    try {
      // Make a request to the API to remove items from the cart
      await axios.post("/api/removeFromCart", {
        userID,
        itemID,
        quantity: removeQuantity,
      });

      const response = await axios.get(`/api/cart?memberID=${userID}`);
      const cartData = response.data;

      // Update local state to reflect the changes in the cart
      setCart({
        items: cartData.rows,
        totalItems: cartData.totalItems,
        totalCost: cartData.totalCost,
      });
      window.alert(
        `Successfully removed ${removeQuantity} item(s) from the cart! Revisit page to see changes`
      );
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handlePurchase = async () => {
    try {
      await axios.post(`/api/purchase?userID=${userID}`); // Make a request to your server to handle the purchase logic

      // Update local state to reflect the cleared cart
      setCart((prevCart) => ({
        ...prevCart,
        items: [], // Clear the items array
        totalItems: 0,
        totalCost: 0,
      }));

      // Display an alert indicating successful purchase
      window.alert("Purchase successful! Your cart has been cleared.");
    } catch (error) {
      console.error("Error making a purchase:", error);
    }
  };

  return (
    <div className={styles.cartContainer}>
      <h2>Your Shopping Cart</h2>
      {cart.totalItems > 0 ? (
        <>
          <ul className={styles.cartList}>
            {cart.items.map((cartItem) => (
              <li className={styles.cartItem} key={cartItem.ItemID}>
                <span className={styles.itemName}>{cartItem.name}</span>
                <p>Shelter Name: {cartItem.shelter_name}</p>
                <p>Shelter Location: {cartItem.shelter_location}</p>
                <span className={styles.itemQuantity}>
                  Quantity: {cartItem.item_quantity}
                </span>
                <span className={styles.itemPrice}>
                  Price: ${parseFloat(cartItem.price).toFixed(2)}
                </span>
                <select
                  value={removeQuantity}
                  onChange={(e) => setRemoveQuantity(Number(e.target.value))}
                >
                  {/* You can generate options based on available quantity */}
                  {Array.from(
                    { length: cartItem.item_quantity + 1 },
                    (_, index) => (
                      <option key={index} value={index}>
                        {index}
                      </option>
                    )
                  )}
                </select>
                <button onClick={() => handleRemoveItem(cartItem.ItemID)}>
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
          <button onClick={handlePurchase}>Purchase</button>
        </>
      ) : (
        <p>Shopping Cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
