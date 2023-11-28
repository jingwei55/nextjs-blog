// pages/surrenderpet.js
import Head from "next/head";
import SurrenderPet from "../components/SurrenderPet";
import Layout from "../components/Layout";

const surrenderPetPage = () => {
  return (
    <div>
      <Head>
        <title>SurrenderPet - Your Pet Adoption Website</title>
      </Head>

      <Layout>
        {/* Main content based on the route */}
        <main>
          <SurrenderPet /> {/* Display surrenderpet */}
        </main>
      </Layout>
    </div>
  );
};

export default surrenderPetPage;
