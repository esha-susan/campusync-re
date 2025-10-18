import React from 'react';

// Assuming your Sidebar and Navbar are in these locations
import SideBar from '../common/SideBar'; // Adjust the import path if necessary
import Navbar from '../common/Navbar';   // Adjust the import path if necessary
import Profile from './Profile';       // The profile content component

// This component now acts as the main page for the /profile route
const ProfilePage = ({ user, onLogout }) => {
  // If user data is still loading, show a general loading screen
  if (!user) {
    return <div>Loading...</div>; // Or a more styled loader component
  }

  return (
    <div className="layout-wrapper"> {/* Use your app's main layout class */}
      <SideBar userRole={user.role} />
      <div className="main-content-wrapper"> {/* Use your app's content wrapper class */}
        {/* Pass user name and logout function to the Navbar */}
        <Navbar userName={user.name} onLogout={onLogout} />
        
        <main className="page-content">
          {/* The Profile component now just displays the content */}
          <div className="profile-page-container">
            <Profile user={user} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;