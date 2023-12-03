// components/Activities.js
import React, { useState, useEffect } from "react";

const Activities = ({ userID }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Fetch activities data from the API endpoint for the specific member
        const response = await fetch(`/api/activities?userID=${userID}`);
        const data = await response.json();
        setActivities(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, [userID]);

  if (loading) {
    return <p>Loading activities...</p>;
  }

  return (
    <div>
      <h2>Your Activities</h2>
      {activities.length === 0 ? (
        <p>No activities to display.</p>
      ) : (
        <ul>
          {activities.map((activity) => (
            <li key={activity.id}>
              <strong>{activity.name}</strong> - {activity.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Activities;
