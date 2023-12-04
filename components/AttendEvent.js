// components/AttendEvent.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/AttendEventWorkshop.module.css"; // You can create a new CSS module for AttendWorkshop
import { useAuth } from "../context/AuthContext";

const AttendEvent = () => {
  const { userID } = useAuth();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchAttendingEvents = async () => {
      try {
        const response = await axios.get(
          `/api/attendingevents?memberID=${userID}`
        );
        const eventsData = response.data;

        console.log("Attending Event Data: ", eventsData);

        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching attending events data:", error);
      }
    };

    fetchAttendingEvents();
  }, [userID]);

  const cancelAttendance = async (eventID) => {
    try {
      // Send a request to the API to cancel attendance
      await axios.post("/api/cancelevent", {
        memberID: userID,
        eventID,
      });

      // Update the events list locally
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.eventID !== eventID)
      );

      window.alert("Attendance canceled successfully!");
    } catch (error) {
      console.error("Error canceling attendance:", error);
    }
  };

  console.log("Attending Events Data: ", events);

  return (
    <div className={styles.attendEventWorkshopContainer}>
      <h2>Attending Events</h2>
      {events.length > 0 ? (
        <ul className={styles.attendEventWorkshopList}>
          {events.map((event) => (
            <li key={event.eventID} className={styles.attendEventWorkshopItem}>
              <h3 className={styles.attendEventWorkshopName}>{event.name}</h3>
              <p className={styles.attendEventWorkshopDescription}>
                {event.desc}
              </p>
              <p>Shelter Name: {event.shelter_name}</p>
              <p>Shelter Location: {event.shelter_location}</p>
              <button
                className={styles.button}
                onClick={() => cancelAttendance(event.eventID)}
              >
                Cancel Attendance
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
};

export default AttendEvent;
