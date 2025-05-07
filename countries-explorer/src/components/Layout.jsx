// src/components/Layout.jsx
import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Countries Explorer | Created for SE3040 – Application Frameworks Assignment</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;