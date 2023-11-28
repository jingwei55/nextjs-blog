// pages/surrenderPet.js
import React, { useState } from "react";
import PetTypeDropdown from "../components/PetTypeDropdown";
import styles from "../styles/SurrenderPet.module.css"; // Import the CSS module

const SurrenderPet = () => {
  const [petName, setPetName] = useState("");
  const [selectedPetType, setSelectedPetType] = useState("");
  const [selectedPetAge, setSelectedPetAge] = useState("");
  const [description, setDescription] = useState("");

  const handlePetTypeSelect = (petType) => {
    setSelectedPetType(petType);
  };

  const handlePetAgeSelect = (petAge) => {
    setSelectedPetAge(petAge);
  };

  const handleSubmit = async () => {
    try {
      // Make a request to the API to add the pet to the database
      const response = await fetch("/api/surrenderPet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          petName,
          petType: selectedPetType,
          petAge: selectedPetAge,
          description,
        }),
      });

      if (response.ok) {
        console.log("Pet surrendered successfully");
        // Optionally, you can redirect the user or perform other actions
      } else {
        console.error("Failed to surrender pet:", response.statusText);
        // Handle the error
      }
    } catch (error) {
      console.error("Error submitting pet surrender:", error.message);
      // Handle the error
    }
  };

  return (
    <div>
      <h1>Surrender a Pet</h1>
      <form className="add">
        <PetTypeDropdown
          onSelectPetType={handlePetTypeSelect}
          onSelectPetAge={handlePetAgeSelect}
        />
        <div className="picture">
          <img
            src="../img/surrender-pet.png"
            alt="Pet Image"
            style={{ width: "80%", height: "auto" }}
          />
        </div>
      </form>
    </div>
  );
};

export default SurrenderPet;
