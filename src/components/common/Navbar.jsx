import React, { useState, useEffect } from 'react';
import { getNotificationsForUser, markNotificationAsRead } from '../../services/notificationService';
import { supabase } from '../../../Supabaseclient'; // Make sure path is correct
import NotificationPanel from './NotificationPanel';
import './Navbar.css';

const Navbar = ({ currentUser, onLogout }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const userName = currentUser?.full_name || currentUser?.email;
  const userRole = currentUser?.role;

  // This is the correct, real-time fetch logic
  const fetchNotifications = async () => {
    if (!currentUser) return;
    try {
      const data = await getNotificationsForUser();
      setNotifications(data);
      setUnreadCount(data.filter(n => !n.is_read).length);
    } catch (error) {
      console.error("Failed to load notifications.", error);
    }
  };

  useEffect(() => {
    fetchNotifications();

    // Set up a real-time listener for new notifications
    const channel = supabase
      .channel('public:notifications')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications' }, 
        (payload) => {
          fetchNotifications(); // Re-fetch data when a new notification arrives
        }
      )
      .subscribe();

    // Cleanup subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUser]);

  const handleCloseNotifications = () => {
    setShowNotifications(false);
    notifications.forEach(notif => {
      if (!notif.is_read) {
        markNotificationAsRead(notif.id);
      }
    });
    setUnreadCount(0);
  };

  return (
    <>
      <header className="navbar-container">
        <div className="navbar-section navbar-left">
          {/* You can add a title or breadcrumbs here if needed */}
        </div>
        
        <div className="navbar-section navbar-right">
          <div className="notification-bell" onClick={() => setShowNotifications(true)}>
            <span role="img" aria-label="Notifications">🔔</span>
            {unreadCount > 0 && <div className="unread-badge">{unreadCount}</div>}
          </div>

          <div className="user-profile">
            <div className="user-avatar">{userName ? userName.charAt(0).toUpperCase() : 'U'}</div>
            <div className="user-text-info">
              <div className="user-name">{userName || 'User'}</div>
              <div className="user-role-nav">{userRole || 'Role'}</div>
            </div>
          </div>
          <button onClick={onLogout} className="logout-button">Logout</button>
        </div>
      </header>

      {showNotifications && (
        <NotificationPanel
          notifications={notifications}
          onClose={handleCloseNotifications}
        />
      )}
    </>
  );
};

export default Navbar;