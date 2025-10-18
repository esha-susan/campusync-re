import React from 'react';
import './Profile.css';
import { hasPermission } from '../../utils/permissions'; // We will create this file next

const Profile = ({ user }) => {
  // Show a loading state if user data hasn't been fetched yet
  if (!user) {
    return <div className="loading-profile">Loading profile...</div>;
  }

  return (
    <div className="profile-layout">
      <main className="profile-content">
        <div className="profile-container">
          <div className="profile-header">
            <img 
              src={user.profilePicture || 'https://via.placeholder.com/150'} 
              alt="Profile" 
              className="profile-picture" 
            />
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-role">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
          </div>

          <div className="profile-details">
            <h3 className="details-title">User Information</h3>
            <ul>
              <li><strong>Email:</strong> {user.email}</li>
              <li><strong>User ID:</strong> {user.id}</li>
              {/* Add more user-specific details here */}
            </ul>
          </div>

          {/* This section will only appear for users with 'admin' role */}
          {hasPermission(user, 'viewAdminDashboard') && (
            <div className="admin-actions">
              <h3 className="details-title">Admin Controls</h3>
              <p>You have administrative privileges.</p>
              <button className="btn btn-secondary">Access Admin Panel</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;