import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Typography, Card, Row, Col, Dropdown, Avatar, Menu, Button } from 'antd';
import {
  ScheduleOutlined,
  HistoryOutlined,
  WalletOutlined,
  HomeOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const Dashboard = () => {
  const navigate = useNavigate();
  const profileMenu = (
    <Menu  style={{ minHeight: '100vh', background: 'linear-gradient(to right, #74ebd5, #ACB6E5)' }}>
      <Menu.Item key="profile" onClick={() => navigate("/profileemployee")}>
        View Profile
      </Menu.Item>
      <Menu.Item 
  key="logout" onClick={() => { 
    sessionStorage.clear();
    navigate('/'); 
  }}
>
  Logout
</Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh',background: 'linear-gradient(to right, #74ebd5, #ACB6E5)' }}>
      <Header style={{ background: '#001529', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={2} style={{ color: '#fff', margin: '0' }}>Employee Dashboard</Title>
        <Dropdown overlay={profileMenu} trigger={['click']}>
          <Avatar style={{ cursor: 'pointer' }} icon={<UserOutlined />} />
        </Dropdown>
      </Header>
      <center><h1>Important</h1></center>
      <p>As businesses continue to embrace Kubernetes for its scalability and agility, cost management becomes increasingly critical. We understand that managing cloud costs can be complex, especially in large and dynamic containerized environments. That’s why we’re here to provide you with practical insights and actionable tips to take control of your Kubernetes spending. In our previous blog on Kubernetes Cost Optimization Best Practices – Part 1, we covered the common cost optimization challenges and a few solutions. Let’s see a few more,

Taints & Tolerances
In Kubernetes, “taints” and “tolerations” are mechanisms that can be used strategically to optimize costs by efficiently managing the allocation of workloads to nodes within your cluster. They act as filters in the Kubernetes world. Some of its uses in optimization are,

Efficient Utilization:
Nodes can be ‘tainted’ based on their utilization or capacity, such as CPU or memory usage. This allows you to mark nodes that are underutilized or overutilized. Whereas pods that are designed to scale horizontally can have ‘tolerations’ for nodes with low utilization. When additional resources are needed, more pods can be scheduled on those nodes to efficiently utilize available resources without provisioning new nodes.


</p>
      <Content style={{ padding: '20px', background: 'linear-gradient(to right, #74ebd5, #ACB6E5)' }}>
        <Row gutter={16}>
          <Col span={8}>
            <Card 
              title="Leave Request" 
              hoverable 
              onClick={() => navigate("/leave-request")} 
              style={{ cursor: 'pointer' }}
              actions={[<ScheduleOutlined key="request" />]}
            >
              <p>Submit a new leave request.</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card 
              title="Leave Balances" 
              hoverable 
              onClick={() => navigate("/leave-balances")} 
              style={{ cursor: 'pointer' }}
              actions={[<WalletOutlined key="balance" />]}
            >
              <p>Check your available leave balances.</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card 
              title="Leave History" 
              hoverable 
              onClick={() => navigate("/Empleave-history")} 
              style={{ cursor: 'pointer' }}
              actions={[<HistoryOutlined key="history" />]}
            >
              <p>View your past leave requests.</p>
            </Card>
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <Button type="primary" onClick={() => navigate('/')}>
          <HomeOutlined /> Go to Home
        </Button>
      </Footer>
    </Layout>
  );
};

export default Dashboard;
