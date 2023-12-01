// import React, { useState, useEffect } from "react";
// import styles from "../styles/Shelter.module.css"; // Import the CSS module

// const Shelter = ({ onSelectShelter }) => {
//   const [shelters, setShelters] = useState([]);

//   useEffect(() => {
//     // Fetch data from the API endpoint
//     fetch("/api/shelter")
//       .then((response) => response.json())
//       .then((data) => setShelters(data))
//       .catch((error) => console.error("Error fetching shelters:", error));
//   }, []);

//   return (
//     <div className={styles.shelterContainer}>
//       <h2>Shelters</h2>
//       <ul className={styles.shelterList}>
//         {shelters.map((shelter) => (
//           <li key={shelter.shelterID} className={styles.shelterItem}>
//             <button onClick={() => onSelectShelter(shelter.shelterID)}>
//               {shelter.name}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Shelter;

// components/Shelter.js
import Link from "next/link";

const Shelter = ({ onSelectShelter }) => {
  const handleClick = (shelterID) => {
    onSelectShelter(shelterID);
  };

  return (
    <div>
      <Link href="/shelter/[shelterID]" as="/shelter/1">
        <button onClick={() => handleClick(1)}>Shelter 1</button>
      </Link>
      <Link href="/shelter/[shelterID]" as="/shelter/2">
        <button onClick={() => handleClick(2)}>Shelter 2</button>
      </Link>
      <Link href="/shelter/[shelterID]" as="/shelter/3">
        <button onClick={() => handleClick(3)}>Shelter 3</button>
      </Link>
    </div>
  );
};

export default Shelter;
