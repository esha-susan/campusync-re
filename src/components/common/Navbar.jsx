
import React from 'react';
import { Link } from 'react-router-dom'; // Make sure Link is imported
import './Navbar.css';

const Navbar = ({ userName, userRole }) => {
  return (
    <header className="navbar-container">
      {/* --- 1. ADDED LOGO WITH LINK TO LANDING PAGE --- */}
      <Link to="/landing" className="navbar-logo">
        <div className="logo-icon">C</div>
        <span>Campusync</span>
      </Link>

      <div className="navbar-right-section">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search..." />
        </div>
        <div className="navbar-profile">
          <div className="notification-bell">
            <span>🔔</span>
            <div className="notification-dot">2</div>
          </div>
          <div className="user-info">
            <div className="user-avatar">J</div>
            <div>
              <div className="user-name">{userName || 'John Doe'}</div>
              <div className="user-role">{userRole || 'Student'}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;