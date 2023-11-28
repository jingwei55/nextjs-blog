// pages/login.js
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Auth.module.css"; // Import the CSS module

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [selectedRole, setSelectedRole] = useState("");
  const [err, setError] = useState(null);

  const router = useRouter();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate login logic
      console.log({ ...inputs, role: selectedRole });
      router.push("/");
    } catch (err) {
      setError("Invalid credentials");
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
        <div className="radio-group">
          <label className="radio-label">
            <input
              className={styles.input}
              type="radio"
              name="role"
              value="employee"
              checked={selectedRole === "employee"}
              onChange={handleRoleChange}
            />
            Employee
          </label>
          <label className="radio-label">
            <input
              className={styles.input}
              type="radio"
              name="role"
              value="member"
              checked={selectedRole === "member"}
              onChange={handleRoleChange}
            />
            Member
          </label>
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
