const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  if (!token) {
    console.log('No token provided'); 
    return res.sendStatus(401);
  }
  const jwtSecretKey = process.env.JWT_SECRET;
  jwt.verify(token, jwtSecretKey, (err, user) => {
    if (err) {
      console.log('Token verification failed:', err); 
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;





