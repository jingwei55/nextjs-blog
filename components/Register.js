// // components/register.js
// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import axios from "axios";
// import styles from "../styles/Auth.module.css"; // Import the CSS module

// const Register = () => {
//   const [inputs, setInputs] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const [selectedRole, setSelectedRole] = useState(""); // New state for selected role
//   const [err, setError] = useState(null);

//   const router = useRouter();

//   const handleChange = (e) => {
//     setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleRoleChange = (e) => {
//     setSelectedRole(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate input fields
//     if (
//       !inputs.username ||
//       !inputs.email ||
//       !inputs.password ||
//       !selectedRole
//     ) {
//       setError("One or more of the fields are empty");
//       return;
//     }

//     try {
//       // Check if the username or email already exists
//       const userCheck = await axios.post("/api/auth/checkUser", {
//         username: inputs.username,
//         email: inputs.email,
//       });

//       if (userCheck.data.exists) {
//         setError("Username or email already exists");
//         return;
//       }

//       // Include the selected role in the registration data
//       const res = await axios.post("/api/auth/register", {
//         ...inputs,
//         role: selectedRole,
//       });
//       console.log(res);
//       router.push("/login");
//     } catch (err) {
//       setError(err.response.data);
//       console.log(err);
//     }
//   };

//   return (
//     <div className={styles.auth}>
//       <h1 className={styles.title}>Register</h1>
//       <form className={styles.form}>
//         <input
//           className={styles.input}
//           required
//           type="text"
//           placeholder="username"
//           name="username"
//           onChange={handleChange}
//         />
//         <input
//           className={styles.input}
//           required
//           type="email"
//           placeholder="email"
//           name="email"
//           onChange={handleChange}
//         />
//         <input
//           className={styles.input}
//           required
//           type="password"
//           placeholder="password"
//           name="password"
//           onChange={handleChange}
//         />

//         {/* Radio buttons for selecting role */}
//         <div className={styles.radioGroup}>
//           <label className={styles.radioLabel}>
//             <input
//               className={styles.input}
//               type="radio"
//               name="role"
//               value="employee"
//               checked={selectedRole === "employee"}
//               onChange={handleRoleChange}
//             />
//             Employee
//           </label>
//           <label className={styles.radioLabel}>
//             <input
//               className={styles.input}
//               type="radio"
//               name="role"
//               value="member"
//               checked={selectedRole === "member"}
//               onChange={handleRoleChange}
//             />
//             Member
//           </label>
//         </div>
//         <button type="button" className={styles.button} onClick={handleSubmit}>
//           Register
//         </button>
//         {err && <p className={styles.error}>{err}</p>}
//         <span className={styles.span}>
//           Do you have an account? <Link href="/login">Login</Link>
//         </span>
//       </form>
//     </div>
//   );
// };

// export default Register;

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
  });
  const [err, setError] = useState(null);

  const router = useRouter();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!inputs.username || !inputs.email || !inputs.password) {
      setError("One or more of the fields are empty");
      return;
    }

    try {
      // Check if the username or email already exists in the employees table
      const userCheck = await axios.post("/api/auth/checkUser", {
        username: inputs.username,
        email: inputs.email,
      });

      if (userCheck.data.exists) {
        setError("Username or email already exists");
        return;
      }

      // Add the new user to the employees table
      await axios.post("/api/auth/register", { ...inputs });

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
