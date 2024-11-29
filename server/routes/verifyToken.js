const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/verifyToken', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).send('No token provided');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Token verification failed:', err);
      return res.status(401).send('Invalid or expired token');
    }

    res.json({ role: decoded.role }); // Send back the user's role
  });
});

module.exports = router;
