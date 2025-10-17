import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import Footer from '../common/Footer';
import './ActivityPoints.css';

const ActivityPoints = ({ onLogout }) => {
  const [filter, setFilter] = useState('all');

  const activities = [
    { 
      id: 1, 
      activity: 'Hackathon Winner', 
      category: 'Technical', 
      points: 15, 
      date: '2025-09-25',
      certificate: 'hackathon_cert.pdf',
      status: 'approved'
    },
    { 
      id: 2, 
      activity: 'Paper Presentation', 
      category: 'Academic', 
      points: 10, 
      date: '2025-09-22',
      certificate: 'paper_cert.pdf',
      status: 'pending'
    },
    { 
      id: 3, 
      activity: 'Workshop Participation', 
      category: 'Technical', 
      points: 5, 
      date: '2025-09-20',
      certificate: 'workshop_cert.pdf',
      status: 'approved'
    },
    { 
      id: 4, 
      activity: 'Sports Champion', 
      category: 'Sports', 
      points: 12, 
      date: '2025-09-18',
      certificate: 'sports_cert.pdf',
      status: 'rejected',
      reason: 'Certificate not clear'
    },
    { 
      id: 5, 
      activity: 'Cultural Event Performance', 
      category: 'Cultural', 
      points: 8, 
      date: '2025-09-15',
      certificate: 'cultural_cert.pdf',
      status: 'approved'
    }
  ];

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    return activity.status === filter;
  });

  const totalPoints = activities
    .filter(a => a.status === 'approved')
    .reduce((sum, a) => sum + a.points, 0);

  const pendingPoints = activities
    .filter(a => a.status === 'pending')
    .reduce((sum, a) => sum + a.points, 0);

  const categoryBreakdown = activities
    .filter(a => a.status === 'approved')
    .reduce((acc, activity) => {
      acc[activity.category] = (acc[activity.category] || 0) + activity.points;
      return acc;
    }, {});

  return (
    <div className="dashboard-layout">
      <Navbar userRole="student" userName="John Doe" onLogout={onLogout} />
      <div className="dashboard-container">
        <Sidebar userRole="student" />
        <main className="dashboard-main">
          <div className="dashboard-content">
            <div className="page-header">
              <div>
                <h1 className="page-title">Activity Points 🏆</h1>
                <p className="page-subtitle">Track your co-curricular and extracurricular achievements</p>
              </div>
              <Link to="/student/activities/submit" className="btn btn-primary">
                + Submit Certificate
              </Link>
            </div>

            <div className="points-summary">
              <div className="summary-card total-points">
                <div className="summary-icon">🏆</div>
                <div className="summary-details">
                  <h3 className="summary-value">{totalPoints}</h3>
                  <p className="summary-label">Total Points</p>
                </div>
              </div>

              <div className="summary-card pending-points">
                <div className="summary-icon">⏳</div>
                <div className="summary-details">
                  <h3 className="summary-value">{pendingPoints}</h3>
                  <p className="summary-label">Pending Approval</p>
                </div>
              </div>

              <div className="summary-card activities-count">
                <div className="summary-icon">📊</div>
                <div className="summary-details">
                  <h3 className="summary-value">{activities.filter(a => a.status === 'approved').length}</h3>
                  <p className="summary-label">Approved Activities</p>
                </div>
              </div>

              <div className="summary-card target-progress">
                <div className="summary-icon">🎯</div>
                <div className="summary-details">
                  <h3 className="summary-value">{Math.round((totalPoints / 100) * 100)}%</h3>
                  <p className="summary-label">Target Progress (100pts)</p>
                </div>
              </div>
            </div>

            <div className="content-grid">
              <div className="activities-section">
                <div className="section-header">
                  <h3 className="section-title">Your Activities</h3>
                  <div className="filter-tabs">
                    <button 
                      className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                      onClick={() => setFilter('all')}
                    >
                      All
                    </button>
                    <button 
                      className={`filter-btn ${filter === 'approved' ? 'active' : ''}`}
                      onClick={() => setFilter('approved')}
                    >
                      Approved
                    </button>
                    <button 
                      className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                      onClick={() => setFilter('pending')}
                    >
                      Pending
                    </button>
                    <button 
                      className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`}
                      onClick={() => setFilter('rejected')}
                    >
                      Rejected
                    </button>
                  </div>
                </div>

                <div className="activities-list">
                  {filteredActivities.map(activity => (
                    <div key={activity.id} className="activity-item">
                      <div className="activity-main">
                        <div className="activity-info">
                          <h4 className="activity-name">{activity.activity}</h4>
                          <div className="activity-meta">
                            <span className="category-badge">{activity.category}</span>
                            <span className="date-text">📅 {activity.date}</span>
                          </div>
                        </div>
                        <div className="activity-status-section">
                          <span className="points-display">+{activity.points} pts</span>
                          <span className={`status-badge status-${activity.status}`}>
                            {activity.status}
                          </span>
                        </div>
                      </div>
                      {activity.status === 'rejected' && activity.reason && (
                        <div className="rejection-reason">
                          <span className="reason-icon">ℹ️</span>
                          <span className="reason-text">Reason: {activity.reason}</span>
                        </div>
                      )}
                      <div className="activity-actions">
                        <button className="view-certificate-btn">📄 View Certificate</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="category-breakdown-section">
                <h3 className="section-title">Category Breakdown</h3>
                <div className="breakdown-chart">
                  {Object.entries(categoryBreakdown).map(([category, points]) => (
                    <div key={category} className="breakdown-item">
                      <div className="breakdown-header">
                        <span className="breakdown-category">{category}</span>
                        <span className="breakdown-points">{points} pts</span>
                      </div>
                      <div className="breakdown-bar">
                        <div 
                          className="breakdown-fill"
                          style={{ width: `${(points / totalPoints) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="ktu-guidelines">
                  <h4 className="guidelines-title">📋 KTU Point Guidelines</h4>
                  <ul className="guidelines-list">
                    <li>International Event Winner: 20 points</li>
                    <li>National Event Winner: 15 points</li>
                    <li>State Level Winner: 12 points</li>
                    <li>Paper Presentation: 10 points</li>
                    <li>Workshop/Seminar: 5 points</li>
                    <li>Sports Champion: 12 points</li>
                    <li>Cultural Event: 8 points</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default ActivityPoints;