const express = require('express');
const {
  createLeaveRequest,
  getPendingLeaveRequests,
  approveLeaveRequest,
  denyLeaveRequest,
  getLeaveHistory,
  deleteLeaveRequest,
  getUserLeaveHistory
} = require('../controllers/leaveController');

const authenticateToken = require('../middleware/auth'); 

const router = express.Router();

router.post('/', createLeaveRequest);
router.get('/pending', getPendingLeaveRequests);
router.patch('/:id/approve', approveLeaveRequest);
router.patch('/:id/deny', denyLeaveRequest);
router.get('/leaves/leave-history', getLeaveHistory);
router.delete('/leaves/:id/delete', deleteLeaveRequest);
router.get('/leave-history/user', authenticateToken,getUserLeaveHistory);

module.exports = router;

