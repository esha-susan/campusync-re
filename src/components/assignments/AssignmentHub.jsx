import React from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../common/SideBar';
import Navbar from '../common/Navbar';
import './AssignmentHub.css'; // New CSS for this page
import './AssignmentEvaluate.css'
const AssignmentHub = () => {
  return (
    <div className="dashboard-layout">
        <SideBar userRole={userRole} />
        <Navbar userName="John Doe" userRole="Student" /> 
      <main className="dashboard-main">
        <div className="dashboard-content-wide">
          <div className="page-header">
            <div>
              <h1 className="page-title"><span className="gradient-text">Assignment Management</span></h1>
              <p className="page-subtitle">Choose an option to view your assignments.</p>
            </div>
          </div>
          
          <div className="hub-grid">
            <Link to="/student/assignments" className="hub-card">
              <div className="hub-icon">📚</div>
              <h2 className="hub-title">View All Assignments</h2>
              <p className="hub-description">See a list of all your pending, submitted, and graded assignments.</p>
              <span className="hub-arrow">→</span>
            </Link>
            
            <Link to="/student/assignments/graded" className="hub-card">
              <div className="hub-icon">✅</div>
              <h2 className="hub-title">View Graded Assignments</h2>
              <p className="hub-description">Check your grades and view feedback from your instructors.</p>
              <span className="hub-arrow">→</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AssignmentHub;