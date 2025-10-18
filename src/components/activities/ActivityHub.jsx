import React from 'react';
import { Link } from 'react-router-dom';
import '../dashboard/Dashboard.css'; // For the shared header style
import './ActivityHub.css'; 

const ActivityHub = () => {
  return (
    <div className="layout-wrapper">
      {/* You can add your <Sidebar /> here if you want it on this page */}
      <main className="main-content-wrapper full-width">
        <div className="page-content">
          <div className="page-header">
            <div>
              <h1 className="page-title"><span className="gradient-text">Activity Points</span></h1>
              <p className="page-subtitle">Manage your co-curricular and extracurricular achievements.</p>
            </div>
          </div>
          
          <div className="hub-grid">
            <Link to="/student/activities" className="hub-card">
              <div className="hub-icon">🏆</div>
              <h2 className="hub-title">View Activity Points</h2>
              <p className="hub-description">Track your total points, view the status of your submissions, and see a breakdown by category.</p>
              <span className="hub-arrow">→</span>
            </Link>
            
            <Link to="/student/activities/submit" className="hub-card">
              <div className="hub-icon">📄</div>
              <h2 className="hub-title">Submit a Certificate</h2>
              <p className="hub-description">Upload a new certificate for an activity to get it approved and earn points.</p>
              <span className="hub-arrow">→</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ActivityHub;