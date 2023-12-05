// components/UpdateWorkshop.js

import React, { useState, useEffect } from "react";
import styles from "../styles/UpdateEvent.module.css"; // Import the CSS module
import { useAuth } from "../context/AuthContext"; // Import the AuthContext

const UpdateWorkshop = ({ onSubmit }) => {
  const { userID } = useAuth();
  // State variables for form inputs
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [availableDateTimes, setAvailableDateTimes] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [shelters, setShelters] = useState([]);
  const [existingWorkshops, setExistingWorkshops] = useState([]); // State for existing items
  const [newWorkshopName, setNewWorkshopName] = useState("");
  const [selectedShelter, setSelectedShelter] = useState("");
  const [validShelters, setValidShelters] = useState([]); // New state for valid shelter names

  // State variables for Delete Workshop
  const [deleteWorkshopName, setDeleteWorkshopName] = useState("");
  const [selectedDeleteShelter, setSelectedDeleteShelter] = useState("");

  useEffect(() => {
    // Function to generate availableDateTimes
    const generateAvailableDateTimes = () => {
      const currentDate = new Date();
      const startHour = 9;
      const endHour = 18;
      const interval = 2; // in hours
      const daysAhead = 7;

      const dateTimes = [];

      for (let i = 0; i < daysAhead; i++) {
        const currentDay = new Date(currentDate);
        currentDay.setDate(currentDate.getDate() + i);

        for (let hour = startHour; hour < endHour; hour += interval) {
          const currentDateTime = new Date(currentDay);
          currentDateTime.setHours(hour, 0, 0, 0);
          dateTimes.push(currentDateTime.toISOString());
        }
      }

      setAvailableDateTimes(dateTimes);
    };

    generateAvailableDateTimes();
  }, []);

  useEffect(() => {
    // Fetch shelter data from the API endpoint
    fetch("/api/shelter")
      .then((response) => response.json())
      .then((data) => setShelters(data))
      .catch((error) => console.error("Error fetching shelters:", error));
  }, []);

  useEffect(() => {
    // Fetch shelter data from the API endpoint
    fetch(`/api/workshop?memberID=${userID}`)
      .then((response) => response.json())
      .then((data) => setExistingWorkshops(data))
      .catch((error) => console.error("Error fetching shelters:", error));
  }, []);
  console.log("shelter Data:", shelters);
  console.log("Workshop Data:", existingWorkshops);

  // Function to handle selection of an existing Workshop
  const handleExistingWorkshopSelect = (selectedWorkshopName) => {
    // Find the selected Workshop in the existing Workshops array
    const selectedWorkshop = existingWorkshops.find(
      (Workshop) => Workshop.name === selectedWorkshopName
    );

    // Update the state with the details of the selected Workshop
    if (selectedWorkshop) {
      setName(selectedWorkshop.name);
      setDesc(selectedWorkshop.desc);
      setSelectedDateTime(selectedDateTime);
    }
  };

  const handleNewWorkshopNameChange = (e) => {
    const value = e.target.value;
    setNewWorkshopName(value);
    handleExistingWorkshopSelect(value);
  };

  const handleDateTimeChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedDateTime(selectedValue);
  };

  const handleShelterChange = (Workshop) => {
    const selectedShelterId = Workshop.target.value;
    setSelectedShelter(selectedShelterId);
  };

  const formatWorkshopDate = (dateString) => {
    const WorkshopDate = new Date(dateString);
    return (
      WorkshopDate.toISOString().split("T")[0] +
      " " +
      WorkshopDate.toLocaleTimeString()
    );
  };

  const handleDeleteWorkshopSelect = (selectedWorkshopName) => {
    // Find the selected Workshop in the existing Workshops array
    const selectedWorkshop = existingWorkshops.find(
      (Workshop) => Workshop.name === selectedWorkshopName
    );

    // Update the state with the details of the selected Workshop
    if (selectedWorkshop) {
      setDeleteWorkshopName(selectedWorkshop.name);
      setSelectedDeleteShelter("");
      // Update the list of valid shelters based on the selected Workshop
      setValidShelters(
        shelters.filter(
          (shelter) => shelter.shelterID === selectedWorkshop.WS_FK
        )
      );
    }
  };

  const handleSubmit = async () => {
    try {
      // Make a request to the API to add the pet to the database
      const response = await fetch("/api/updateworkshop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name || newWorkshopName,
          desc,
          date: selectedDateTime,
          shelter: selectedShelter, // Include the selected shelter in the request
        }),
      });

      if (response.ok) {
        window.alert(`Successfully updated/added Workshop!`);
        console.log("Workshop added to Workshop successfully");
        // Optionally, you can redirect the user or perform other actions
        onSubmit(); // Notify parent component about the submission

        // Reset the form fields to their initial values
        setName("");
        setDesc("");
        setDate("");
        setSelectedShelter("");
      } else {
        console.error("Failed to update Workshop:", response.statusText);
        // Handle the error
      }
    } catch (error) {
      console.error("Error updating Workshop:", error.message);
      // Handle the error
    }
  };

  const handleDeleteWorkshop = async () => {
    try {
      // Make a request to the API to delete the Workshop from the database
      const response = await fetch("/api/deleteworkshop", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: deleteWorkshopName,
          shelter: selectedDeleteShelter,
        }),
      });

      if (response.ok) {
        window.alert(`Successfully deleted Workshop!`);
        console.log("Workshop deleted successfully");
        // Optionally, you can redirect the user or perform other actions
        onSubmit(); // Notify parent component about the submission

        // Reset the form fields to their initial values
        setName("");
        setDesc("");
        setSelectedDateTime("");
        setSelectedShelter("");
      } else {
        console.error("Failed to delete Workshop:", response.statusText);
        // Handle the error
      }
    } catch (error) {
      console.error("Error deleting Workshop:", error.message);
      // Handle the error
    }
  };

  return (
    <div className={styles.updateEvent}>
      <div className={`${styles.updateEventSection} ${styles.updateSection}`}>
        <h2>Update Workshop</h2>
        <div>
          <label className={styles.label}>Select or Add Workshop:</label>
          <select
            className={styles.input}
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              handleExistingWorkshopSelect(e.target.value);
            }}
            placeholder="Insert Workshop Name"
          >
            {/* Mapping over existing Workshops to create options */}
            {[
              ...new Set(existingWorkshops.map((Workshop) => Workshop.name)),
            ].map((uniqueName) => (
              <option key={uniqueName} value={uniqueName}>
                {uniqueName}
              </option>
            ))}
            {/* Option to add a new Workshop */}
            <option value="">Add New Workshop</option>
          </select>
          {/* Render input field for new Workshop name when "Add New Workshop" is selected */}
          {name === "" && (
            <div>
              <label className={styles.label}>New Workshop Name:</label>
              <input
                className={styles.input}
                type="text"
                value={newWorkshopName}
                onChange={handleNewWorkshopNameChange}
                placeholder="Insert New Workshop Name"
              />
            </div>
          )}
        </div>
        <div>
          <label className={styles.label}>Description:</label>
          <input
            className={styles.input}
            type="text"
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Add description (Max 100 Characters)"
          />
        </div>
        <div>
          <select
            className={styles.input}
            id="date"
            value={selectedDateTime}
            onChange={handleDateTimeChange}
          >
            <option value="" disabled>
              Select Date and Time
            </option>
            {availableDateTimes.map((dateTime) => (
              <option key={dateTime} value={dateTime}>
                {formatWorkshopDate(dateTime)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={styles.label}>Select Pet Shelter: </label>
          <select
            className={styles.input}
            id="shelter"
            value={selectedShelter}
            onChange={handleShelterChange}
          >
            <option value="">Select a shelter</option>
            {shelters.map((shelter) => (
              <option key={shelter.shelterID} value={shelter.shelterID}>
                {shelter.name}
              </option>
            ))}
          </select>
        </div>
        <button className={styles.button} type="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <div
        className={`${styles.updateWorkshopSection} ${styles.deleteSection}`}
      >
        <h2>Delete Workshop</h2>
        <div>
          <label className={styles.label}>Select Workshop to Delete:</label>
          <select
            className={styles.input}
            value={deleteWorkshopName}
            onChange={(e) => handleDeleteWorkshopSelect(e.target.value)}
          >
            <option value="" disabled>
              Select an Workshop
            </option>
            {[
              ...new Set(existingWorkshops.map((Workshop) => Workshop.name)),
            ].map((uniqueName) => (
              <option key={uniqueName} value={uniqueName}>
                {uniqueName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={styles.label}>Select Shelter:</label>
          <select
            className={styles.input}
            value={selectedDeleteShelter}
            onChange={(e) => setSelectedDeleteShelter(e.target.value)}
          >
            <option value="" disabled>
              Select a Shelter
            </option>
            {validShelters.map((shelter) => (
              <option key={shelter.shelterID} value={shelter.shelterID}>
                {shelter.name}
              </option>
            ))}
          </select>
        </div>
        <button
          className={styles.button}
          type="button"
          onClick={handleDeleteWorkshop}
        >
          Delete Workshop
        </button>
      </div>
    </div>
  );
};

export default UpdateWorkshop;
