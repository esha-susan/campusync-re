import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ userRole }) => {
  const location = useLocation();

  const studentMenuItems = [
    { path: '/student/dashboard', icon: '🏠', label: 'Dashboard' },
    { path: '/student/assignments', icon: '📚', label: 'Assignments' },
    { path: '/student/calendar', icon: '📅', label: 'Calendar' },
    { path: '/student/activities', icon: '🏆', label: 'Activities' },
    { path: '/student/queries', icon: '💬', label: 'Queries' }
  ];

  const facultyMenuItems = [
    { path: '/faculty/dashboard', icon: '🏠', label: 'Dashboard' },
    { path: '/faculty/assignments', icon: '📚', label: 'Assignments' },
    { path: '/faculty/calendar', icon: '📅', label: 'Calendar' },
    { path: '/faculty/queries', icon: '💬', label: 'Queries' },
    { path: '/faculty/students', icon: '👥', label: 'Students' }
  ];

  const adminMenuItems = [
    { path: '/admin/dashboard', icon: '🏠', label: 'Dashboard' },
    { path: '/admin/users', icon: '👥', label: 'User Management' },
    { path: '/admin/calendar', icon: '📅', label: 'Events' },
    { path: '/admin/activities', icon: '🏆', label: 'Activity Approvals' },
    { path: '/admin/queries', icon: '💬', label: 'Queries' },
    { path: '/admin/reports', icon: '📊', label: 'Reports' }
  ];

  const getMenuItems = () => {
    switch(userRole) {
      case 'student': return studentMenuItems;
      case 'faculty': return facultyMenuItems;
      case 'admin': return adminMenuItems;
      default: return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="help-card">
            <div className="help-icon">💡</div>
            <h4 className="help-title">Need Help?</h4>
            <p className="help-text">Check our documentation or contact support</p>
            <button className="help-button">Get Help</button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;