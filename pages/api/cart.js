// pages/api/cart.js
export default function handler(req, res) {
  // Dummy data for the shopping cart
  const cartData = {
    totalCost: 25.98,
    totalItems: 3,
    items: [
      {
        itemID: 1,
        quantity: 2,
        item: {
          name: "Pet Food",
          price: 15.99,
        },
      },
      {
        itemID: 2,
        quantity: 1,
        item: {
          name: "Pet Toy",
          price: 9.99,
        },
      },
    ],
  };

  res.status(200).json(cartData);
}
