// components/Events.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/EventsWorkshops.module.css";
import { useAuth } from "../context/AuthContext"; // Import the AuthContext

const Events = () => {
  const { isLoggedIn, role, userID } = useAuth(); // Access the isLoggedIn state from AuthContexts
  const [eventsData, setEventsData] = useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState({});

  console.log("Current userID and role: ", userID, role);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/event?memberID=${userID}`);
        const data = await response.json();
        setEventsData(data);
        console.log("Event data: ", eventsData);
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

  const attendEvent = async (eventId) => {
    try {
      // Send a request to the API to link the memberID with the petID
      await axios.post("/api/attendevent", {
        memberID: userID,
        eventID: eventId,
      });

      // Update the attendance status locally
      toggleAttendanceStatus(eventId);
      window.alert("Attending Event!");
    } catch (error) {
      console.error("Error attending event:", error);
    }
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
            {isLoggedIn && role === "member" && (
              <p>
                Attend Event?{" "}
                <label>
                  <input
                    type="checkbox"
                    checked={attendanceStatus[event.eventID]}
                    onChange={() => attendEvent(event.eventID)}
                    disabled={attendanceStatus[event.eventID]}
                  />
                  Yes
                </label>
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
