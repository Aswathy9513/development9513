// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RoleCards from './pages/RoleCards';
import DonorDashboard from './pages/DonorDashboard';
import ReceipientDashboard from './pages/ReceipientDashboard';
import AdminPanel from './pages/AdminPanel';




function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/roles" element={<RoleCards />} />
        <Route path="/donordash" element={<DonorDashboard />} />
        <Route path="/recpdash" element={<ReceipientDashboard />} />
        <Route path="/admin" element={<AdminPanel />} />





      </Routes>
    </Router>
  );
}

export default App;
