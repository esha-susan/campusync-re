import React, { useState } from 'react'; // 1. Import useState
import { Link, NavLink } from 'react-router-dom';
import HelpModal from './HelpModal'; // 2. Import the new modal component
import './SideBar.css';

const Sidebar = ({ userRole }) => {
  // 3. Add state to manage the modal's visibility
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  // You can customize the menu items based on the userRole if needed
  const menuItems = [
    { path: '/dashboard', icon: '🏠', label: 'Dashboard' },
    { path: '/student/assignments', icon: '📚', label: 'Assignments' },
    { path: '/calendar', icon: '📅', label: 'Calendar' },
    { path: '/activities', icon: '🏆', label: 'Activities' },
    { path: '/student/queries', icon: '💬', label: 'My Queries' }
  ];

  return (
    <> {/* Use a Fragment to wrap the sidebar and the modal */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <Link to="/landing" className="logo-link">
            <div className="logo">C</div>
            <span className="logo-text">Campusync</span>
          </Link>
        </div>
        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}
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
            {/* 4. The button now opens the modal */}
            <button className="help-button" onClick={() => setIsHelpModalOpen(true)}>
              Get Help
            </button>
          </div>
        </div>
      </aside>

      {/* 5. Conditionally render the modal based on the state */}
      {isHelpModalOpen && <HelpModal onClose={() => setIsHelpModalOpen(false)} />}
    </>
  );
};

export default Sidebar;