// // components/Cart.js
// import { useState, useEffect } from "react";
// import axios from "axios";

// const Cart = ({ memberID }) => {
//   const [cart, setCart] = useState({
//     totalCost: 0,
//     totalItems: 0,
//     items: [],
//   });

//   useEffect(() => {
//     const fetchCartData = async () => {
//       try {
//         const response = await axios.get(`/api/cart?memberID=${memberID}`);
//         setCart(response.data);
//       } catch (error) {
//         console.error("Error fetching cart data:", error);
//       }
//     };

//     fetchCartData();
//   }, [memberID]);

//   const handleRemoveItem = async (itemID) => {
//     try {
//       await axios.delete(`/api/cart?itemID=${itemID}`);
//       const response = await axios.get(`/api/cart?memberID=${memberID}`);
//       setCart(response.data);
//     } catch (error) {
//       console.error("Error removing item from cart:", error);
//     }
//   };

//   const handlePurchase = async () => {
//     // Add logic for completing the purchase, e.g., calling a payment API
//     console.log("Purchase logic goes here");
//   };

//   return (
//     <div>
//       <h2>Your Shopping Cart</h2>
//       {cart.totalItems > 0 ? (
//         <>
//           <ul>
//             {cart.items.map((cartItem) => (
//               <li key={cartItem.itemID}>
//                 <span>{cartItem.item.name}</span>
//                 <span>Quantity: {cartItem.quantity}</span>
//                 <span>Price: ${cartItem.item.price.toFixed(2)}</span>
//                 <button onClick={() => handleRemoveItem(cartItem.itemID)}>
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>
//           <div>
//             <span>Total Cost:</span>
//             <span>${cart.totalCost.toFixed(2)}</span>
//           </div>
//           <button onClick={handlePurchase}>Purchase</button>
//         </>
//       ) : (
//         <p>Shopping Cart is empty</p>
//       )}
//     </div>
//   );
// };

// export default Cart;

import { useState, useEffect } from "react";
import axios from "axios";

const Cart = ({ memberID }) => {
  const [cart, setCart] = useState({
    // totalCost: 0,
    // totalItems: 0,
    // items: [],
    itemFK: 0,
    item_quantity: 0,
  });

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(`/api/cart?memberID=${memberID}`);
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, [memberID]);

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
    <div>
      <h2>Your Shopping Cart</h2>
      {cart.totalItems > 0 ? (
        <>
          <span>{cart.itemFK}</span>
          <span>{cart.item_quantity}</span>
          {/* <ul>
            {cart.items.map((cartItem) => (
              <li key={cartItem.itemID}>
                <span>{cartItem.item.name}</span>
                <span>Quantity: {cartItem.quantity}</span>
                <span>Price: ${cartItem.item.price.toFixed(2)}</span>
                <button onClick={() => handleRemoveItem(cartItem.itemID)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div>
            <span>Total Cost:</span>
            <span>${cart.totalCost.toFixed(2)}</span>
          </div>
          <button onClick={handlePurchase}>Purchase</button> */}
        </>
      ) : (
        <p>Shopping Cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
