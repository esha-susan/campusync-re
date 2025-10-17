import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ userRole, userName = 'User', onLogout }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: 'New assignment posted in Database Systems', time: '2 hours ago', unread: true },
    { id: 2, text: 'Event registration deadline tomorrow', time: '5 hours ago', unread: true },
    { id: 3, text: 'Your certificate has been approved', time: '1 day ago', unread: false }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to={`/${userRole}/dashboard`} className="navbar-brand">
            <div className="brand-icon">C</div>
            <span className="brand-name">Campusync</span>
          </Link>
        </div>

        <div className="navbar-right">
          <div className="navbar-search">
            <input 
              type="text" 
              placeholder="Search..." 
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="navbar-actions">
            <div className="notification-container">
              <button 
                className="icon-button"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <span className="icon">🔔</span>
                {unreadCount > 0 && <span className="badge-count">{unreadCount}</span>}
              </button>

              {showNotifications && (
                <div className="dropdown-menu notifications-menu">
                  <div className="dropdown-header">
                    <h4>Notifications</h4>
                    <button className="mark-read-btn">Mark all read</button>
                  </div>
                  <div className="notifications-list">
                    {notifications.map(notif => (
                      <div key={notif.id} className={`notification-item ${notif.unread ? 'unread' : ''}`}>
                        <p className="notification-text">{notif.text}</p>
                        <span className="notification-time">{notif.time}</span>
                      </div>
                    ))}
                  </div>
                  <div className="dropdown-footer">
                    <Link to={`/${userRole}/notifications`}>View all notifications</Link>
                  </div>
                </div>
              )}
            </div>

            <div className="profile-container">
              <button 
                className="profile-button"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <div className="profile-avatar">{userName.charAt(0).toUpperCase()}</div>
                <div className="profile-info">
                  <span className="profile-name">{userName}</span>
                  <span className="profile-role">{userRole}</span>
                </div>
                <span className="dropdown-arrow">▼</span>
              </button>

              {showProfileMenu && (
                <div className="dropdown-menu profile-menu">
                  <Link to={`/${userRole}/profile`} className="dropdown-item">
                    <span className="item-icon">👤</span>
                    My Profile
                  </Link>
                  <Link to={`/${userRole}/settings`} className="dropdown-item">
                    <span className="item-icon">⚙️</span>
                    Settings
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button onClick={onLogout} className="dropdown-item logout-item">
                    <span className="item-icon">🚪</span>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;