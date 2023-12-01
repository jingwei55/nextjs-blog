// // components/Shelter.js
// import React from "react";
// import styles from "../styles/Shelter.module.css"; // Import the shared CSS module

// const Shelter = () => {
//   // Hardcoded shelter information
//   const sheltersData = [
//     {
//       id: 1,
//       name: "Maple Pet Shelter",
//       location: "Toronto, ON",
//       pet_capacity: 50,
//     },
//     {
//       id: 2,
//       name: "Rocky Mountain Animal Rescue",
//       location: "Calgary, AB",
//       pet_capacity: 30,
//     },
//     // Add more shelters as needed
//   ];

//   return (
//     <div className={styles.shelterContainer}>
//       <h2>Pet Shelters in Canada</h2>
//       <ul className={styles.shelterList}>
//         {sheltersData.map((shelter) => (
//           <li key={shelter.id} className={styles.shelterItem}>
//             <h3>{shelter.name}</h3>
//             <p>Location: {shelter.location}</p>
//             <p>Pet Capacity: {shelter.pet_capacity}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Shelter;

// components/Shelter.js
import React, { useEffect, useState } from "react";
import styles from "../styles/Shelter.module.css";
import { query } from "../lib/db";

const Shelter = () => {
  const [shelters, setShelters] = useState([]);

  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const results = await query("SELECT * FROM shelters");
        setShelters(results);
      } catch (error) {
        console.error("Error fetching shelters:", error);
      }
    };

    fetchShelters();
  }, []);

  return (
    <div className={styles.shelterContainer}>
      <h2>Pet Shelters in Canada</h2>
      <ul className={styles.shelterList}>
        {shelters.map((shelter) => (
          <li key={shelter.shelterID} className={styles.shelterItem}>
            <h3>{shelter.name}</h3>
            <p>Capacity: {shelter.pet_capacity}</p>
            <p>Description: {shelter.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shelter;
