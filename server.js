const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express(); // ✅ Define app first

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce')
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((error) => console.error('❌ MongoDB connection error:', error));

// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart'); // Step 2.1
app.use('/api/cart', cartRoutes); 
const orderRoutes = require('./routes/order');
app.use('/api/orders', orderRoutes); 
const profileRoutes = require('./routes/profile');
app.use('/api/profile', profileRoutes);
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);




// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); // ✅ Now it will not throw ReferenceError

// Optional root route
app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce Backend API');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
