// pages/shop.js
import Head from "next/head";
import Shop from "../components/Shop";
import Layout from "../components/Layout";

const ShopPage = () => {
  return (
    <div>
      <Head>
        <title>Shop - Your Pet Adoption Website</title>
      </Head>

      <Layout>
        {/* Main content based on the route */}
        <main>
          <Shop /> {/* Display shop */}
        </main>
      </Layout>
    </div>
  );
};

export default ShopPage;
