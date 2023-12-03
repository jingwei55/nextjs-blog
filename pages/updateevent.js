// pages/updateEvent.js

import Head from "next/head";
import React from "react";
import Layout from "../components/Layout";
import UpdateEvent from "../components/UpdateEvent";

const UpdateEventPage = () => {
  return (
    <div>
      <Head>
        <title>Update Event Item - Your Pet Adoption Website</title>
      </Head>
      <Layout>
        <main>
          <UpdateEvent />
        </main>
      </Layout>
    </div>
  );
};

export default UpdateEventPage;
