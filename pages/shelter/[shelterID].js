// // pages/shelter/[shelterID].js
// import ShelterDetails from "../../components/ShelterDetails";

// const ShelterPage = ({ shelterID }) => {
//   return (
//     <div>
//       <h1>Shelter Details</h1>
//       <ShelterDetails shelterID={shelterID} />
//     </div>
//   );
// };

// export default ShelterPage;

// // Add getServerSideProps to fetch the shelterID from the URL
// export async function getServerSideProps(context) {
//   const { params } = context;
//   const shelterID = parseInt(params.shelterID, 10);

//   return {
//     props: {
//       shelterID: shelterID || null,
//     },
//   };
// }

// pages/shelter/[shelterID].js
import ShelterDetails from "../../components/ShelterDetails";
import Layout from "../../components/Layout";
import Head from "next/head";
import { query } from "../../lib/db";

const ShelterPage = ({ shelter }) => {
  if (!shelter) {
    // Handle the case when shelter details are not available
    return <p>Shelter not found</p>;
  }

  return (
    <div>
      <Head>
        <title>{shelter.name} - Your Pet Adoption Website</title>
      </Head>

      <Layout>
        <h1>Shelter Details</h1>
        <ShelterDetails shelter={shelter} />
      </Layout>
    </div>
  );
};

export default ShelterPage;

// Add getServerSideProps to fetch the shelter details based on shelterID
export async function getServerSideProps(context) {
  const { params } = context;
  const shelterID = params.shelterID;

  //   console.log("Shelter ID:", shelterID); // Add this line to check the shelterID

  try {
    // Fetch shelter details from the database
    const results = [
      {
        id: 1,
        name: "Maple Pet Shelter",
        pet_capacity: 50,
        desc: "A shelter in Toronto, ON",
      },
      {
        id: 2,
        name: "Rocky Mountain Animal Rescue",
        pet_capacity: 30,
        desc: "A shelter in Calgary, AB",
      },
      {
        id: 3,
        name: "Ocean View Pet Haven",
        pet_capacity: 30,
        desc: "A shelter in Vancouver, BC",
      },
    ];
    // const results = await query("SELECT * FROM shelters WHERE shelterID = 1");

    if (results.length > 0) {
      const shelter = results[shelterID - 1]; //Switch back to results[0] if database is working
      return {
        props: {
          shelter,
        },
      };
    } else {
      // Handle the case when shelterID doesn't match any shelter
      console.error(`Shelter with ID ${shelterID} not found`);
      return {
        notFound: true,
      };
    }
  } catch (error) {
    console.error("Error fetching shelter details:", error);
    return {
      props: {
        shelter: null,
      },
    };
  }
}
