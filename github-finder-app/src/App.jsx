// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import Navbar from './components/layout/navbar';

function App() {
  return (
    <Router>
      {/* Rely on DaisyUI’s bg-base-100 and text-base-content */}
      <div className="min-h-screen bg-black text-base-content transition-colors duration-300 " >
        <Navbar />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user/:username" element={<UserPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
