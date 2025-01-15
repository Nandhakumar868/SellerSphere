const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  reviews: [{ type: String }], // Array of reviews
});

module.exports = mongoose.model("Seller", sellerSchema);
