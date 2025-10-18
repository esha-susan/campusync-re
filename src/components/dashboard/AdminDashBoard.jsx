import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; 
import './AdminDashBoard.css'; 

const AdminDashboard = ({ onLogout }) => {
  const [pendingApprovals] = useState([
    { id: 1, student: 'John Doe', activity: 'Hackathon Winner', points: 15, date: '2025-09-25' },
    { id: 2, student: 'Jane Smith', activity: 'Paper Presentation', points: 10, date: '2025-09-22' },
    { id: 3, student: 'Mike Johnson', activity: 'Workshop Participation', points: 5, date: '2025-09-20' }
  ]);
  const [recentUsers] = useState([
    { id: 1, name: 'Alice Brown', role: 'student', department: 'CSE', joined: '2025-09-28' },
    { id: 2, name: 'Bob Wilson', role: 'faculty', department: 'ECE', joined: '2025-09-27' },
    { id: 3, name: 'Carol Davis', role: 'student', department: 'ME', joined: '2025-09-26' }
  ]);
  const stats = [
    { label: 'Total Users', value: '1,234', icon: '👥', color: '#3b82f6' },
    { label: 'Pending Approvals', value: '18', icon: '⏳', color: '#f59e0b' },
    { label: 'Active Events', value: '12', icon: '📅', color: '#10b981' },
    { label: 'Open Queries', value: '25', icon: '💬', color: '#ef4444' }
  ];
  const handleApprove = (id) => { alert(`Approved activity #${id}`); };
  const handleReject = (id) => { alert(`Rejected activity #${id}`); };

  return (
    <div className="dashboard-layout">
      <main className="dashboard-main">
        <div className="dashboard-content-wide">
          <div className="page-header">
            <div>
              <h1 className="page-title"><span className="gradient-text">Admin Dashboard</span></h1>
              <p className="page-subtitle">Manage users, approvals, and system settings.</p>
            </div>
            <Link to="/admin/users" className="btn btn-primary">Manage Users</Link>
          </div>

          <div className="stats-grid">
            {stats.map((stat, index) => {
              const statCardContent = (
                <>
                  <div className="stat-icon" style={{ backgroundColor: `${stat.color}1A`, color: stat.color }}>
                    <span>{stat.icon}</span>
                  </div>
                  <div className="stat-details">
                    <p className="stat-label">{stat.label}</p>
                    <h3 className="stat-value">{stat.value}</h3>
                  </div>
                </>
              );
              if (stat.label === 'Open Queries') {
                return (
                  <Link to="/admin/queries" key={index} className="stat-card" style={{ textDecoration: 'none' }}>
                    {statCardContent}
                  </Link>
                );
              }
              return (
                <div key={index} className="stat-card">
                  {statCardContent}
                </div>
              );
            })}
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-card">
              <div className="card-header-flex">
                <h3 className="card-title">Pending Activity Approvals</h3>
                <Link to="/admin/activities" className="view-all-link">View All →</Link>
              </div>
              <div className="approvals-list">
                {pendingApprovals.map(approval => (
                  <div key={approval.id} className="approval-item">
                    <div className="approval-info">
                      <h4 className="student-name">{approval.student}</h4>
                      <p className="activity-name">{approval.activity}</p>
                    </div>
                    <div className="approval-actions">
                      <button onClick={() => handleApprove(approval.id)} className="btn-small btn-success">Approve</button>
                      <button onClick={() => handleReject(approval.id)} className="btn-small btn-danger">Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-header-flex">
                <h3 className="card-title">Recently Added Users</h3>
                <Link to="/admin/users" className="view-all-link">View All →</Link>
              </div>
              <div className="users-list">
                {recentUsers.map(user => (
                  <div key={user.id} className="user-item">
                    <div className="user-avatar">{user.name.charAt(0)}</div>
                    <div className="user-info">
                      <h4 className="user-name">{user.name}</h4>
                      <p className="user-meta">{user.role} • {user.department}</p>
                    </div>
                    <span className="joined-date">Joined {user.joined}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="dashboard-card full-width-card">
            <h3 className="card-title">Quick Actions</h3>
            <div className="quick-actions">
                {/* Your Quick Actions Links Go Here */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;