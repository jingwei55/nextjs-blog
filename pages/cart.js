// pages/cart.js
import Head from "next/head";
import Cart from "../components/Cart";
import Layout from "../components/Layout";

const cartPage = () => {
  return (
    <div>
      <Head>
        <title>Cart - Your Pet Adoption Website</title>
      </Head>

      <Layout>
        {/* Main content based on the route */}
        <main>
          <Cart /> {/* Display Cart */}
        </main>
      </Layout>
    </div>
  );
};

export default cartPage;
