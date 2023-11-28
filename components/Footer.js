// components/Footer.js
import React from "react";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="footer-content">
        <div className="logo">
          {/* Insert your logo image here */}
          {/* <img src="/img/logo.png" alt="Logo" /> */}
        </div>
        <div className="made-with-nextjs">Made with Next.js</div>
      </div>
    </footer>
  );
};

export default Footer;
