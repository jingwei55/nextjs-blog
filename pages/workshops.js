// pages/workshops.js
import Head from "next/head";
import Workshops from "../components/Workshops";
import Layout from "../components/Layout";

const WorkshopsPage = () => {
  return (
    <div>
      <Head>
        <title>Workshops - Your Pet Adoption Website</title>
      </Head>

      <Layout>
        {/* Main content based on the route */}
        <main>
          <Workshops /> {/* Display workshops */}
        </main>
      </Layout>
    </div>
  );
};

export default WorkshopsPage;
