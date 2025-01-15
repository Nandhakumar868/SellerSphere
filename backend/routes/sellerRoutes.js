const express = require("express");
const router = express.Router();
const { getSellers, addSeller } = require("../controllers/sellerController");

// Route to fetch sellers
router.get("/", getSellers);

// Route to add a seller (for testing purposes)
router.post("/", addSeller);

module.exports = router;
