import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="dashboard-footer">
      <div className="footer-container">
        <p className="footer-text">
          © 2025 Campusync. Govt Model Engineering College. All rights reserved.
        </p>
        <div className="footer-links">
          <a href="#" className="footer-link">Privacy Policy</a>
          <a href="#" className="footer-link">Terms of Service</a>
          <a href="#" className="footer-link">Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;