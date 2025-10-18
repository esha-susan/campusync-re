import React from 'react';
// --- 1. Use NavLink instead of Link and useLocation ---
import { NavLink } from 'react-router-dom';
import './SideBar.css'; // Your existing CSS file

const Sidebar = ({ userRole }) => {
  // --- 2. Corrected paths to match your App.jsx router ---
  const studentMenuItems = [
    { path: '/dashboard', icon: '🏠', label: 'Dashboard' },
    { path: '/student/assignments', icon: '📚', label: 'Assignments' },
    { path: '/calendar', icon: '📅', label: 'Calendar' },
    { path: '/activities', icon: '🏆', label: 'Activities' },
    { path: '/submit-query', icon: '💬', label: 'Queries' } // Correct path for submitting a query
  ];

  const facultyMenuItems = [
    { path: '/dashboard', icon: '🏠', label: 'Dashboard' },
    { path: '/faculty/assignments', icon: '📚', label: 'Assignments' },
    { path: '/calendar', icon: '📅', label: 'Calendar' },
    { path: '/faculty/queries', icon: '💬', label: 'Queries' },
    // { path: '/faculty/students', icon: '👥', label: 'Students' }
  ];

  const adminMenuItems = [
    { path: '/dashboard', icon: '🏠', label: 'Dashboard' },
    { path: '/admin/users', icon: '👥', label: 'User Management' },
    // { path: '/admin/calendar', icon: '📅', label: 'Events' },
    { path: '/admin/activities', icon: '🏆', label: 'Activity Approvals' },
    { path: '/admin/queries', icon: '💬', label: 'Queries' },
    // { path: '/admin/reports', icon: '📊', label: 'Reports' }
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
          <ul> {/* Use <ul> for semantic list */}
            {menuItems.map((item) => (
              <li key={item.path}>
                {/* --- 3. Use NavLink component --- */}
                <NavLink
                  to={item.path}
                  // This function automatically adds the 'active' class
                  className={({ isActive }) => isActive ? 'sidebar-item active' : 'sidebar-item'}
                >
                  <span className="sidebar-icon">{item.icon}</span>
                  <span className="sidebar-label">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
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