// pages/login.js
import Head from "next/head";
import Login from "../components/Login";
import Layout from "../components/Layout";

const LoginPage = () => {
  return (
    <div>
      <Head>
        <title>LoginPage - Your Pet Adoption Website</title>
      </Head>

      <Layout>
        {/* Main content based on the route */}
        <main>
          <Login /> {/* Display pets */}
        </main>
      </Layout>
    </div>
  );
};

export default LoginPage;
