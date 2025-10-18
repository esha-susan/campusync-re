import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import Navbar from '../common/Navbar';
// import Sidebar from '../common/Sidebar';
// import Footer from '../common/Footer';
import './StudentDashBoard.css'; // This is the new, correct CSS file

const StudentDashboard = ({ onLogout }) => {
  const [upcomingEvents] = useState([
    { id: 1, title: 'Tech Fest 2025', date: '2025-10-15', time: '10:00 AM', type: 'fest' },
    { id: 2, title: 'Database Systems Assignment', date: '2025-10-05', time: '11:59 PM', type: 'deadline' },
    { id: 3, title: 'Workshop on AI/ML', date: '2025-10-10', time: '2:00 PM', type: 'workshop' }
  ]);
  const [recentAssignments] = useState([
    { id: 1, subject: 'Database Systems', title: 'ER Diagram Design', dueDate: '2025-10-05', status: 'pending' },
    { id: 2, subject: 'Operating Systems', title: 'Process Scheduling', dueDate: '2025-10-08', status: 'submitted' },
    { id: 3, subject: 'Computer Networks', title: 'TCP/IP Analysis', dueDate: '2025-10-12', status: 'graded', grade: 'A' }
  ]);
  const stats = [
    { label: 'Pending Assignments', value: '3', icon: '📚', color: '#3b82f6' },
    { label: 'Activity Points', value: '45', icon: '🏆', color: '#10b981' },
    { label: 'Upcoming Events', value: '5', icon: '📅', color: '#f59e0b' },
    { label: 'Unread Queries', value: '2', icon: '💬', color: '#ef4444' }
  ];

  return (
    <div className="dashboard-layout">
      {/* <Navbar ... /> */}
      <div className="dashboard-container">
        {/* <Sidebar ... /> */}
        <main className="dashboard-main">
          <div className="dashboard-content">
            <div className="welcome-section">
              <div>
                <h1 className="dashboard-title">Welcome back, John! 👋</h1>
                <p className="dashboard-subtitle">Here's what's happening with your academics today.</p>
              </div>
              <Link to="/student/assignments" className="btn btn-primary-link">
                View All Assignments
              </Link>
            </div>

            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card" style={{ borderLeftColor: stat.color }}>
                  <div className="stat-icon" style={{ backgroundColor: `${stat.color}1A`, color: stat.color }}>
                    <span>{stat.icon}</span>
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
                  <h3 className="card-title">Recent Assignments</h3>
                  <Link to="/student/assignments" className="view-all-link">View All →</Link>
                </div>
                <div className="assignments-list">
                  {recentAssignments.map(assignment => (
                    <div key={assignment.id} className="assignment-item">
                      <div className="assignment-info">
                        <span className="assignment-subject">{assignment.subject}</span>
                        <h4 className="assignment-title">{assignment.title}</h4>
                        <p className="assignment-due">Due: {assignment.dueDate}</p>
                      </div>
                      <div className="assignment-status">
                        {assignment.status === 'pending' ? (
                          <Link to={`/student/assignments/submit/${assignment.id}`} className="btn-small btn-primary">
                            Submit
                          </Link>
                        ) : (
                          <span className={`status-badge status-${assignment.status}`}>
                            {assignment.status === 'graded' ? `Grade: ${assignment.grade}` : assignment.status}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="dashboard-card">
                <div className="card-header-flex">
                  <h3 className="card-title">Upcoming Events</h3>
                  <Link to="/calendar" className="view-all-link">View Calendar →</Link>
                </div>
                <div className="events-list">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="event-item">
                      <div className="event-date">
                        <span className="event-day">{new Date(event.date).getDate()}</span>
                        <span className="event-month">{new Date(event.date).toLocaleString('default', { month: 'short' }).toUpperCase()}</span>
                      </div>
                      <div className="event-details">
                        <h4 className="event-title">{event.title}</h4>
                        <p className="event-time">
                          <span className="time-icon">🕐</span>{event.time}
                        </p>
                        <span className={`event-type type-${event.type}`}>{event.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <h3 className="card-title">Quick Actions</h3>
              <div className="quick-actions">
                <Link to="/student/assignments/submit/new" className="action-card">
                  <span className="action-icon">📤</span>
                  <span className="action-label">Submit Assignment</span>
                </Link>
                <Link to="/student/activities/submit" className="action-card">
                  <span className="action-icon">📄</span>
                  <span className="action-label">Submit Certificate</span>
                </Link>
                <Link to="/calendar" className="action-card">
                  <span className="action-icon">📅</span>
                  <span className="action-label">View Calendar</span>
                </Link>
                <Link to="/submit-query" className="action-card">
                  <span className="action-icon">💬</span>
                  <span className="action-label">Ask Query</span>
                </Link>
              </div>
            </div>
          </div>
          {/* <Footer /> */}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;