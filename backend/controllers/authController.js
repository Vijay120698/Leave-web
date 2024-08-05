const  db  = require('../models'); 
const User = db.User; 
const dbleave = db.LeaveRequest;
const bcrypt = require('bcrypt');
const { raw } = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const {email, username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, role,email });
    res.status(201).json(user);
  } catch (error) {
    console.log("error:  " , error.message);
    res.status(400).json({ error: error.message });
  }};

exports.login = async (req, res) => { 
  const { username, password } = req.body;
  try {
    console.log('Login attempt:', { username });
    const user = await User.findOne({ 
      where: { username } ,
    attributes:['username','password','role'],
    raw:true
  });
  console.log("user", user);
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log('Password mismatch');
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const jwtSecretKey = process.env.JWT_SECRET;
    const token = jwt.sign({ username: user.username, role: user.role }, jwtSecretKey, { expiresIn: '1h' });
    console.log('Login successful:', user);
    console.log(token)
    return res.json({ success: true, user: { username: user.username, role: user.role },
    token
    });
  } catch (error) {
    console.error('Login error:', error); 
    res.status(500).json({ success: false, message: 'Internal server error' });
  }};

// exports.getLeaveBalance = async (req, res) => {
//   try {
//     const users = await User.findAll({
//       where: { role: 'employee' }, 
//     });
//     const balances = await Promise.all(users.map(async (user) => {
//       const leaveRequests = await dbleave.findAll({ where: { username: user.username,status:'approved' } });
//       const leaveTaken = leaveRequests.length;
//       const leaveBalance = 12 - leaveTaken; 
//       return {
//         id: user.id,
//         username: user.username,
//         email: user.email,
//         balance: leaveBalance,
//         taken: leaveTaken,
//       };
//     }));
//     res.json(balances);
//   } catch (error) {
//     console.error('Error fetching leave balances:', error);
//     res.status(500).json({ error: 'Failed to fetch leave balances' });
//   }};

exports.getLeaveBalance = async (req, res) => {
  try {
    // Fetch all users with the role 'employee'
    const users = await User.findAll({
      where: { role: 'employee' },
    });

    // Map over each user to calculate their leave balance and leave taken
    const balances = await Promise.all(users.map(async (user) => {
      // Find all approved leave requests for the user
      const leaveRequests = await dbleave.findAll({
        where: { username: user.username, status: 'approved' }
      });

      // Calculate total leave days taken
      const totalLeaveDays = leaveRequests.reduce((total, request) => {
        const startDate = new Date(request.startDate);
        const endDate = new Date(request.endDate);
        const leaveDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end days
        return total + leaveDays;
      }, 0);

      // Count the number of leave requests
      const leaveCount = leaveRequests.length;

      // Calculate leave balance based on the total leave days
      // Assuming a fixed leave balance of 12 days
      const fixedLeaveBalance = 12;
      const leaveBalance = fixedLeaveBalance - totalLeaveDays;

      // Format the leave balance
      const formattedBalance = leaveBalance < 0  ? `Over by ${Math.abs(leaveBalance)} days` : `${leaveBalance} days remaining`;

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        balance: formattedBalance,
        taken: leaveCount, // Number of leave requests
        totalLeaveDays // Total leave days taken
      };
    }));

    // Send the result as JSON
    res.json(balances);
  } catch (error) {
    console.error('Error fetching leave balances:', error);
    res.status(500).json({ error: 'Failed to fetch leave balances' });
  }
};
