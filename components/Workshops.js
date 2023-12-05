// components/Workshops.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/EventsWorkshops.module.css"; // Import the shared CSS module
import { useAuth } from "../context/AuthContext"; // Import the AuthContext

const Workshops = () => {
  const { isLoggedIn, role, userID } = useAuth(); // Access the isLoggedIn state from AuthContext
  const [workshopsData, setWorkshopsData] = useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState({});

  console.log("Current userID and role: ", userID, role);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await fetch(`/api/workshop?memberID=${userID}`);
        const data = await response.json();
        setWorkshopsData(data);
        console.log("Workshop data: ", workshopsData);
      } catch (error) {
        console.error("Error fetching workshops:", error);
      }
    };

    fetchWorkshops();
  }, []); // Empty dependency array to fetch data only once on component mount

  // Function to toggle attendance status for a workshop
  const toggleAttendanceStatus = (workshopId) => {
    setAttendanceStatus((prevStatus) => ({
      ...prevStatus,
      [workshopId]: !prevStatus[workshopId],
    }));
  };

  const attendWorkshop = async (workshopId) => {
    try {
      // Send a request to the API to link the memberID with the petID
      await axios.post("/api/attendworkshop", {
        memberID: userID,
        workshopID: workshopId,
      });

      // Update the attendance status locally
      toggleAttendanceStatus(workshopId);
      window.alert("Attending Workshop!");
    } catch (error) {
      console.error("Error attending workshop:", error);
    }
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
          <li key={workshop.workshopID} className={styles.eventWorkshopItem}>
            <h3>{workshop.name}</h3>
            <p>{workshop.desc}</p>
            <p>Shelter Name: {workshop.shelter_name}</p>
            <p>Shelter Location: {workshop.shelter_location}</p>
            <p>Date: {formatWorkshopDate(workshop.date)}</p>
            {isLoggedIn && role === "member" && (
              <p>
                Attend Workshop?{" "}
                <label>
                  <input
                    type="checkbox"
                    checked={attendanceStatus[workshop.workshopID]}
                    onChange={() => attendWorkshop(workshop.workshopID)}
                    disabled={attendanceStatus[workshop.workshopID]}
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

export default Workshops;
