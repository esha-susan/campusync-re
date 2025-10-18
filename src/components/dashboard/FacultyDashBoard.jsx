import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/SideBar';
import Footer from '../common/Footer';
import './FacultyDashBoard.css';

const FacultyDashboard = ({ onLogout }) => {
  const [pendingAssignments] = useState([
    { id: 1, title: 'ER Diagram Design', subject: 'Database Systems', submissions: 45, total: 50, deadline: '2025-10-05' },
    { id: 2, title: 'Process Scheduling', subject: 'Operating Systems', submissions: 38, total: 50, deadline: '2025-10-08' },
    { id: 3, title: 'TCP/IP Analysis', subject: 'Computer Networks', submissions: 42, total: 50, deadline: '2025-10-12' }
  ]);

  const [recentQueries] = useState([
    { id: 1, student: 'John Doe', subject: 'Database Systems', query: 'Clarification on normalization concepts', time: '2 hours ago', status: 'pending' },
    { id: 2, student: 'Jane Smith', subject: 'Operating Systems', query: 'Doubt regarding deadlock prevention', time: '5 hours ago', status: 'answered' },
    { id: 3, student: 'Mike Johnson', subject: 'Database Systems', query: 'Question about transaction isolation', time: '1 day ago', status: 'pending' }
  ]);

  const stats = [
    { label: 'Pending Evaluations', value: '12', icon: '📝', color: '#3b82f6' },
    { label: 'Total Students', value: '150', icon: '👥', color: '#10b981' },
    { label: 'Pending Queries', value: '8', icon: '💬', color: '#f59e0b' },
    { label: 'Upcoming Classes', value: '5', icon: '📚', color: '#ef4444' }
  ];

  return (
    <div className="dashboard-layout">
      <Navbar userRole="faculty" userName="Dr. Sarah Wilson" onLogout={onLogout} />
      <div className="dashboard-container">
        <Sidebar userRole="faculty" />
        <main className="dashboard-main">
          <div className="dashboard-content">
            <div className="welcome-section">
              <div>
                <h1 className="dashboard-title">Welcome, Dr. Wilson! 👋</h1>
                <p className="dashboard-subtitle">Here's an overview of your teaching activities.</p>
              </div>
              <Link to="/faculty/assignments" className="btn btn-primary">
                View All Assignments
              </Link>
            </div>

            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card" style={{ borderLeft: `4px solid ${stat.color}` }}>
                  <div className="stat-icon" style={{ background: `${stat.color}15` }}>
                    <span style={{ fontSize: '28px' }}>{stat.icon}</span>
                  </div>
                  <div className="stat-details">
                    <p className="stat-label">{stat.label}</p>
                    <h3 className="stat-value">{stat.value}</h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="dashboard-grid">
              <div className="dashboard-card">
                <div className="card-header-flex">
                  <h3 className="card-title">Pending Assignments</h3>
                  <Link to="/faculty/assignments" className="view-all-link">View All →</Link>
                </div>
                <div className="assignments-list">
                  {pendingAssignments.map(assignment => (
                    <div key={assignment.id} className="assignment-item">
                      <div className="assignment-info">
                        <span className="assignment-subject">{assignment.subject}</span>
                        <h4 className="assignment-title">{assignment.title}</h4>
                        <p className="assignment-due">Deadline: {assignment.deadline}</p>
                      </div>
                      <div className="assignment-status">
                        <div className="submission-progress">
                          <span className="progress-text">{assignment.submissions}/{assignment.total} submitted</span>
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{ width: `${(assignment.submissions / assignment.total) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <Link to={`/faculty/assignments/evaluate/${assignment.id}`} className="btn-small btn-primary">
                          Evaluate
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="dashboard-card">
                <div className="card-header-flex">
                  <h3 className="card-title">Recent Queries</h3>
                  <Link to="/faculty/queries" className="view-all-link">View All →</Link>
                </div>
                <div className="queries-list">
                  {recentQueries.map(query => (
                    <div key={query.id} className="query-item">
                      <div className="query-header">
                        <div className="student-avatar">{query.student.charAt(0)}</div>
                        <div className="query-info">
                          <h4 className="student-name">{query.student}</h4>
                          <span className="query-subject">{query.subject}</span>
                        </div>
                        <span className={`status-badge status-${query.status}`}>
                          {query.status}
                        </span>
                      </div>
                      <p className="query-text">{query.query}</p>
                      <span className="query-time">{query.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <h3 className="card-title">Quick Actions</h3>
              <div className="quick-actions">
                <Link to="/faculty/assignments/create" className="action-card">
                  <span className="action-icon">➕</span>
                  <span className="action-label">Create Assignment</span>
                </Link>
                <Link to="/faculty/calendar" className="action-card">
                  <span className="action-icon">📅</span>
                  <span className="action-label">Schedule Event</span>
                </Link>
                <Link to="/faculty/students" className="action-card">
                  <span className="action-icon">👥</span>
                  <span className="action-label">View Students</span>
                </Link>
                <Link to="/faculty/queries" className="action-card">
                  <span className="action-icon">💬</span>
                  <span className="action-label">Answer Queries</span>
                </Link>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default FacultyDashboard;