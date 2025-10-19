import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/SideBar';
import Footer from '../common/Footer';
import './ActivityPoints.css'; // We will create this CSS file

const ActivityPoints = ({ onLogout }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  // Mock data that matches the screenshot
  const allActivities = [
    { title: 'Hackathon Winner', category: 'Technical', date: '2025-09-25', points: 15, status: 'Approved' },
    { title: 'Paper Presentation', category: 'Academic', date: '2025-09-22', points: 10, status: 'Pending' },
    { title: 'Workshop Participation', category: 'Technical', date: '2025-09-20', points: 5, status: 'Approved' },
    { title: 'Sports Champion', category: 'Sports', date: '2025-09-18', points: 12, status: 'Rejected' },
  ];

  const filteredActivities = allActivities.filter(activity => {
    if (activeFilter === 'All') return true;
    return activity.status === activeFilter;
  });

  const filterOptions = ['All', 'Approved', 'Pending', 'Rejected'];

  return (
    <div className="layout-wrapper">
      <Sidebar userRole="student" />
      <div className="main-content-wrapper">
        <Navbar userName="John Doe" userRole="Student" onLogout={onLogout} />
        <main className="page-content">
          <div className="page-header">
            <div>
              <h1 className="page-title">Activity Points</h1>
              <p className="page-subtitle">Track your co-curricular achievements</p>
            </div>
            <Link to="/student/activities/submit" className="btn-primary">
              + Submit Certificate
            </Link>
          </div>

          <div className="summary-bar">
            <div className="summary-item"><span>20</span>Total Points</div>
            <div className="summary-item"><span>10</span>Pending Approval</div>
            <div className="summary-item"><span>2</span>Approved Activities</div>
            <div className="summary-item"><span>20%</span>Target (100pts)</div>
          </div>

          <div className="activities-card">
            <div className="filter-bar">
              {filterOptions.map(filter => (
                <button
                  key={filter}
                  className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            <ul className="activities-list">
              {filteredActivities.map((activity, index) => (
                <li key={index} className="activity-item">
                  <div className="activity-info">
                    <h4 className="activity-title">{activity.title}</h4>
                    <div className="activity-meta">
                      <span className={`category-tag ${activity.category.toLowerCase()}`}>{activity.category}</span>
                      <span className="activity-date">{activity.date}</span>
                    </div>
                  </div>
                  <div className="activity-status">
                    <span className={`points points-${activity.status.toLowerCase()}`}>
                      +{activity.points} pts
                    </span>
                    <span className={`status-badge status-${activity.status.toLowerCase()}`}>
                      {activity.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ActivityPoints;