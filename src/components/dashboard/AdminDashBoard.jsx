import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../common/Layout'; // Use the consistent layout
import './Dashboard.css'; // Your dashboard CSS is preserved

const AdminDashboard = ({ currentUser, onLogout }) => {
  // All your original data for the dashboard cards is present
  const stats = [
    { label: 'Total Users', value: '1,234', icon: '👥', color: '#6a5acd' },
    { label: 'Pending Approvals', value: '18', icon: '⏳', color: '#f59e0b' },
    { label: 'Active Events', value: '12', icon: '📅', color: '#10b981' },
    { label: 'Open Queries', value: '25', icon: '💬', color: '#ef4444' }
  ];
  const pendingApprovals = [
    { id: 1, name: 'John Doe', activity: 'Hackathon Winner' },
    { id: 2, name: 'Jane Smith', activity: 'Paper Presentation' }
  ];
  const recentUsers = [
    { id: 1, initial: 'A', name: 'Alice Brown', role: 'student • CSE', joined: 'Joined 2025-09-28' },
    { id: 2, initial: 'B', name: 'Bob Wilson', role: 'faculty • ECE', joined: 'Joined 2025-09-27' }
  ];
  
  // ========================== THE FIX ==========================
  // These links now point to the correct original or planned routes.
  const quickActions = [
    { to: '/admin/users/create', label: 'Create User', icon: '➕' },
    { to: '/admin/users', label: 'Manage Users', icon: '👥' },
    // This link now correctly points to the main calendar page
    { to: '/calendar', label: 'Manage Events', icon: '📅' }, 
    // This link points to the new admin-specific query list page
    { to: '/admin/queries', label: 'View Queries', icon: '💬' },
    { to: '/admin/settings', label: 'System Settings', icon: '⚙️' }
  ];
  // =============================================================

  return (
    // The page is wrapped in the Layout for a consistent header and correct username
    <Layout currentUser={currentUser} onLogout={onLogout}>
      
      <div className="welcome-section">
        <div>
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <p className="dashboard-subtitle">Manage users, approvals, and system settings.</p>
        </div>
      </div>
      
      {/* ALL YOUR ORIGINAL DASHBOARD CARDS ARE PRESERVED BELOW */}
      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card" style={{ borderLeftColor: stat.color }}>
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}20` }}><span>{stat.icon}</span></div>
            <div><p className="stat-label">{stat.label}</p><h3 className="stat-value">{stat.value}</h3></div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header-flex"><h3 className="card-title">Pending Activity Approvals</h3><Link to="/admin/activities" className="view-all-link">View All →</Link></div>
          <div className="approval-list">
            {pendingApprovals.map(item => (
              <div key={item.id} className="approval-item">
                <div className="item-info"><span className="item-name">{item.name}</span><span className="item-activity">{item.activity}</span></div>
                <div className="item-actions"><button className="btn-approve">Approve</button><button className="btn-reject">Reject</button></div>
              </div>
            ))}
          </div>
        </div>
        <div className="dashboard-card">
          <div className="card-header-flex"><h3 className="card-title">Recent Users</h3><Link to="/admin/users" className="view-all-link">View All →</Link></div>
          <div className="user-list">
            {recentUsers.map(user => (
              <div key={user.id} className="user-item">
                <div className="user-avatar">{user.initial}</div>
                <div className="user-details"><h4 className="user-name">{user.name}</h4><p className="user-role">{user.role}</p></div>
                <span className="user-joined">{user.joined}</span>
              </div>
            ))}
          </div>
        </div>
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
    </Layout>
  );
};

export default AdminDashboard;