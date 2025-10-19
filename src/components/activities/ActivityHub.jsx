import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../common/SideBar';
import Navbar from '../common/Navbar';
import './ActivityHub.css'; 

const ActivityHub = ({ onLogout }) => {
  return (
    <div className="layout-wrapper">
      <Sidebar userRole="student" />
      <div className="main-content-wrapper">
        <Navbar userName="John Doe" userRole="Student" onLogout={onLogout} />
        <main className="page-content">
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
        </main>
      </div>
    </div>
  );
};

export default ActivityHub;