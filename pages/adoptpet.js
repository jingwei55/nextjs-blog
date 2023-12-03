// pages/AdoptedPets.js
import Head from "next/head";
import AdoptedPets from "../components/AdoptedPets";
import Layout from "../components/Layout";

const AdoptedPetsPage = () => {
  return (
    <div>
      <Head>
        <title>AdoptedPets - Your Pet Adoption Website</title>
      </Head>

      <Layout>
        {/* Main content based on the route */}
        <main>
          <AdoptedPets /> {/* Display AdoptedPets */}
        </main>
      </Layout>
    </div>
  );
};

export default AdoptedPetsPage;
