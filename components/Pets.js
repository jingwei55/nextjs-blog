// components / Pets.js;
import React, { useState, useEffect } from "react";
import styles from "../styles/Pets.module.css"; // Import the CSS module
import { useAuth } from "../context/AuthContext"; // Import the AuthContext
import axios from "axios";

const Pets = () => {
  const { isLoggedIn, role, userID } = useAuth(); // Access the isLoggedIn state from AuthContext
  const [pets, setPets] = useState([]);

  console.log("Current userID and role: ", userID, role);

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch("/api/pets")
      .then((response) => response.json())
      .then((data) => setPets(data))
      .catch((error) => console.error("Error fetching pets:", error));
  }, []);

  console.log("Pets Data: ", pets);

  // State to manage adoption status for each pet
  const [adoptionStatus, setAdoptionStatus] = useState({});

  // Function to toggle adoption status for a pet
  const toggleAdoptStatus = (petId) => {
    setAdoptionStatus((prevStatus) => ({
      ...prevStatus,
      [petId]: !prevStatus[petId],
    }));
  };

  const adoptPet = async (petId) => {
    try {
      // Send a request to the API to link the memberID with the petID
      await axios.post("/api/adopt", { memberID: userID, petID: petId });

      // Update the adoption status locally
      toggleAdoptStatus(petId);
      window.alert("Pet successfully adopted!");
    } catch (error) {
      console.error("Error adopting pet:", error);
    }
  };

  return (
    <div className={styles.petsContainer}>
      <h2>Available Pets</h2>
      <ul className={styles.petList}>
        {pets.map((pet) => (
          <li key={pet.petID} className={styles.petItem}>
            <h3>{pet.desc}</h3>
            <p>Age: {pet.age} years</p>
            <p>{pet.pet_type}</p>
            <p>Shelter Name: {pet.shelter_name}</p>
            <p>Shelter Location: {pet.shelter_location}</p>
            {isLoggedIn && role === "member" && (
              <p>
                Adopt Pet?{" "}
                <label>
                  <input
                    type="checkbox"
                    checked={adoptionStatus[pet.petID]}
                    onChange={() => adoptPet(pet.petID)}
                    disabled={adoptionStatus[pet.petID]}
                  />
                  Yes
                </label>
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pets;
