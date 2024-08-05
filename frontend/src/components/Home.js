import React from 'react';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import '../style/home.css'
import { BgColorsOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const Home = () => {
  const navigate = useNavigate();
  return (
    <div id="main">
    <Layout>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/register">Register</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Button type="primary" onClick={() => {sessionStorage.clear(); navigate('/');}}>
              Logout
            </Button>
          </Menu.Item>
        </Menu>
      </Header>

      <Content style={{ padding: '0 50px' ,backgroundColor:'lightsteelblue'}}>
        <Breadcrumb style={{ margin: '16px 0' }}>
        </Breadcrumb>
        <div className="site-layout-content">
          <h1 id='ti'>Welcome to the Employee Leave Management System</h1>
          <p><h3>Manage your leave requests efficiently.</h3></p>
        </div>
      </Content>
    </Layout>
    </div>
  );
};

export default Home;

