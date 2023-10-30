import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from '../src/components/pages/registration/Registration';
import Login from './components/pages/login/Login';
import Dashboard from './components/pages/dashboard/Dashboard';



const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<RegistrationForm />} />
      <Route path="login" element={<Login />} /> 
      <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </Router>
  );
};

export default App;
