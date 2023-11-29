// components/PetTypeDropdown.js
import React, { useState } from "react";
import styles from "../styles/PetTypeDropdown.module.css"; // Import the CSS module

const PetTypeDropdown = () => {
  const [selectedPetType, setSelectedPetType] = useState("");
  const [petAge, setPetAge] = useState("");
  const [description, setDescription] = useState("");
  const [petName, setPetName] = useState("");

  const handlePetTypeChange = (event) => {
    const selectedType = event.target.value;
    setSelectedPetType(selectedType);
  };

  const handlePetAgeChange = (event) => {
    setPetAge(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    const limitedDescription = event.target.value.slice(0, 100);
    setDescription(limitedDescription);
  };

  const handlePetNameChange = (event) => {
    setPetName(event.target.value);
  };

  const handleSubmit = () => {
    // Your existing code
  };

  const ageOptions = Array.from({ length: 101 }, (_, index) => index);

  return (
    <div className={styles["pet-type-dropdown"]}>
      <div>
        <label className="label">Pet Name: </label>
        <input
          className="input"
          type="text"
          id="petName"
          value={petName}
          onChange={handlePetNameChange}
          placeholder="Insert Name Here"
        />
      </div>

      <label className="label">Select Pet Type: </label>
      <select
        className="input"
        id="petType"
        value={selectedPetType}
        onChange={handlePetTypeChange}
      >
        <option value="">Select an option</option>
        <option value="amphibian">Amphibian</option>
        <option value="reptile">Reptile</option>
        <option value="mammal">Mammal</option>
        <option value="other">Other</option>
      </select>

      <div>
        <label className="label">Pet Age: </label>
        <select
          className="input"
          id="petAge"
          value={petAge}
          onChange={handlePetAgeChange}
        >
          <option value="">Select an age</option>
          {ageOptions.map((age) => (
            <option key={age} value={age}>
              {age} years
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="label">Description: </label>
        <textarea
          className="input"
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter description here (max 100 characters)"
          rows="4"
          cols="50"
        />
      </div>

      <button type="button" onClick={handleSubmit}>
        Submit
      </button>

      {/* {selectedPetType && (
        <p className="p">
          Pet Name: {petName || "N/A"}. You selected: {selectedPetType} with age{" "}
          {petAge || "N/A"}. Description: {description || "N/A"}
        </p>
      )} */}
    </div>
  );
};

export default PetTypeDropdown;
