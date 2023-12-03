// pages/updateshop.js

import Head from "next/head";
import React from "react";
import Layout from "../components/Layout";
import UpdateShop from "../components/UpdateShop";

const UpdateShopPage = () => {
  return (
    <div>
      <Head>
        <title>Update Shop Item - Your Pet Adoption Website</title>
      </Head>
      <Layout>
        <main>
          <UpdateShop />
        </main>
      </Layout>
    </div>
  );
};

export default UpdateShopPage;
