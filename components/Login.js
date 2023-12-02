// components/login.js
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook
import styles from "../styles/Auth.module.css"; // Import the CSS module

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [err, setError] = useState(null);
  const { login } = useAuth(); // Use the useAuth hook
  const router = useRouter();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!inputs.username || !inputs.password || !inputs.role) {
      setError("One or more of the fields are empty");
      return;
    }

    try {
      // Send a request to the authentication API route
      const response = await axios.post("/api/auth/login", {
        username: inputs.username,
        password: inputs.password,
        role: inputs.role,
      });

      // Check if the login was successful
      if (response.status === 200) {
        // Perform the login action using the login function from useAuth
        // const userRole = response.data.role;
        login(inputs.role);
        // Redirect to the home page or another page upon successful login
        router.push("/");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setError("An error occurred during login");
    }
  };

  return (
    <div className={styles.auth}>
      <h1 className={styles.title}>Login</h1>
      <form className={styles.form}>
        <input
          className={styles.input}
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          className={styles.input}
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        {/* Dropdown list for selecting role */}
        <div>
          <label className={styles.label}>Select user type:</label>
          <select
            id="role"
            name="role"
            value={inputs.role}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">Select</option>
            <option value="employee">Employee</option>
            <option value="member">Member</option>
          </select>
        </div>
        <button className={styles.button} onClick={handleSubmit}>
          Login
        </button>
        {err && <p className={styles.p}>{err}</p>}
        <span className={styles.span}>
          Don't you have an account? <Link href="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
