import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ControlPanel from './pages/ControlPanel';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/controlpanel" element={<ControlPanel />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App; // 👈 this is important
