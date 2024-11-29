const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  const { name, email, password, role, status } = req.body;

  try {
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      role,
      status
    });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Login Route
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Check password
//     const isMatch = await user.matchPassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Generate JWT
//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
//       expiresIn: '1d',
//     });

//     res.status(200).json({
//       message: 'Logged in successfully',
//       token,
//       user: { id: user._id, name: user.name, email: user.email, role: user.role },
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }

  
// });

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Validate input fields
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
  
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the user is inactive
      if (user.status === 'inactive') {
        return res.status(403).json({
          message: 'Your account is inactive. Please contact your administrator.',
        });
      }
  
      // Verify password
      const isMatch = await user.matchPassword(password); // Assuming matchPassword is defined in your User schema
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' } // Token expiration time
      );
  
      // Respond with success
      res.status(200).json({
        message: 'Logged in successfully',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
  
  

module.exports = router;
