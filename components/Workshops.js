// components/Workshops.js
import React, { useState } from "react";
import styles from "../styles/EventsWorkshops.module.css"; // Import the shared CSS module

const Workshops = () => {
  // Hardcoded workshop information
  const workshopsData = [
    {
      id: 1,
      name: "Pet Nutrition Workshop",
      description: "Learn about proper pet nutrition.",
      date: "2023-05-20",
    },
    {
      id: 2,
      name: "Cat Grooming Class",
      description: "Tips for grooming your feline friend.",
      date: "2023-06-10",
    },
    // Add more workshops as needed
  ];

  // State to manage attendance status for each workshop
  const [attendanceStatus, setAttendanceStatus] = useState({});

  // Function to toggle attendance status for a workshop
  const toggleAttendanceStatus = (workshopId) => {
    setAttendanceStatus((prevStatus) => ({
      ...prevStatus,
      [workshopId]: !prevStatus[workshopId],
    }));
  };

  return (
    <div className={styles.eventsWorkshopsContainer}>
      <h2>Upcoming Workshops</h2>
      <ul className={styles.eventsWorkshopsList}>
        {workshopsData.map((workshop) => (
          <li key={workshop.id} className={styles.eventWorkshopItem}>
            <h3>{workshop.name}</h3>
            <p>{workshop.description}</p>
            <p>Date: {workshop.date}</p>
            <p>
              Attend Workshop?{" "}
              <label>
                <input
                  type="checkbox"
                  checked={attendanceStatus[workshop.id]}
                  onChange={() => toggleAttendanceStatus(workshop.id)}
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

export default Workshops;
