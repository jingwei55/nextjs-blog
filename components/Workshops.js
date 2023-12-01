// components/Workshops.js
import React, { useState, useEffect } from "react";
import styles from "../styles/EventsWorkshops.module.css"; // Import the shared CSS module

const Workshops = () => {
  // Hardcoded workshop information
  const [workshopsData, setWorkshopsData] = useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/workshop");
        const data = await response.json();
        setWorkshopsData(data);
      } catch (error) {
        console.error("Error fetching workshops:", error);
      }
    };

    fetchEvents();
  }, []); // Empty dependency array to fetch data only once on component mount

  // Function to toggle attendance status for a workshop
  const toggleAttendanceStatus = (workshopId) => {
    setAttendanceStatus((prevStatus) => ({
      ...prevStatus,
      [workshopId]: !prevStatus[workshopId],
    }));
  };

  const formatWorkshopDate = (dateString) => {
    const workshopDate = new Date(dateString);
    return (
      workshopDate.toISOString().split("T")[0] +
      " " +
      workshopDate.toLocaleTimeString()
    );
  };

  return (
    <div className={styles.eventsWorkshopsContainer}>
      <h2>Upcoming Workshops</h2>
      <ul className={styles.eventsWorkshopsList}>
        {workshopsData.map((workshop) => (
          <li key={workshop.id} className={styles.eventWorkshopItem}>
            <h3>{workshop.name}</h3>
            <p>{workshop.desc}</p>
            <p>Shelter Name: {workshop.shelter_name}</p>
            <p>Shelter Location: {workshop.shelter_location}</p>
            <p>Date: {formatWorkshopDate(workshop.date)}</p>
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
