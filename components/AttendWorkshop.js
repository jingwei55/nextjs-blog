// components/AttendWorkshop.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/AttendEventWorkshop.module.css"; // You can create a new CSS module for AttendWorkshop
import { useAuth } from "../context/AuthContext";

const AttendWorkshop = () => {
  const { userID } = useAuth();
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    const fetchAttendingWorkshops = async () => {
      try {
        const response = await axios.get(
          `/api/attendingworkshops?memberID=${userID}`
        );
        const workshopsData = response.data;

        // console.log("Attending Workshop Data: ", workshopsData);

        setWorkshops(workshopsData);
      } catch (error) {
        console.error("Error fetching attending workshops data:", error);
      }
    };

    fetchAttendingWorkshops();
  }, [userID]);

  const cancelAttendance = async (workshopID) => {
    try {
      // Send a request to the API to cancel attendance
      await axios.post("/api/cancelworkshop", {
        memberID: userID,
        workshopID,
      });

      // Update the workshops list locally
      setWorkshops((prevWorkshops) =>
        prevWorkshops.filter((workshop) => workshop.workshopID !== workshopID)
      );

      window.alert("Attendance canceled successfully!");
    } catch (error) {
      console.error("Error canceling attendance:", error);
    }
  };

  // console.log("Attending Workshops Data: ", workshops);

  return (
    <div className={styles.attendEventWorkshopContainer}>
      <h2>Attending Workshops</h2>
      {workshops.length > 0 ? (
        <ul className={styles.attendEventWorkshopList}>
          {workshops.map((workshop) => (
            <li
              key={workshop.workshopID}
              className={styles.attendEventWorkshopItem}
            >
              <h3 className={styles.attendEventWorkshopName}>
                {workshop.name}
              </h3>
              <p className={styles.attendEventWorkshopDescription}>
                {workshop.desc}
              </p>
              <p>Shelter Name: {workshop.shelter_name}</p>
              <p>Shelter Location: {workshop.shelter_location}</p>
              <button
                className={styles.button}
                onClick={() => cancelAttendance(workshop.workshopID)}
              >
                Cancel Attendance
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No workshops available.</p>
      )}
    </div>
  );
};

export default AttendWorkshop;
