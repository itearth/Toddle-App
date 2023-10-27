import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from '../src/components/pages/registration/Registration';



const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<RegistrationForm />} />
        </Routes>
    </Router>
  );
};

export default App;
