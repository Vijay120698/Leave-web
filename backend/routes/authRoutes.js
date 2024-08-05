const express = require('express');
const { register, login, getLeaveBalance } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/balances',getLeaveBalance)

module.exports = router;
