
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { Layout, Table, Button } from 'antd';

const { Content } = Layout;

const EmployeeDetails = () => {
  const [balances, setBalances] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const response = await axios.post('http://localhost:4001/api/auth/balances');
        setBalances(response.data);
      } catch (error) {
        console.error('Failed to fetch leave balances:', error);
      }
    };
    fetchBalances();
  }, []);

  const columns = [
    {
      title: 'Employee Name',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email Id',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Leave Taken',
      dataIndex: 'taken',
      key: 'taken',
    },
    {
      title: 'Leave Balance',
      dataIndex: 'balance',
      key: 'balance',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', padding: '24px' }}>
      <Content style={{ background: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
        <h2>Employee Details</h2>
        
        <Button 
          type="primary" 
          style={{ marginBottom: '16px' }} 
          onClick={() => navigate('/manager')} // Navigate to manager dashboard
        >
          Go Back to  Dashboard
        </Button>
        
        <Table dataSource={balances} columns={columns} rowKey="id" pagination={false} />
      </Content>
    </Layout>
  );
};

export default EmployeeDetails;

