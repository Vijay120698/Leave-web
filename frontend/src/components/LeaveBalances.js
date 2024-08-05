import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Layout, Card, Row, Col, Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Content } = Layout;

const LeaveBalances = () => {
  const navigate = useNavigate();
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [leaveBalance, setLeaveBalance] = useState(12); 
  const [leaveTaken, setLeaveTaken] = useState(0); 

  useEffect(() => {
    const fetchLeaveTypes = async () => {
      try {
        const response = await axios.get('/api/leave-types'); 
        setLeaveTypes(response.data);
      } catch (error) {
        console.error('Failed to fetch leave types:', error);
        const mockLeaveTypes = [
          'Annual Leave',
          'Sick Leave',
          'Casual Leave',
          'Maternity Leave',
          'Paternity Leave',
        ];
        setLeaveTypes(mockLeaveTypes);
      }
    };

    const fetchLeaveHistory = async () => {
      try {
        const token = sessionStorage.getItem('token'); 
        const response = await axios.get('http://localhost:4001/api/leaves/leave-history/user', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        const leaveRequests = response.data; 

        // Calculate taken leaves based on approval status
        const approvedLeaves = leaveRequests.filter(leave => leave.status === 'approved');
        const numberOfLeavesTaken = approvedLeaves.length; 

        setLeaveTaken(numberOfLeavesTaken);

        const updatedLeaveBalance = 12 - numberOfLeavesTaken; // Default leave is 12
        setLeaveBalance(updatedLeaveBalance); 
      } catch (error) {
        console.error('Failed to fetch leave history:', error);
      }
    };

    fetchLeaveTypes(); 
    fetchLeaveHistory(); 
  }, []);

  const requestLeave = () => {
    navigate('/leave-request'); 
  };

  const goBack = () => {
    navigate('/employee');
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content style={{ padding: '50px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>Leave Balances</Title>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Leave Types" bordered={true} style={{ height: '100%' }}>
              <ul style={{ padding: '0', listStyleType: 'none' }}>
                {leaveTypes.map((leaveType, index) => (
                  <li key={index} style={{ fontSize: '18px', marginBottom: '10px' }}>{leaveType}</li>
                ))}
              </ul>
              <Button type="primary" onClick={requestLeave} style={{ marginTop: '20px' }}>
                Request Leave
              </Button>
            </Card>
          </Col>
          <Col span={16}>
            <Row gutter={16}>
              <Col span={24}>
                <Card title="Leave Balance" bordered={true} style={{ textAlign: 'center', height: '100%' }}>
                  <Title level={3}>{leaveBalance} Days</Title>
                </Card>
              </Col>
              <Col span={24}>
                <Card title="Leave Taken" bordered={true} style={{ textAlign: 'center', height: '100%' }}>
                  <Title level={3}>{leaveTaken} Days</Title>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <Button 
          type="default" 
          onClick={goBack} 
          style={{ marginTop: '20px' }}
        >
          Go Back to Dashboard
        </Button>
      </Content>
    </Layout>
  );
};

export default LeaveBalances;

