import React from 'react';
import './LogoSplash.css';

const LogoSplash = () => {
  return (
    <div className="splash-container">
      <div className="splash-content">
        <div className="logo-animation">
          <div className="logo-circle">
            <svg viewBox="0 0 100 100" className="logo-svg">
              <path
                d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z"
                className="logo-hexagon"
              />
              <text x="50" y="60" textAnchor="middle" className="logo-text">C</text>
            </svg>
          </div>
        </div>
        <h1 className="splash-title">Campusync</h1>
        <p className="splash-subtitle">Your Academic Hub</p>
        <div className="splash-loader">
          <div className="loader-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default LogoSplash;