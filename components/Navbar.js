// components/Navbar.js
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Navbar.module.css";
import { useRouter } from "next/router";

const Navbar = () => {
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [selectedShelter, setSelectedShelter] = useState(null); // Track the selected shelter
  const { isLoggedIn, logout, role } = useAuth();
  const router = useRouter(); // Initialize the router

  const toggleViewDetails = () => {
    setViewDetailsOpen(!viewDetailsOpen);
  };

  const handleSelectShelter = (shelterID) => {
    setSelectedShelter(shelterID);
  };

  const handleLogout = () => {
    // Perform logout actions (e.g., clear user session)
    logout();

    // Redirect to the home page
    router.push("/");
    window.alert("Logout successful!");
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
        {/* <Link href="/shelter">Shelter</Link> */}
        {/* Shelter dropdown */}
        {/* <div className={styles.dropdown}>
          <button className={styles.dropbtn}>Shelter</button>
          <div className={styles.dropdownContent}>
            <Shelter onSelectShelter={handleSelectShelter} />
          </div>
        </div> */}
        {isLoggedIn ? (
          <button className={styles.logout} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link href="/login">Login</Link>
        )}
        {isLoggedIn && role === "member" && (
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
                <Link href="/adoptpet">Adopted Pets</Link>
                <Link href="/attendevent">Events To Attend</Link>
                <Link href="/attendworkshop">Workshops To Attend</Link>
              </div>
            )}
          </div>
        )}
        {isLoggedIn && role === "employee" && (
          <div
            className={`${styles.viewDetails} ${
              viewDetailsOpen && styles.active
            }`}
            onClick={toggleViewDetails}
          >
            <button className={styles.viewDetailsButton}>View Details</button>
            {viewDetailsOpen && (
              <div className={styles.viewDetailsOptions}>
                <Link href="/updateshop">Update Shop</Link>
                <Link href="/updateevent">Update Events</Link>
                <Link href="/updateworkshop">Update Workshops</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
