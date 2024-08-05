import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import ProfileM from './components/Profilemanager';
import ProfileE from './components/Profileemployee';
import EmployeeDashboard from './components/EmployeeDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import PendingLeaveRequests from './components/PendingLeaveRequests';
import EmployeeDetails from './components/EmployeeDetails';
import ManageLeaveHistory from './components/ManageLeaveHistory';
import { AuthContext } from './components/AuthContext';
import LeaveRequestForm from './components/LeaveRequestForm';
import LeaveBalances from './components/LeaveBalances';
import EmpLeaveHistory from './components/LeaveHistory';
import './App.css';

const  App = () => {
  
  console.log("hello")
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profilemanager" element={<ProfileM/>} />
        <Route path="/profileemployee" element={<ProfileE/>} />
        <Route path="/manager" element={<ManagerDashboard/>} />
        <Route path="/employee" element={<EmployeeDashboard/>} />
        <Route path="/pending-requests" element={<PendingLeaveRequests/>} />
        <Route path="/employee-details" element={<EmployeeDetails/>} />
        <Route path="/leave-history" element={<ManageLeaveHistory/>} />
        <Route path="/leave-request" element={<LeaveRequestForm/>} />
        <Route path="/leave-balances" element={<LeaveBalances/>} />
        <Route path="/empleave-history" element={<EmpLeaveHistory/>} />
      </Routes>
    </div>
  );
}

export default App;

