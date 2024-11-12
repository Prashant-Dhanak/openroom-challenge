import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ApplicationForm from './pages/ApplicationForm';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/application/:action/:id?" element={<ApplicationForm />} />
      </Routes>
    </Router>
  );
};

export default App;
