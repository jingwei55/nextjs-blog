// testConnection.js
import query from "./lib/query"; // Adjust the path accordingly

const testConnection = async () => {
  try {
    // Try executing a simple query to check the connection
    const [rows] = await query("SELECT 1");
    console.log("Database connection is successful:", rows);
  } catch (error) {
    console.error("Error testing database connection:", error);
  }
};

// Call the function to test the connection
testConnection();
