
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const LeaveHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = sessionStorage.getItem('token'); 
        const response = await axios.get('http://localhost:4001/api/leaves/leave-history/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHistory(response.data);
      } catch (error) {
        console.error('Failed to fetch leave history:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const columns = [
    {
      title: 'Leave Type',
      dataIndex: 'leaveType',
      key: 'leaveType',
      sorter: (a, b) => a.leaveType.localeCompare(b.leaveType),
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      sorter: (a, b) => new Date(a.endDate) - new Date(b.endDate),
    },
  ];

  const handleBack = () => {
    navigate('/employee'); 
  };

  return (
    <div style={{ background: 'linear-gradient(to left, #74ebd5, #ACB6E5)',height:"100vh"}}>
    <div style={{ padding: '40px' , background: 'linear-gradient(to right, #74ebd5, #ACB6E5)'}}>
      <Title level={2}>Leave History</Title>
      <Table
        dataSource={history}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={false}
        bordered
        style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
      />
      <Button type="primary" onClick={handleBack} style={{ marginBottom: '16px' }}>
        Go Back to Dashboard
      </Button>
    </div>
    </div>
  );
};

export default LeaveHistory;

