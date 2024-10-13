import React from 'react'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login';
import Register from './Register';
import ResetPassword from './ResetPassword';
import Dashboard from "./dashboard";
import Success from './Success';
import CreateOrder from "./components/CreateOrder";
import CreateSuccess from "./components/Order/createSuccess"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/success" element={<Success />} />
        <Route path="/" element={<CreateOrder />} />
        <Route path="/createSuccess" element={<CreateSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
