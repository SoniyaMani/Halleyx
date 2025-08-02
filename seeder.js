const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");

mongoose.connect("mongodb://localhost:27017/ecommerce");

async function seedAdmin() {
  const existing = await User.findOne({ email: "admin@example.com" });
  if (existing) {
    console.log("Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);
  await User.create({
    name: "Admin",
    email: "admin@example.com",
    password: hashedPassword,
    role: "admin"
  });

  console.log("✅ Admin user created");
  process.exit();
}

seedAdmin();
