const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Make sure this path is correct

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  createUser();
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// Create a test user
async function createUser() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10); // default password

    const user = new User({
      name: 'Admin User',              // ✅ name is required
      email: 'admin@example.com',      // admin login
      password: hashedPassword,
      role: 'admin'                    // role: customer or admin
    });

    await user.save();
    console.log('✅ Test user created');
    mongoose.connection.close(); // Close DB connection
  } catch (error) {
    console.error('❌ Error creating test user:', error);
  }
}
