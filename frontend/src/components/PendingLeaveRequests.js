import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { notification, Button, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import moment from 'moment'; // Import moment

const PendingLeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get('http://localhost:4001/api/leaves/pending');
        setLeaveRequests(response.data);
      } catch (error) {
        console.error('Failed to fetch leave requests:', error);
      }
    };
    fetchLeaveRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.patch(`http://localhost:4001/api/leaves/${id}/approve`);
      notification.success({
        message: 'Success',
        description: 'Leave request approved successfully.',
      });
      setLeaveRequests(leaveRequests.filter(req => req.id !== id)); 
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to approve leave request.',
      });
    }
  };

  const handleDeny = async (id) => {
    try {
      await axios.patch(`http://localhost:4001/api/leaves/${id}/deny`);
      notification.success({
        message: 'Success',
        description: 'Leave request denied successfully.',
      });
      setLeaveRequests(leaveRequests.filter(req => req.id !== id)); 
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to deny leave request.',
      });
    }
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Leave Type',
      dataIndex: 'leaveType',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      render: (text) => moment(text).format('YYYY-MM-DD'), // Format date using moment
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      render: (text) => moment(text).format('YYYY-MM-DD'), // Format date using moment
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
    },
    {
      title: 'Action',
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => handleApprove(record.id)}>Approve</Button>
          <Button type="danger" onClick={() => handleDeny(record.id)} style={{ marginLeft: 8, color: 'white', backgroundColor: 'red' }}>Deny</Button>
        </span>
      ),
    },
  ];

  const handleBack = () => {
    navigate('/manager'); // Replace with the correct route to the manager dashboard
  };

  return (
    <div style={{ background: 'linear-gradient(to right, #74ebd5, #ACB6E5)' }}>
      <Table dataSource={leaveRequests} columns={columns} rowKey="id" style={{ background: 'linear-gradient(to right, #74ebd5, #ACB6E5)' }}/>
      <Button type="default" onClick={handleBack} style={{ marginBottom: '16px' }}>
        Go Back to Dashboard
      </Button>
    </div>
  );
};

export default PendingLeaveRequests;
