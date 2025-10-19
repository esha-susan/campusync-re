import React, { useState, useEffect } from 'react';
import { getNotificationsForUser } from '../../services/notificationService';
import NotificationPanel from './NotificationPanel';
import './Navbar.css'; // This CSS will be replaced

const Navbar = ({ userName, userRole, onLogout }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const mockUserId = userRole === 'student' ? 101 : 201;

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await getNotificationsForUser(userRole, mockUserId);
      setNotifications(data);
      setHasUnread(data.some(n => !n.read));
    };
    fetchNotifications();
  }, [userRole, mockUserId]);

  return (
    <>
      <header className="navbar-container">
        <div className="navbar-section navbar-left"></div>

        <div className="navbar-section navbar-center">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search..." />
          </div>
        </div>

        <div className="navbar-section navbar-right">
          <div className="notification-bell" onClick={() => setShowNotifications(true)}>
            <span className="bell-icon">🔔</span>
            {hasUnread && <div className="unread-dot"></div>}
          </div>

          <div className="user-profile">
            <div className="user-avatar">{userName ? userName.charAt(0) : 'U'}</div>
            {/* Using simple divs for text for maximum style control */}
            <div className="user-text-info">
              <div className="user-name">{userName || 'User'}</div>
              <div className="user-role-nav">{userRole || 'Student'}</div>
            </div>
          </div>
        </div>
      </header>

      {showNotifications && (
        <NotificationPanel
          notifications={notifications}
          onClose={() => setShowNotifications(false)}
        />
      )}
    </>
  );
};

export default Navbar;