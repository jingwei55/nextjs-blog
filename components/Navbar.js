// components/Navbar.js
import { useState } from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css"; // Import the CSS module

const Navbar = () => {
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);

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
        <Link href="/login">Login</Link>
        <div
          className={`${styles.viewDetails} ${
            viewDetailsOpen && styles.active
          }`}
          onClick={toggleViewDetails}
        >
          <button className={styles.viewDetailsButton}>View Details</button>
          {viewDetailsOpen && (
            <div className={styles.viewDetailsOptions}>
              <Link href="/shopping-cart">View Shopping Cart</Link>
              <Link href="/surrender-pet">Surrender a Pet</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
