import query from "../../lib/query";

export default async function handler(req, res) {
  try {
    // Get user information from the request (assuming you have user authentication)
    const { userID } = req.query;

    console.log("api/purchase userID: ", userID);

    // Clear the entire shopping cart for the user
    await query("DELETE FROM cartitems WHERE cartFK = ?", [userID]);

    res.status(200).json({ message: "Purchase successful. Cart cleared." });
  } catch (error) {
    console.error("Error making a purchase:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
