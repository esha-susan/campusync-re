// src/components/profile/ProfilePage.jsx

import React from 'react';
import Profile from './Profile'; // The component that displays the profile
import './Profile.css';     // Import the beautiful styles

const ProfilePage = ({ currentUser, onLogout }) => {
  // NOTE: This component is now rendered inside your main Layout via App.jsx,
  // so we don't need to add Navbar or Sidebar here.
  
  return (
    <div className="profile-page-container">
      <div className="page-header">
        <h1 className="page-title">My Profile</h1>
        <p className="page-subtitle">View and manage your personal information.</p>
      </div>
      
      {/* The Profile component does all the visual work */}
      <Profile user={currentUser} />
    </div>
  );
};

export default ProfilePage;