// pages/surrenderpet.js
import Head from "next/head";
import React from "react";
import PetTypeDropdown from "../components/PetTypeDropdown";
import Layout from "../components/Layout";

const SurrenderPetPage = () => {
  const handleSurrenderSubmission = () => {
    // Handle any post-submission logic here
    // For example, you might want to redirect the user or update the UI
    console.log("Pet surrendered. Additional logic can be added here.");
  };

  return (
    <div>
      <Head>
        <title>SurrenderPet - Your Pet Adoption Website</title>
      </Head>

      <Layout>
        {/* Main content based on the route */}
        <main>
          <h1>Surrender a Pet</h1>
          <form className="add">
            <PetTypeDropdown onSubmit={handleSurrenderSubmission} />
            <div className="picture">
              <img
                src="../img/surrender-pet.png"
                alt="Pet Image"
                style={{ width: "80%", height: "auto" }}
              />
            </div>
          </form>
        </main>
      </Layout>
    </div>
  );
};

export default SurrenderPetPage;
