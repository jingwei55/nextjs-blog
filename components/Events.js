// components/Events.js
import React, { useState } from "react";
import styles from "../styles/EventsWorkshops.module.css"; // Import the shared CSS module

const Events = () => {
  // Hardcoded event information
  const eventsData = [
    {
      id: 1,
      name: "Pet Adoption Fair",
      description: "Join us for a day of pet adoptions!",
      date: "2023-05-15",
    },
    {
      id: 2,
      name: "Dog Training Workshop",
      description: "Learn basic dog training techniques.",
      date: "2023-06-01",
    },
    // Add more events as needed
  ];

  // State to manage attendance status for each event
  const [attendanceStatus, setAttendanceStatus] = useState({});

  // Function to toggle attendance status for an event
  const toggleAttendanceStatus = (eventId) => {
    setAttendanceStatus((prevStatus) => ({
      ...prevStatus,
      [eventId]: !prevStatus[eventId],
    }));
  };

  return (
    <div className={styles.eventsWorkshopsContainer}>
      <h2>Upcoming Events</h2>
      <ul className={styles.eventsWorkshopsList}>
        {eventsData.map((event) => (
          <li key={event.id} className={styles.eventWorkshopItem}>
            <h3>{event.name}</h3>
            <p>{event.description}</p>
            <p>Date: {event.date}</p>
            <p>
              Attend Event?{" "}
              <label>
                <input
                  type="checkbox"
                  checked={attendanceStatus[event.id]}
                  onChange={() => toggleAttendanceStatus(event.id)}
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

export default Events;
