import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/SideBar';
import Footer from '../common/Footer';
import './Dashboard.css'; // Import the unified CSS

const StudentDashboard = ({ onLogout }) => {
  const stats = [ { label: 'Pending Assignments', value: '3', icon: '📝', color: '#3b82f6' }, { label: 'Activity Points', value: '', icon: '⭐', color: '#10b981' }, { label: 'Answered Queries', value: '2', icon: '💬', color: '#f59e0b' }, { label: 'Upcoming Deadlines', value: '4', icon: '📅', color: '#ef4444' }];
  const quickActions = [ { to: '/student/assignments', label: 'View Assignments', icon: '📚' }, { to: '/student/queries', label: 'My Queries', icon: '💬' }, { to: '/student/activities', label: 'Activity Points', icon: '🏆' }, { to: '/calendar', label: 'View Calendar', icon: '📅' }];

  return (
    <div className="layout-wrapper">
      <Sidebar userRole="student" />
      <div className="main-content-wrapper">
        <Navbar userName="John Doe" userRole="Student" onLogout={onLogout} />
        <main className="dashboard-main">
          <div className="dashboard-content">
            <div className="welcome-section">
              <div><h1 className="dashboard-title">Welcome! 👋</h1><p className="dashboard-subtitle">Here's what's new for you today.</p></div>
            </div>
            <div className="stats-grid">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-card" style={{ borderLeftColor: stat.color }}>
                  <div className="stat-icon" style={{ backgroundColor: `${stat.color}20` }}><span>{stat.icon}</span></div>
                  <div><p className="stat-label">{stat.label}</p><h3 className="stat-value">{stat.value}</h3></div>
                </div>
              ))}
            </div>
            <div className="dashboard-card"><h3 className="card-title">Quick Actions</h3>
              <div className="quick-actions">
                {quickActions.map((action) => (
                  <Link key={action.label} to={action.to} className="action-card">
                    <span className="action-icon">{action.icon}</span><span className="action-label">{action.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};
export default StudentDashboard;