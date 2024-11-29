const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");

const router = express.Router();

// Get All Users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ count: users.length, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Add a User
router.post("/", async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const newUser = new User({ name, email, password, role, status });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "Failed to save user" });
  }
});

// Delete a User
router.delete("/:id", async (req, res) => {
  const userId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// Update a User
router.put("/:id", async (req, res) => {
  const userId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  if (!Object.keys(req.body).length) {
    return res.status(400).json({ error: "Request body cannot be empty" });
  }

  const allowedUpdates = ["name", "email", "password", "role", "status"];
  const updatedData = Object.keys(req.body).reduce((acc, key) => {
    if (allowedUpdates.includes(key)) acc[key] = req.body[key];
    return acc;
  }, {});

  if (!Object.keys(updatedData).length) {
    return res.status(400).json({ error: "No valid fields provided for update" });
  }

  if (updatedData.status && !["active", "inactive"].includes(updatedData.status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

module.exports = router;
