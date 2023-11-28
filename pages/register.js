// pages/Register.js
import Head from "next/head";
import Register from "../components/Register";
import Layout from "../components/Layout";

const RegisterPage = () => {
  return (
    <div>
      <Head>
        <title>RegisterPage - Your Pet Adoption Website</title>
      </Head>

      <Layout>
        {/* Main content based on the route */}
        <main>
          <Register /> {/* Display pets */}
        </main>
      </Layout>
    </div>
  );
};

export default RegisterPage;
