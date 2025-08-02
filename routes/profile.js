const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String
});

const Profile = mongoose.model('Profile', profileSchema);

// POST /api/profile — Save or update profile
router.post('/', async (req, res) => {
  try {
    const { email, firstName, lastName } = req.body;
    const existing = await Profile.findOne({ email });

    if (existing) {
      existing.firstName = firstName;
      existing.lastName = lastName;
      await existing.save();
      return res.json({ message: "Profile updated successfully" });
    }

    const newProfile = new Profile({ firstName, lastName, email });
    await newProfile.save();
    res.status(201).json({ message: "Profile created" });
  } catch (err) {
    res.status(500).json({ message: "Error saving profile", error: err.message });
  }
});

module.exports = router;
