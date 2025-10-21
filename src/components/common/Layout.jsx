import React from 'react';
import Navbar from './Navbar';
import Sidebar from './SideBar';
import Footer from './Footer';
import './Layout.css';

// This is the main layout for ALL authenticated pages.
// It includes the Sidebar and the main content area with the Navbar.
const Layout = ({ currentUser, onLogout, children }) => {
  const userRole = currentUser?.role;

  return (
    <div className="layout-wrapper">
      {/* The Sidebar is a permanent part of the layout */}
      <Sidebar userRole={userRole} />
      
      <div className="main-content-wrapper">
        {/* The Navbar correctly receives the full currentUser object */}
        <Navbar currentUser={currentUser} onLogout={onLogout} />
        
        {/* The specific page content (like dashboard or assignments) goes here */}
        <main className="page-content">
          {children}
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Layout;