const Seller = require("../models/Seller");

// Fetch sellers based on search query
const getSellers = async (req, res) => {
  try {
    const { query } = req.query || {}; // Fallback to empty object if undefined
    const sellers = query
      ? await Seller.find({ name: { $regex: query, $options: "i" } })
      : await Seller.find();

    if (!sellers.length) {
      return res.status(404).json({ message: "No sellers found" });
    }

    res.json(sellers);
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// Add sample seller (for testing purposes)
const addSeller = async (req, res) => {
  try {
    const { name, rating, reviews } = req.body;
    const seller = new Seller({ name, rating, reviews });
    await seller.save();
    res.status(201).json(seller);
  } catch (error) {
    res.status(400).json({ message: "Error adding seller" });
  }
};

module.exports = { getSellers, addSeller };
