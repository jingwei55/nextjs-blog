// pages/pets.js
import Head from "next/head";
import Pets from "../components/Pets";
import Layout from "../components/Layout";

const PetsPage = () => {
  return (
    <div>
      <Head>
        <title>Pets - Your Pet Adoption Website</title>
      </Head>

      <Layout>
        {/* Main content based on the route */}
        <main>
          <Pets /> {/* Display pets */}
        </main>
      </Layout>
    </div>
  );
};

export default PetsPage;
