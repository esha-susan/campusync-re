import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../common/SideBar';
import Navbar from '../common/Navbar';
import './ActivityPoints.css';

const ActivityPoints = ({ onLogout }) => {
  const [filter, setFilter] = useState('all');
  const activities = [
    { id: 1, activity: 'Hackathon Winner', category: 'Technical', points: 15, date: '2025-09-25', status: 'approved' },
    { id: 2, activity: 'Paper Presentation', category: 'Academic', points: 10, date: '2025-09-22', status: 'pending' },
    { id: 3, activity: 'Workshop Participation', category: 'Technical', points: 5, date: '2025-09-20', status: 'approved' },
    { id: 4, activity: 'Sports Champion', category: 'Sports', points: 12, date: '2025-09-18', status: 'rejected', reason: 'Certificate not clear' },
  ];

  const filteredActivities = activities.filter(a => filter === 'all' || a.status === filter);
  const totalPoints = activities.filter(a => a.status === 'approved').reduce((sum, a) => sum + a.points, 0);
  const pendingPoints = activities.filter(a => a.status === 'pending').reduce((sum, a) => sum + a.points, 0);

  return (
    <div className="layout-wrapper">
      <Sidebar userRole="student" />
      <div className="main-content-wrapper">
        <Navbar userName="John Doe" userRole="Student" />
        <main className="page-content">
          <div className="page-header">
            <div>
              <h1 className="page-title">Activity Points</h1>
              <p className="page-subtitle">Track your co-curricular achievements</p>
            </div>
            <Link to="/student/activities/submit" className="btn btn-primary">+ Submit Certificate</Link>
          </div>

          <div className="points-summary">
            <div className="summary-card"><div className="summary-details"><h3 className="summary-value">{totalPoints}</h3><p className="summary-label">Total Points</p></div></div>
            <div className="summary-card"><div className="summary-details"><h3 className="summary-value">{pendingPoints}</h3><p className="summary-label">Pending Approval</p></div></div>
            <div className="summary-card"><div className="summary-details"><h3 className="summary-value">{activities.filter(a => a.status === 'approved').length}</h3><p className="summary-label">Approved Activities</p></div></div>
            <div className="summary-card"><div className="summary-details"><h3 className="summary-value">{Math.round((totalPoints / 100) * 100)}%</h3><p className="summary-label">Target (100pts)</p></div></div>
          </div>

          <div className="activities-list-container">
            <div className="filter-tabs">
              <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
              <button className={`filter-btn ${filter === 'approved' ? 'active' : ''}`} onClick={() => setFilter('approved')}>Approved</button>
              <button className={`filter-btn ${filter === 'pending' ? 'active' : ''}`} onClick={() => setFilter('pending')}>Pending</button>
              <button className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`} onClick={() => setFilter('rejected')}>Rejected</button>
            </div>
            <div className="activities-list">
              {filteredActivities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-info">
                    <h4 className="activity-name">{activity.activity}</h4>
                    <div className="activity-meta">
                      <span className="category-badge">{activity.category}</span>
                      <span>📅 {activity.date}</span>
                    </div>
                  </div>
                  <div className="activity-status-section">
                    <span className="points-display">+{activity.points} pts</span>
                    <span className={`status-badge status-${activity.status}`}>{activity.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ActivityPoints;