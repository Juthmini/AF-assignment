// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import Layout from './components/Layout.jsx';
import Home from './pages/Home';
import CountryDetails from './pages/CountryDetails';
import Login from './pages/Login';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/country/:countryCode" element={<CountryDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<div className="text-center py-10"><h1 className="text-3xl font-bold">404 - Page Not Found</h1></div>} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;