// components/Pets.js
import React, { useState } from "react";
import styles from "../styles/Pets.module.css"; // Import the CSS module

const Pets = () => {
  // const [pets, setPets] = useState([]);

  // useEffect(() => {
  //   // Fetch data from the API endpoint
  //   fetch("/api/pets")
  //     .then((response) => response.json())
  //     .then((data) => setPets(data))
  //     .catch((error) => console.error("Error fetching pets:", error));
  // }, []);
  const pets = [
    { id: 1, pet_type: "Dog", age: 3, desc: "Friendly and energetic dog." },
    { id: 2, pet_type: "Cat", age: 2, desc: "Independent and playful cat." },
    { id: 3, pet_type: "Bird", age: 1, desc: "Colorful and talkative bird." },
    // Add more pets as needed
  ];

  // State to manage adoption status for each pet
  const [adoptionStatus, setAdoptionStatus] = useState({});

  // Function to toggle adoption status for a pet
  const toggleAdoptStatus = (petId) => {
    setAdoptionStatus((prevStatus) => ({
      ...prevStatus,
      [petId]: !prevStatus[petId],
    }));
  };

  return (
    <div className={styles.petsContainer}>
      <h2>Available Pets</h2>
      <ul className={styles.petList}>
        {pets.map((pet) => (
          <li key={pet.id} className={styles.petItem}>
            <h3>{pet.pet_type}</h3>
            <p>Age: {pet.age} years</p>
            <p>{pet.desc}</p>
            <p>
              Adopt Pet?{" "}
              <label>
                <input
                  type="checkbox"
                  checked={adoptionStatus[pet.id]}
                  onChange={() => toggleAdoptStatus(pet.id)}
                />
                Yes
              </label>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pets;
