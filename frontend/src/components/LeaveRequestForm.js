import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Layout, Form, Select, Input, Button, DatePicker, Typography } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const { Title } = Typography;
const { Content } = Layout;
const { Option } = Select;

const LeaveRequestForm = () => {
  const navigate = useNavigate();

  const [leaveRequest, setLeaveRequest] = useState({
    username: sessionStorage.getItem('username') || '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLeaveRequest({
      ...leaveRequest,
      [name]: value
    });
  };

  const handleSelectChange = (value) => {
    setLeaveRequest({
      ...leaveRequest,
      leaveType: value
    });
  };

  const handleDateChange = (date, dateString, field) => {
    setLeaveRequest({ ...leaveRequest, [field]: dateString });
  };

  const handleSubmit = async () => {
    if (!leaveRequest.username) {
      toast.error('Username is required. Please log in again.', { position: "top-right" });
      return; 
    }

    try {
      const response = await axios.post('http://localhost:4001/api/leaves', leaveRequest);
      console.log('Leave request submitted:', response.data);
      
      toast.success('Leave request submitted successfully.', { position: "top-right" });
      navigate('/employee');

    } catch (error) {
      console.error('Failed to submit leave request:', error);
      toast.error('Failed to submit leave request. Please try again.', { position: "top-right" });
      navigate('/employee');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: 'linear-gradient(to right, #74ebd5, #ACB6E5)' }}>
      <Content style={{ padding: '50px' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Submit Leave Request</Title>
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          style={{ maxWidth: '600px', margin: '0 auto', background: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
        >
          <Form.Item name="username" hidden>
            <Input value={leaveRequest.username} />
          </Form.Item>
          <Form.Item
            label="Leave Type"
            name="leaveType"
            rules={[{ required: true, message: 'Please input the type of leave!' }]}
          >
            <Select
              placeholder="Select leave type"
              value={leaveRequest.leaveType}
              onChange={handleSelectChange}
            >
              <Option value="Annual Leave">Annual Leave</Option>
              <Option value="Sick Leave">Sick Leave</Option>
              <Option value="Casual Leave">Casual Leave</Option>
              <Option value="Maternity Leave">Maternity Leave</Option>
              <Option value="Paternity Leave">Paternity Leave</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[{ required: true, message: 'Please select the start date!' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              value={leaveRequest.startDate ? moment(leaveRequest.startDate) : null}
              onChange={(date) => handleDateChange(date, date.format('YYYY-MM-DD'), 'startDate')}
            />
          </Form.Item>
          <Form.Item
            label="End Date"
            name="endDate"
            rules={[{ required: true, message: 'Please select the end date!' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              value={leaveRequest.endDate ? moment(leaveRequest.endDate) : null}
              onChange={(date) => handleDateChange(date, date.format('YYYY-MM-DD'), 'endDate')}
            />
          </Form.Item>
          <Form.Item
            label="Reason"
            name="reason"
            rules={[{ required: true, message: 'Please provide a reason!' }]}
          >
            <Input.TextArea
              rows={5}
              name="reason"
              value={leaveRequest.reason}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Content>
      <ToastContainer /> 
    </Layout>
  );
};

export default LeaveRequestForm;
