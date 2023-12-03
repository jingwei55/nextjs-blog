// pages/AttendWorkshop.js
import Head from "next/head";
import AttendWorkshop from "../components/AttendWorkshop";
import Layout from "../components/Layout";

const AttendWorkshopPage = () => {
  return (
    <div>
      <Head>
        <title>AttendWorkshop - Your Pet Adoption Website</title>
      </Head>

      <Layout>
        {/* Main content based on the route */}
        <main>
          <AttendWorkshop /> {/* Display AttendWorkshop */}
        </main>
      </Layout>
    </div>
  );
};

export default AttendWorkshopPage;
