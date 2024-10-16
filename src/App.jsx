import React from 'react'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login';
import Register from './Register';
import ResetPassword from './ResetPassword';
import Dashboard from "./dashboard";
import Success from './Success';
import CreateOrder from "./components/CreateOrder";
import CreateSuccess from "./components/Order/createSuccess";
import Customer from "../src/Customer";     
import Appointment from "../src/Appointment";
import Package from "../src/Package";
import Order from "../src/Order";
import Item from "../src/Item";
import StandingOrder from "../src/StandingOrder"; 
import Billing from "../src/Billing";
import RecordAccept from "../src/RecordAccept"     
import Report from "../src/Report"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/success" element={<Success />} />
        <Route path="/createOrder" element={<CreateOrder />} />
        <Route path="/createSuccess" element={<CreateSuccess />} />
        
        {/* Add new routes here */}
        <Route path="/customers" element={<Customer />} />
        <Route path="/appointments" element={<Appointment />} />
        <Route path="/packages" element={<Package />} />
        <Route path="/orders" element={<Order/>} />
        <Route path="/items" element={<Item/>} />
        <Route path="/standingorders" element={<StandingOrder/>} />
        <Route path="/billing" element={<Billing/>} />
        <Route path="/confirm" element={<RecordAccept/>} />
        <Route path="/report" element={<Report/>} />
      </Routes>
    </Router>
  );
}

export default App;
