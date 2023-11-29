// // components/Navbar.js
// import { useState } from "react";
// import Link from "next/link";
// import { useAuth } from "../context/AuthContext";
// import styles from "../styles/Navbar.module.css";

// const Navbar = () => {
//   const [viewDetailsOpen, setViewDetailsOpen] = useState(false);

//   const toggleViewDetails = () => {
//     setViewDetailsOpen(!viewDetailsOpen);
//   };
//   const { isAuthenticated } = useAuth();

//   return (
//     <nav className={styles.navbar}>
//       <div className={styles.logo}>
//         {/* <img src="../img/surrender-pet.png" alt="Logo" /> */}
//       </div>
//       <div className={styles.navLinks}>
//         <Link href="/">Home</Link>
//         <Link href="/pets">Pets</Link>
//         <Link href="/events">Events</Link>
//         <Link href="/workshops">Workshops</Link>
//         <Link href="/shop">Shop</Link>
//         <Link href="/shelter">Shelter</Link>
//         <Link href="/login">Login</Link> {/* Link to your login page */}
//       </div>
//       <div
//         className={`${styles.viewDetails} ${viewDetailsOpen && styles.active}`}
//         onClick={toggleViewDetails}
//       >
//         <button className={styles.viewDetailsButton}>View Details</button>
//         {viewDetailsOpen && (
//           <div className={styles.viewDetailsOptions}>
//             <Link href="/cart">View Shopping Cart</Link>
//             <Link href="/surrenderpet">Surrender a Pet</Link>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// components/Navbar.js
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  const toggleViewDetails = () => {
    setViewDetailsOpen(!viewDetailsOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        {/* <img src="../img/surrender-pet.png" alt="Logo" /> */}
      </div>
      <div className={styles.navLinks}>
        <Link href="/">Home</Link>
        <Link href="/pets">Pets</Link>
        <Link href="/events">Events</Link>
        <Link href="/workshops">Workshops</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/shelter">Shelter</Link>
        {isLoggedIn ? (
          <button className={styles.logout} onClick={logout}>
            Logout
          </button>
        ) : (
          <Link href="/login">Login</Link>
        )}
        {isLoggedIn && (
          <div
            className={`${styles.viewDetails} ${
              viewDetailsOpen && styles.active
            }`}
            onClick={toggleViewDetails}
          >
            <button className={styles.viewDetailsButton}>View Details</button>
            {viewDetailsOpen && (
              <div className={styles.viewDetailsOptions}>
                <Link href="/cart">View Shopping Cart</Link>
                <Link href="/surrenderpet">Surrender a Pet</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
