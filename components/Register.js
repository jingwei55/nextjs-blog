// components/register.js
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../styles/Auth.module.css"; // Import the CSS module

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const [err, setError] = useState(null);

  const router = useRouter();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!inputs.username || !inputs.email || !inputs.password || !inputs.role) {
      setError("One or more of the fields are empty");
      return;
    }

    try {
      // Check if the username or email already exists in the employees table
      const userCheck = await axios.post("/api/auth/checkUser", {
        username: inputs.username,
        email: inputs.email,
        role: inputs.role,
      });

      if (userCheck.data.exists) {
        setError("Username or email already exists");
        return;
      }

      // Add the new user to the employees table
      const res = await axios.post("/api/auth/register", { ...inputs });
      // console.log(res);
      router.push("/login");
    } catch (err) {
      setError(err.response.data);
      console.error(err);
    }
  };

  return (
    <div className={styles.auth}>
      <h1 className={styles.title}>Register</h1>
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
          type="email"
          placeholder="email"
          name="email"
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
        <button type="button" className={styles.button} onClick={handleSubmit}>
          Register
        </button>
        {err && <p className={styles.error}>{err}</p>}
        <span className={styles.span}>
          Do you have an account? <Link href="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
