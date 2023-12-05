// pages/index.js
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Fauget Pet Shelter and Care</title>
        <meta
          name="description"
          content="Your trusted platform for pet adoption and care resources"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      {/* Main content based on the route */}
      <main>
        <section className={styles.main}>
          <div className={styles.mainContent}>
            <h1>Welcome to Fauget Pet Shelter and Care!</h1>
            <p>Your trusted platform for pet adoption and care resources.</p>
          </div>
        </section>

        <section className={styles.about}>
          <div className={styles.aboutContent}>
            <h2>Our Mission</h2>
            <p>
              Helping pets find loving homes and providing resources for pet
              owners to ensure the well-being of their furry friends.
            </p>
          </div>
        </section>

        <section className={styles.stats}>
          <div className={styles.statsContent}>
            <h2>Pet Adoption Statistics</h2>
            <p>
              Every 13 seconds, a healthy, adoptable dog or cat is euthanized in
              a U.S. shelter. Our platform aims to reduce this number by
              connecting pets with caring owners.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
