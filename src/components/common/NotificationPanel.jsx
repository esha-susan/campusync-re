import React from 'react';
import { Link } from 'react-router-dom';
import './NotificationPanel.css';

const NotificationPanel = ({ notifications, onClose }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'ASSIGNMENT_NEW': return '📚';
      case 'ASSIGNMENT_GRADED': return '📝';
      // --- ADD THESE TWO NEW CASES ---
      case 'QUERY_NEW': return '📩';        // Icon for new queries to faculty
      case 'QUERY_RESPONSE': return '💬'; // Icon for answered queries to students
      // -----------------------------
      default: return '🔔';
    }
  };

  return (
    <>
      <div className="notification-overlay" onClick={onClose}></div>
      <div className="notification-panel">
        <div className="panel-header">
          <h3>Notifications</h3>
        </div>
        <ul className="notification-list">
          {notifications.length > 0 ? (
            notifications.map(notif => (
              <li key={notif.id} className={`notification-item ${!notif.is_read ? 'unread' : ''}`}>
                <div className="notification-icon">{getIcon(notif.notification_type)}</div>
                <div className="notification-content">
                  <Link to={notif.target_url || '#'} className="notification-link" onClick={onClose}>
                    <p className="notification-message">{notif.message}</p>
                    <span className="notification-timestamp">
                      {new Date(notif.created_at).toLocaleString()}
                    </span>
                  </Link>
                </div>
              </li>
            ))
          ) : (
            <li className="no-notifications">You have no new notifications.</li>
          )}
        </ul>
      </div>
    </>
  );
};

export default NotificationPanel;