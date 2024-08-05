const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth'); 

router.get('/', authenticateToken, (req, res) => {
  console.log('Received request to get user profile');
  console.log('Authenticated user:', req.user); 
  const { username, role } = req.user;
  res.json({ username, role });
});

module.exports = router; 
