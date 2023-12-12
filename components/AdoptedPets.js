// components/AdoptedPets.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/AdoptedPets.module.css";
import { useAuth } from "../context/AuthContext";

const AdoptedPets = () => {
  const { userID } = useAuth();
  const [adoptedPets, setAdoptedPets] = useState([]);

  useEffect(() => {
    const fetchAdoptedPets = async () => {
      try {
        const response = await axios.get(`/api/adoptedpets?memberID=${userID}`);
        const { adoptedPets } = response.data;

        setAdoptedPets(adoptedPets);
      } catch (error) {
        console.error("Error fetching adopted pets data:", error);
      }
    };

    fetchAdoptedPets();
  }, [userID]);

  const surrenderPet = async (petID) => {
    try {
      // Send a request to the API to surrender the pet
      await axios.post("/api/surrender", { memberID: userID, petID });

      // Update the adopted pets list locally
      setAdoptedPets((prevPets) =>
        prevPets.filter((pet) => pet.petID !== petID)
      );

      window.alert("Pet successfully surrendered!");
    } catch (error) {
      console.error("Error surrendering pet:", error);
    }
  };

  console.log("Adopted Pets Data: ", adoptedPets);

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className={styles.adoptedPetsContainer}>
      <h2>Adopted Pets</h2>
      {adoptedPets.length > 0 ? (
        <ul className={styles.adoptedPetList}>
          {adoptedPets.map((pet) => (
            <li key={pet.petID} className={styles.adoptedPetItem}>
              <h3>{pet.name}</h3>
              <p>{pet.pet_type && capitalizeFirstLetter(pet.pet_type)}</p>
              <p>Description: {pet.desc}</p>
              <p>Age: {pet.age} years</p>
              <p>Shelter Name: {pet.shelter_name}</p>
              <p>Shelter Location: {pet.shelter_location}</p>
              <button
                className={styles.button}
                onClick={() => surrenderPet(pet.petID)}
              >
                Surrender Pet
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No adopted pets available.</p>
      )}
    </div>
  );
};

export default AdoptedPets;
