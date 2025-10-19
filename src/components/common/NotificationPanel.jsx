import React from 'react';
import './NotificationPanel.css'; // We will create this CSS

const NotificationPanel = ({ notifications, onClose }) => {
  // Simple function to get an icon based on notification type
  const getIcon = (type) => {
    switch(type) {
      case 'NEW_EVENT': return '📅';
      case 'ASSIGNMENT_GRADED': return '📝';
      case 'CERTIFICATE_APPROVED': return '🏆';
      case 'QUERY_RESPONSE': return '💬';
      case 'QUERY_NEW': return '📩';
      case 'CERTIFICATE_PENDING': return '⏳';
      default: return '🔔';
    }
  };

  return (
    <>
      <div className="notification-overlay" onClick={onClose}></div>
      <div className="notification-panel">
        <div className="panel-header">
          <h3>Notifications</h3>
          {/* In a real app, a "Mark all as read" button would go here */}
        </div>
        <ul className="notification-list">
          {notifications.length > 0 ? (
            notifications.map(notif => (
              <li key={notif.id} className={`notification-item ${!notif.read ? 'unread' : ''}`}>
                <div className="notification-icon">{getIcon(notif.type)}</div>
                <div className="notification-content">
                  <p className="notification-message">{notif.message}</p>
                  <span className="notification-timestamp">{notif.timestamp}</span>
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