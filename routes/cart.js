const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Step 1.1: Cart Schema define pannunga
const CartSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
});

// Step 1.2: Cart model create pannunga
const Cart = mongoose.model("Cart", CartSchema);

// Step 1.3: POST /api/cart → Add item to cart
router.post("/", async (req, res) => {
  try {
    const { name, price, image } = req.body;
    const newItem = new Cart({ name, price, image });
    await newItem.save();
    res.status(201).json({ message: "Item added to cart" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add item to cart" });
  }
});

// Step 1.4: GET /api/cart → Get all items
router.get("/", async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
});

module.exports = router;
