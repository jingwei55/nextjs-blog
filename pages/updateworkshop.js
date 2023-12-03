// pages/updateWorkshop.js

import Head from "next/head";
import React from "react";
import Layout from "../components/Layout";
import UpdateWorkshop from "../components/UpdateWorkshop";

const UpdateWorkshopPage = () => {
  return (
    <div>
      <Head>
        <title>Update Workshop Item - Your Pet Adoption Website</title>
      </Head>
      <Layout>
        <main>
          <UpdateWorkshop />
        </main>
      </Layout>
    </div>
  );
};

export default UpdateWorkshopPage;
