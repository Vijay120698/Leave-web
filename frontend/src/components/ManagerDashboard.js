
import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button, Table, Typography, Card, Avatar, Dropdown } from 'antd';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Header, Content } = Layout;
const { Title } = Typography;

const Dashboard = ({  setPendingRequests }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await axios.get('http://localhost:4001/api/leaves/pending');
        console.log('Fetched pending requests:', response.data);
        setPendingRequests(response.data); 
      } catch (error) {
        console.error('Error fetching pending requests:', error);
      }
    };

    fetchPendingRequests();
  }, [setPendingRequests]);

  const handlePendingRequests = () => {
    navigate("/pending-requests");
  };

  const handleEmployeeDetails = () => {
    navigate("/employee-details");
  };

  const handleLeaveHistory = () => {
    navigate("/leave-history");
  };

  const handleProfileClick = () => {
    navigate("/profilemanager");
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const profileMenu = (
    <Menu>
      <Menu.Item key="profile" onClick={handleProfileClick}>
        View Profile
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#001529', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={2} style={{ color: '#fff', margin: 0 }}>Manager Dashboard</Title>
       <div style={{display:"flex"}}>
        <Dropdown overlay={profileMenu} trigger={['click']}>
          <Avatar style={{ cursor: 'pointer' }} icon={<UserOutlined />} />
        </Dropdown><div>Profile</div></div> 
      </Header>
      <Content style={{ padding: '20px', background: 'linear-gradient(to right, #74ebd5, #ACB6E5)'}}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Menu
            style={{ width: 256 }}
            mode="inline"
            defaultSelectedKeys={['1']}
            theme="dark"
          >
            <Menu.Item key="1" onClick={handleEmployeeDetails}>
              Employee Details
            </Menu.Item>
            <Menu.Item key="2" onClick={handlePendingRequests}>
              Pending Requests
            </Menu.Item>
            <Menu.Item key="3" onClick={handleLeaveHistory}>
              Leave History
            </Menu.Item>
          </Menu>

          <div style={{ flex: 1, marginLeft: '20px' }}>
            <Card title="Welcome to the Manager Dashboard" style={{ width: '100%' }}>
              <Title level={4}>Manage your team's leave requests efficiently</Title>
              <p>
                Use the menu on the left to navigate through the various sections.
                You can review pending leave requests, manage leave balances, and
                check the leave history.
              </p>
              <p>
              This certification showcases our devotion to continuous improvement and client satisfaction. It reinforces our dedication to providing reliable, efficient, and secure cloud cost optimization solutions that empower businesses to succeed in the digital age.

Improved Quality Management: Implementing ISO 9001:2015 principles enables Amadis establish and maintain a high level of quality of our products and services. This is particularly important in the FinOps industry, where accuracy and reliability are crucial.
Enhanced Customer Confidence: This certification signals to customers that Amadis is committed to delivering high-quality cloud finops solutions. This increases our customer trust and confidence, potentially leading to retention and continued service opportunities.
Streamlined Processes: ISO 9001 encourages Amadis to establish and document efficient and effective processes that leads to improved internal operations, reduced errors, and better resource utilization. This ensures our team efficiency in handling customer issues in a streamlined manner.
Continuous Improvement: ISO 9001 promotes a culture of continuous improvement. We regularly assess our processes and performance, identify areas for enhancement, and take corrective actions. This can lead to ongoing refinements in our product offerings and service delivery.
Regulatory Compliance: ISO 9001 facilitates Amadis align with regulatory requirements and common industry standards, which is particularly important in a highly regulated sector like finance.
              </p>

              <p>As businesses continue to embrace Kubernetes for its scalability and agility, cost management becomes increasingly critical. We understand that managing cloud costs can be complex, especially in large and dynamic containerized environments. That’s why we’re here to provide you with practical insights and actionable tips to take control of your Kubernetes spending. In our previous blog on Kubernetes Cost Optimization Best Practices – Part 1, we covered the common cost optimization challenges and a few solutions. Let’s see a few more,

Taints & Tolerances
In Kubernetes, “taints” and “tolerations” are mechanisms that can be used strategically to optimize costs by efficiently managing the allocation of workloads to nodes within your cluster. They act as filters in the Kubernetes world. Some of its uses in optimization are,



</p>
              <Button type="primary" onClick={handlePendingRequests}>
                View Pending Requests
              </Button>
            </Card>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

const ManagerDashboard = ({ pendingRequests }) => {
  console.log('Pending Requests in ManagerDashboard:', pendingRequests); 
  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Leave Type',
      dataIndex: 'leaveType',
      key: 'leaveType',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Pending Leave Requests</Title>
      {pendingRequests.length > 0 ? (
            <Table dataSource={pendingRequests} columns={columns} rowKey="id" />
        ) : (
            <p>No data found.</p>
        )}
    </div>
  );
};

// App component to include routing
const App = () => {
  const [pendingRequests, setPendingRequests] = useState([]);

  return (
    <Routes>
       <Route path="/" element={<Dashboard setPendingRequests={setPendingRequests} />} />
      <Route path="/pending-requests" element={<ManagerDashboard pendingRequests={pendingRequests} />} />
    </Routes>
  );
};

export default App;

