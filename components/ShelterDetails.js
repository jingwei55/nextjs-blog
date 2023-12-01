// components/ShelterDetails.js
// import React, { useEffect, useState } from "react";
// import query from "../lib/query";

// const ShelterDetails = ({ shelterID }) => {
//   const [shelter, setShelter] = useState(null);

//   useEffect(() => {
//     const fetchShelterDetails = async () => {
//       try {
//         const results = await query(
//           "SELECT * FROM shelters WHERE shelterID = ?",
//           [shelterID]
//         );

//         if (results.length > 0) {
//           setShelter(results[0]);
//         } else {
//           console.error(`Shelter with ID ${shelterID} not found`);
//         }
//       } catch (error) {
//         console.error("Error fetching shelter details:", error);
//       }
//     };

//     fetchShelterDetails();
//   }, [shelterID]);

//   if (!shelter) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       <h2>{shelter.name}</h2>
//       <p>Capacity: {shelter.pet_capacity}</p>
//       <p>Description: {shelter.description}</p>
//       {/* Add more details as needed */}
//     </div>
//   );
// };

// export default ShelterDetails;

// components/ShelterDetails.js
import React, { useEffect, useState } from "react";

const ShelterDetails = ({ shelterID }) => {
  const [shelter, setShelter] = useState(null);

  useEffect(() => {
    const fetchShelterDetails = async () => {
      try {
        const response = await fetch(`/api/shelter/${shelterID}`);
        const results = await response.json();

        if (results.length > 0) {
          setShelter(results[0]);
        } else {
          console.error(`Shelter with ID ${shelterID} not found`);
        }
      } catch (error) {
        console.error("Error fetching shelter details:", error);
      }
    };

    fetchShelterDetails();
  }, [shelterID]);

  if (!shelter) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{shelter.name}</h2>
      <p>Capacity: {shelter.pet_capacity}</p>
      <p>Description: {shelter.location}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default ShelterDetails;
