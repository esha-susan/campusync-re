// src/components/profile/Profile.jsx

import React from 'react';
import './Profile.css';

const Profile = ({ user }) => {
  // Show a loading state if user data hasn't been passed down yet
  if (!user) {
    return <div className="loading-profile">Loading profile...</div>;
  }

  // Use the correct property names from your 'currentUser' object
  const userName = user.full_name || user.email;
  const userRole = user.role || 'User';

  return (
    <div className="profile-container">
      <div className="profile-header">
        {/* --- DYNAMIC & UNIQUE AVATAR --- */}
        {/* This uses a free, no-setup API to generate a unique SVG avatar */}
        {/* based on the user's name. Every user gets a different one! */}
        <img 
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${userName}`} 
          alt="Profile Avatar" 
          className="profile-picture" 
        />
        <h2 className="profile-name">{userName}</h2>
        <p className="profile-role">{userRole.charAt(0).toUpperCase() + userRole.slice(1)}</p>
      </div>

      <div className="profile-details">
        <h3 className="details-title">User Information</h3>
        <ul>
          <li><strong>Email:</strong> {user.email}</li>
          <li><strong>User ID:</strong> {user.id}</li>
          {/* You can add more details from your 'users' table here later */}
        </ul>
      </div>

      {/* Example of a section for a specific role (Admin) */}
      {userRole === 'admin' && (
        <div className="admin-actions">
          <h3 className="details-title">Admin Controls</h3>
          <p>You have administrative privileges.</p>
          <button className="btn btn-secondary">Access Admin Panel</button>
        </div>
      )}
    </div>
  );
};

export default Profile;