// components/UpdateEvent.js

import React, { useState, useEffect } from "react";
import styles from "../styles/UpdateEvent.module.css"; // Import the CSS module
import { useAuth } from "../context/AuthContext"; // Import the AuthContext

const UpdateEvent = ({ onSubmit }) => {
  const { userID } = useAuth();
  // State variables for form inputs
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [availableDateTimes, setAvailableDateTimes] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [shelters, setShelters] = useState([]);
  const [existingEvents, setExistingEvents] = useState([]); // State for existing items
  const [newEventName, setNewEventName] = useState("");
  const [selectedShelter, setSelectedShelter] = useState("");
  const [validShelters, setValidShelters] = useState([]); // New state for valid shelter names

  // State variables for Delete Event
  const [deleteEventName, setDeleteEventName] = useState("");
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
    fetch(`/api/event?memberID=${userID}`)
      .then((response) => response.json())
      .then((data) => setExistingEvents(data))
      .catch((error) => console.error("Error fetching shelters:", error));
  }, []);
  // console.log("shelter Data:", shelters);
  // console.log("Event Data:", existingEvents);

  // Function to handle selection of an existing Event
  const handleExistingEventSelect = (selectedEventName) => {
    // Find the selected Event in the existing Events array
    const selectedEvent = existingEvents.find(
      (event) => event.name === selectedEventName
    );

    // Update the state with the details of the selected Event
    if (selectedEvent) {
      setName(selectedEvent.name);
      setDesc(selectedEvent.desc);
      setSelectedDateTime(selectedDateTime);
    }
  };

  const handleNewEventNameChange = (e) => {
    const value = e.target.value;
    setNewEventName(value);
    handleExistingEventSelect(value);
  };

  const handleDateTimeChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedDateTime(selectedValue);
  };

  const handleShelterChange = (event) => {
    const selectedShelterId = event.target.value;
    setSelectedShelter(selectedShelterId);
  };

  const formatEventDate = (dateString) => {
    const eventDate = new Date(dateString);
    return (
      eventDate.toISOString().split("T")[0] +
      " " +
      eventDate.toLocaleTimeString()
    );
  };

  const handleDeleteEventSelect = (selectedEventName) => {
    // Find the selected Event in the existing Events array
    const selectedEvent = existingEvents.find(
      (event) => event.name === selectedEventName
    );

    // Update the state with the details of the selected Event
    if (selectedEvent) {
      setDeleteEventName(selectedEvent.name);
      setSelectedDeleteShelter("");
      // Update the list of valid shelters based on the selected event
      setValidShelters(
        shelters.filter((shelter) => shelter.shelterID === selectedEvent.ES_FK)
      );
    }
  };

  const handleSubmit = async () => {
    try {
      // Make a request to the API to add the pet to the database
      const response = await fetch("/api/updateevent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name || newEventName,
          desc,
          date: selectedDateTime,
          shelter: selectedShelter, // Include the selected shelter in the request
        }),
      });

      if (response.ok) {
        window.alert(`Successfully updated/added Event!`);
        // console.log("Event added to Event successfully");
        // Optionally, you can redirect the user or perform other actions
        onSubmit(); // Notify parent component about the submission

        // Reset the form fields to their initial values
        setName("");
        setDesc("");
        setDate("");
        setSelectedShelter("");
      } else {
        console.error("Failed to update event:", response.statusText);
        // Handle the error
      }
    } catch (error) {
      console.error("Error updating event:", error.message);
      // Handle the error
    }
  };

  const handleDeleteEvent = async () => {
    try {
      // Make a request to the API to delete the event from the database
      const response = await fetch("/api/deleteevent", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: deleteEventName,
          shelter: selectedDeleteShelter,
        }),
      });

      if (response.ok) {
        window.alert(`Successfully deleted Event!`);
        // console.log("Event deleted successfully");
        // Optionally, you can redirect the user or perform other actions
        onSubmit(); // Notify parent component about the submission

        // Reset the form fields to their initial values
        setName("");
        setDesc("");
        setSelectedDateTime("");
        setSelectedShelter("");
      } else {
        console.error("Failed to delete event:", response.statusText);
        // Handle the error
      }
    } catch (error) {
      console.error("Error deleting event:", error.message);
      // Handle the error
    }
  };

  return (
    <div className={styles.updateEvent}>
      <div className={`${styles.updateEventSection} ${styles.updateSection}`}>
        <h2>Update Event</h2>
        <div>
          <label className={styles.label}>Select or Add Event:</label>
          <select
            className={styles.input}
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              handleExistingEventSelect(e.target.value);
            }}
            placeholder="Insert Event Name"
          >
            {/* Mapping over existing Events to create options */}
            {[...new Set(existingEvents.map((event) => event.name))].map(
              (uniqueName) => (
                <option key={uniqueName} value={uniqueName}>
                  {uniqueName}
                </option>
              )
            )}
            {/* Option to add a new Event */}
            <option value="">Add New Event</option>
          </select>
          {/* Render input field for new event name when "Add New Event" is selected */}
          {name === "" && (
            <div>
              <label className={styles.label}>New Event Name:</label>
              <input
                className={styles.input}
                type="text"
                value={newEventName}
                onChange={handleNewEventNameChange}
                placeholder="Insert New Event Name"
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
                {formatEventDate(dateTime)}
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
      <div className={`${styles.updateEventSection} ${styles.deleteSection}`}>
        <h2>Delete Event</h2>
        <div>
          <label className={styles.label}>Select Event to Delete:</label>
          <select
            className={styles.input}
            value={deleteEventName}
            onChange={(e) => handleDeleteEventSelect(e.target.value)}
          >
            <option value="" disabled>
              Select an Event
            </option>
            {[...new Set(existingEvents.map((event) => event.name))].map(
              (uniqueName) => (
                <option key={uniqueName} value={uniqueName}>
                  {uniqueName}
                </option>
              )
            )}
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
          onClick={handleDeleteEvent}
        >
          Delete Event
        </button>
      </div>
    </div>
  );
};

export default UpdateEvent;
