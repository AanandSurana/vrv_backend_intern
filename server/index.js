// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const authRoutes = require('./routes/auth');
// const verifyTokenRoute = require('./routes/verifyToken'); // Update the path based on your file structure
// const User = require('./models/User')

// const app = express();
// const PORT = process.env.PORT || 5000;


// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api', verifyTokenRoute);


// app.get("/api/users", async (req, res) => {
//     try {
//       const users = await User.find(); // Retrieve all users
//       res.status(200).json({ count: users.length, users }); // Include a count of users
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       res.status(500).json({ error: "Failed to fetch users" });
//     }
//   });
  
//   // Add User
//   app.post("/api/users", async (req, res) => {
//     try {
//       const { name, email, password, role, status } = req.body;
  
//       // Check if the email already exists in the database
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({ error: "Email already exists" });
//       }
  
//       const newUser = new User({ name, email, password, role, status });
//       const savedUser = await newUser.save();
  
//       res.status(201).json(savedUser); // Return the full user object
//     } catch (error) {
//       console.error("Error saving user:", error);
//       res.status(500).json({ error: "Failed to save user" });
//     }
//   });
  
//   // Delete a User
//   app.delete("/api/users/:id", async (req, res) => {
//     const userId = req.params.id;
  
//     // Validate ObjectId
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ error: "Invalid user ID" });
//     }
  
//     try {
//       const deletedUser = await User.findByIdAndDelete(userId);
  
//       if (!deletedUser) {
//         return res.status(404).json({ message: "User not found" });
//       }
  
//       res.status(200).json({ message: "User deleted successfully" });
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       res.status(500).json({ error: "Failed to delete user" });
//     }
//   });
  
//   // Update a User
//   // app.put("/api/users/:id", async (req, res) => {
//   //   const userId = req.params.id;
  
//   //   // Validate ObjectId
//   //   if (!mongoose.Types.ObjectId.isValid(userId)) {
//   //     return res.status(400).json({ error: "Invalid user ID" });
//   //   }
  
//   //   // Only allow certain fields to be updated
//   //   const allowedUpdates = ["name", "email", "password", "role", "status"];
//   //   const updatedData = Object.keys(req.body).reduce((acc, key) => {
//   //     if (allowedUpdates.includes(key)) acc[key] = req.body[key];
//   //     return acc;
//   //   }, {});
  
//   //   try {
//   //     const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
//   //       new: true, // Return the updated user
//   //       runValidators: true, // Ensure validation on update
//   //     });
  
//   //     if (!updatedUser) {
//   //       return res.status(404).json({ message: "User not found" });
//   //     }
  
//   //     res.status(200).json(updatedUser);
//   //   } catch (error) {
//   //     console.error("Error updating user:", error);
//   //     res.status(500).json({ error: "Failed to update user" });
//   //   }
//   // });
//   app.put("/api/users/:id", async (req, res) => {
//     const userId = req.params.id;
  
//     // Validate ObjectId
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ error: "Invalid user ID" });
//     }
  
//     // Validate request body
//     if (!Object.keys(req.body).length) {
//       return res.status(400).json({ error: "Request body cannot be empty" });
//     }
  
//     // Only allow certain fields to be updated
//     const allowedUpdates = ["name", "email", "password", "role", "status"];
//     const updatedData = Object.keys(req.body).reduce((acc, key) => {
//       if (allowedUpdates.includes(key)) acc[key] = req.body[key];
//       return acc;
//     }, {});
  
//     // Ensure valid update data
//     if (!Object.keys(updatedData).length) {
//       return res.status(400).json({ error: "No valid fields provided for update" });
//     }
  
//     // Validate status (since this is predefined)
//     if (updatedData.status && !["active", "inactive"].includes(updatedData.status)) {
//       return res.status(400).json({ error: "Invalid status value" });
//     }
  
//     try {
//       const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
//         new: true, // Return the updated user
//         runValidators: true, // Ensure validation on update
//       });
  
//       if (!updatedUser) {
//         return res.status(404).json({ message: "User not found" });
//       }
  
//       res.status(200).json(updatedUser);
//     } catch (error) {
//       console.error("Error updating user:", error.message, error.stack);
//       res.status(500).json({ error: "Failed to update user" });
//     }
//   });
  


// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('Failed to connect to MongoDB:', err));

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const verifyTokenRoute = require("./routes/verifyToken");
const userRoutes = require("./routes/user"); // Import user routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", verifyTokenRoute);
app.use("/api/users", userRoutes); // Use user routes

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
