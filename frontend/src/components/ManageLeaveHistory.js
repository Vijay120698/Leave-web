import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Typography, List, Spin } from 'antd';
import { useNavigate } from 'react-router-dom'; 

const { Title } = Typography;

const ManageLeaveHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:4001/api/leaves/leaves/leave-history');
        setHistory(response.data);
      } catch (error) {
        console.error('Failed to fetch leave history:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const handleBack = () => {
    navigate('/manager'); 
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' , background: 'linear-gradient(to right, #74ebd5, #ACB6E5)'}}>
        <Title level={2}>Leave History</Title>
        <Button type="default" onClick={handleBack} style={{ marginBottom: '16px' }}>
          Go Back to Dashboard
        </Button>
        {loading ? (
          <Spin tip="Loading..." />
        ) : (
          <List
            bordered
            dataSource={history}
            renderItem={record => (
              <List.Item>
                <List.Item.Meta
                  title={`${record.username}: ${record.leaveType}`}
                  description={`From ${new Date(record.startDate).toLocaleDateString()} to ${new Date(record.endDate).toLocaleDateString()} - Status: ${record.status}`}
                />
              </List.Item>
            )}
          />
        )}
      </Card>
    </div>
  );
};

export default ManageLeaveHistory;

