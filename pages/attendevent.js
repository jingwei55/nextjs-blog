// pages/AttendEvent.js
import Head from "next/head";
import AttendEvent from "../components/AttendEvent";
import Layout from "../components/Layout";

const AttendEventPage = () => {
  return (
    <div>
      <Head>
        <title>AttendEvent - Your Pet Adoption Website</title>
      </Head>

      <Layout>
        {/* Main content based on the route */}
        <main>
          <AttendEvent /> {/* Display AttendEvent */}
        </main>
      </Layout>
    </div>
  );
};

export default AttendEventPage;
