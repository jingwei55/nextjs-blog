// components/Events.js
import React, { useState, useEffect } from "react";
import styles from "../styles/EventsWorkshops.module.css";

const Events = () => {
  const [eventsData, setEventsData] = useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/event");
        const data = await response.json();
        setEventsData(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []); // Empty dependency array to fetch data only once on component mount

  const toggleAttendanceStatus = (eventId) => {
    setAttendanceStatus((prevStatus) => ({
      ...prevStatus,
      [eventId]: !prevStatus[eventId],
    }));
  };

  const formatEventDate = (dateString) => {
    const eventDate = new Date(dateString);
    return (
      eventDate.toISOString().split("T")[0] +
      " " +
      eventDate.toLocaleTimeString()
    );
  };

  return (
    <div className={styles.eventsWorkshopsContainer}>
      <h2>Upcoming Events</h2>
      <ul className={styles.eventsWorkshopsList}>
        {eventsData.map((event) => (
          <li key={event.id} className={styles.eventWorkshopItem}>
            <h3>{event.name}</h3>
            <p>{event.desc}</p>
            <p>Shelter Name: {event.shelter_name}</p>
            <p>Shelter Location: {event.shelter_location}</p>
            <p>Date: {formatEventDate(event.date)}</p>
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
