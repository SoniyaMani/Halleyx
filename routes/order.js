const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// GET all orders (for now - no authentication or filtering)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Server Error while fetching orders' });
  }
});

module.exports = router;
