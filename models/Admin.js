const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: String,
  password: String, // must be hashed using bcrypt
});

module.exports = mongoose.model('Admin', adminSchema);
