// // components/PetTypeDropdown.js
// import React, { useState, useEffect } from "react";
// import styles from "../styles/PetTypeDropdown.module.css"; // Import the CSS module

// const PetTypeDropdown = () => {
//   const [selectedPetType, setSelectedPetType] = useState("");
//   const [petAge, setPetAge] = useState("");
//   const [description, setDescription] = useState("");
//   const [petName, setPetName] = useState("");
//   const [shelters, setShelters] = useState([]);
//   const [selectedShelter, setSelectedShelter] = useState("");

//   useEffect(() => {
//     // Fetch shelter data from the API endpoint
//     fetch("/api/shelter")
//       .then((response) => response.json())
//       .then((data) => setShelters(data))
//       .catch((error) => console.error("Error fetching shelters:", error));
//   }, []);

//   const handlePetTypeChange = (event) => {
//     const selectedType = event.target.value;
//     setSelectedPetType(selectedType);
//   };

//   const handlePetAgeChange = (event) => {
//     setPetAge(event.target.value);
//   };

//   const handleDescriptionChange = (event) => {
//     const limitedDescription = event.target.value.slice(0, 100);
//     setDescription(limitedDescription);
//   };

//   const handlePetNameChange = (event) => {
//     setPetName(event.target.value);
//   };

//   const handleShelterChange = (event) => {
//     const selectedShelterId = event.target.value;
//     setSelectedShelter(selectedShelterId);
//   };

//   const handleSubmit = async () => {
//     try {
//       // Make a request to the API to add the pet to the database
//       const response = await fetch("/api/surrenderPet", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           petName,
//           petType: selectedPetType,
//           petAge: petAge,
//           description,
//           shelter: selectedShelter, // Include the selected shelter in the request
//         }),
//       });

//       if (response.ok) {
//         console.log("Pet surrendered successfully");
//         // Optionally, you can redirect the user or perform other actions
//       } else {
//         console.error("Failed to surrender pet:", response.statusText);
//         // Handle the error
//       }
//     } catch (error) {
//       console.error("Error submitting pet surrender:", error.message);
//       // Handle the error
//     }
//   };

//   const ageOptions = Array.from({ length: 101 }, (_, index) => index);

//   return (
//     <div className={styles["pet-type-dropdown"]}>
//       <div>
//         <label className="label">Pet Name: </label>
//         <input
//           className="input"
//           type="text"
//           id="petName"
//           value={petName}
//           onChange={handlePetNameChange}
//           placeholder="Insert Name Here"
//         />
//       </div>

//       <label className="label">Select Pet Type: </label>
//       <select
//         className="input"
//         id="petType"
//         value={selectedPetType}
//         onChange={handlePetTypeChange}
//       >
//         <option value="">Select an option</option>
//         <option value="amphibian">Amphibian</option>
//         <option value="reptile">Reptile</option>
//         <option value="mammal">Mammal</option>
//         <option value="other">Other</option>
//       </select>

//       <div>
//         <label className="label">Pet Age: </label>
//         <select
//           className="input"
//           id="petAge"
//           value={petAge}
//           onChange={handlePetAgeChange}
//         >
//           <option value="">Select an age</option>
//           {ageOptions.map((age) => (
//             <option key={age} value={age}>
//               {age} years
//             </option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <label className="label">Description: </label>
//         <textarea
//           className="input"
//           id="description"
//           value={description}
//           onChange={handleDescriptionChange}
//           placeholder="Enter description here (max 100 characters)"
//           rows="4"
//           cols="50"
//         />
//       </div>

//       <div>
//         <label className="label">Select Pet Shelter: </label>
//         <select
//           className="input"
//           id="shelter"
//           value={selectedShelter}
//           onChange={handleShelterChange}
//         >
//           <option value="">Select a shelter</option>
//           {shelters.map((shelter) => (
//             <option key={shelter.shelterID} value={shelter.shelterID}>
//               {shelter.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <button type="button" onClick={handleSubmit}>
//         Submit
//       </button>
//     </div>
//   );
// };

// export default PetTypeDropdown;

// components/PetTypeDropdown.js
import React, { useState, useEffect } from "react";
import styles from "../styles/PetTypeDropdown.module.css"; // Import the CSS module

const PetTypeDropdown = ({ onSubmit }) => {
  const [selectedPetType, setSelectedPetType] = useState("");
  const [petAge, setPetAge] = useState("");
  const [description, setDescription] = useState("");
  const [petName, setPetName] = useState("");
  const [shelters, setShelters] = useState([]);
  const [selectedShelter, setSelectedShelter] = useState("");

  useEffect(() => {
    // Fetch shelter data from the API endpoint
    fetch("/api/shelter")
      .then((response) => response.json())
      .then((data) => setShelters(data))
      .catch((error) => console.error("Error fetching shelters:", error));
  }, []);

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

  const handleShelterChange = (event) => {
    const selectedShelterId = event.target.value;
    setSelectedShelter(selectedShelterId);
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
          petAge: petAge,
          description,
          shelter: selectedShelter, // Include the selected shelter in the request
        }),
      });

      if (response.ok) {
        console.log("Pet surrendered successfully");
        // Optionally, you can redirect the user or perform other actions
        onSubmit(); // Notify parent component about the submission
      } else {
        console.error("Failed to surrender pet:", response.statusText);
        // Handle the error
      }
    } catch (error) {
      console.error("Error submitting pet surrender:", error.message);
      // Handle the error
    }
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

      <div>
        <label className="label">Select Pet Shelter: </label>
        <select
          className="input"
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

      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default PetTypeDropdown;
