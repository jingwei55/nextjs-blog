// components/UpdateShop.js

import React, { useState, useEffect } from "react";
import styles from "../styles/UpdateShop.module.css"; // Import the CSS module

const UpdateShop = ({ onSubmit }) => {
  // State variables for form inputs
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [itemType, setItemType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shelters, setShelters] = useState([]);
  const [existingItems, setExistingItems] = useState([]); // State for existing items
  const [newItemName, setNewItemName] = useState("");
  const [selectedShelter, setSelectedShelter] = useState("");

  useEffect(() => {
    // Fetch shelter data from the API endpoint
    fetch("/api/shelter")
      .then((response) => response.json())
      .then((data) => setShelters(data))
      .catch((error) => console.error("Error fetching shelters:", error));
  }, []);

  useEffect(() => {
    // Fetch shelter data from the API endpoint
    fetch("/api/items")
      .then((response) => response.json())
      .then((data) => setExistingItems(data))
      .catch((error) => console.error("Error fetching shelters:", error));
  }, []);
  console.log("shelter Data:", shelters);
  console.log("item Data:", existingItems);

  // Function to handle selection of an existing item
  const handleExistingItemSelect = (selectedItemName) => {
    // Find the selected item in the existing items array
    const selectedItem = existingItems.find(
      (item) => item.name === selectedItemName
    );

    // Update the state with the details of the selected item
    if (selectedItem) {
      setName(selectedItem.name);
      setPrice(selectedItem.price);
      setItemType(selectedItem.item_type);
      setQuantity(selectedItem.quantity);
    }
  };

  const handleShelterChange = (event) => {
    const selectedShelterId = event.target.value;
    setSelectedShelter(selectedShelterId);
  };

  const handleNewItemNameChange = (e) => {
    const value = e.target.value;
    setNewItemName(value);
    handleExistingItemSelect(value);
  };

  const handleSubmit = async () => {
    try {
      // Make a request to the API to add the pet to the database
      const response = await fetch("/api/updateshop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name || newItemName,
          price,
          item_type: itemType,
          quantity,
          shelter: selectedShelter, // Include the selected shelter in the request
        }),
      });

      if (response.ok) {
        window.alert(`Successfully updated/added item!`);
        console.log("Item added to shop successfully");
        // Optionally, you can redirect the user or perform other actions
        onSubmit(); // Notify parent component about the submission

        // Reset the form fields to their initial values
        setName("");
        setPrice("");
        setItemType("");
        setQuantity("");
        setSelectedShelter("");
      } else {
        console.error("Failed add item and update shop:", response.statusText);
        // Handle the error
      }
    } catch (error) {
      console.error("Error updating shop:", error.message);
      // Handle the error
    }
  };

  return (
    <div className={styles.updateShop}>
      <h2>Update Shop Item</h2>
      <div>
        <label className={styles.label}>Select or Add Item:</label>
        <select
          className={styles.input}
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            handleExistingItemSelect(e.target.value);
          }}
          placeholder="Insert Item Name"
        >
          {/* Mapping over existing items to create options */}
          {[...new Set(existingItems.map((item) => item.name))].map(
            (uniqueName) => (
              <option key={uniqueName} value={uniqueName}>
                {uniqueName}
              </option>
            )
          )}
          {/* Option to add a new item */}
          <option value="">Add New Item</option>
        </select>
        {/* Render input field for new event name when "Add New Event" is selected */}
        {name === "" && (
          <div>
            <label className={styles.label}>New Item Name:</label>
            <input
              className={styles.input}
              type="text"
              value={newItemName}
              onChange={handleNewItemNameChange}
              placeholder="Insert New Item Name"
            />
          </div>
        )}
      </div>
      <div>
        <label className={styles.label}>Price:</label>
        <input
          className={styles.input}
          type="text"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Insert Price (Nearest Cent)"
        />
      </div>
      <div>
        <label className={styles.label}>Item Type:</label>
        <input
          className={styles.input}
          type="text"
          id="item_type"
          value={itemType}
          onChange={(e) => setItemType(e.target.value)}
          placeholder="Insert Item Type (e.g. Dog Kennel)"
        />
      </div>
      <div>
        <label className={styles.label}>Quantity:</label>
        <input
          className={styles.input}
          type="text"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Insert Quantity (Integer)"
        />
      </div>
      <div>
        <label className={styles.label}>Select Pet Shelter: </label>
        <select
          className={styles.input}
          id="shelter"
          value={selectedShelter}
          onChange={handleShelterChange}
        >
          <option value="">Select a shelter</option>
          {shelters.map((shelter) => (
            <option key={shelter.shelterID} value={shelter.shelterID}>
              {shelter.name}
            </option>
          ))}
        </select>
      </div>
      <button className={styles.button} type="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default UpdateShop;
