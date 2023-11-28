// pages/Shelter.js
import Head from "next/head";
import Shelter from "../components/Shelter";
import Layout from "../components/Layout";

const ShelterPage = () => {
  return (
    <div>
      <Head>
        <title>Shelter - Your Pet Adoption Website</title>
      </Head>

      <Layout>
        {/* Main content based on the route */}
        <main>
          <Shelter /> {/* Display pets */}
        </main>
      </Layout>
    </div>
  );
};

export default ShelterPage;
