// pages/events.js
import Head from "next/head";
import Events from "../components/events";
import Layout from "../components/Layout";

const EventsPage = () => {
  return (
    <div>
      <Head>
        <title>Events - Your Pet Adoption Website</title>
      </Head>

      <Layout>
        {/* Main content based on the route */}
        <main>
          <Events /> {/* Display events */}
        </main>
      </Layout>
    </div>
  );
};

export default EventsPage;
