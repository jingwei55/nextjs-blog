// pages/index.js
import Head from "next/head";
import Navbar from "../components/Navbar";
import Pets from "../components/Pets";
import Events from "../components/events";
import Workshops from "../components/Workshops";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Your Pet Adoption Website</title>
        <meta
          name="description"
          content="Your pet adoption website description"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      {/* Main content based on the route */}
      <main>
        {/* <Pets /> Default content on the home page */}
        {/* <Events /> Display events */}
        {/* <Workshops /> Display workshops */}
        Welcome to Fauget Pet Shelter and Care!
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
