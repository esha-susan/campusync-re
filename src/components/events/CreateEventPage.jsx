
import React from 'react';
import SideBar from '../common/SideBar'; // Adjust import path as needed
import Navbar from '../common/Navbar';   // Adjust import path as needed
import CreateEvent from './CreateEvent'; // The form component we just made

const CreateEventPage = ({ user, onLogout }) => {
  if (!user) {
    return <div>Loading...</div>; // Or a proper loader
  }

  return (
    <div className="layout-wrapper">
      <SideBar userRole={user.role} />
      <div className="main-content-wrapper">
        <Navbar userName={user.name} onLogout={onLogout} />
        <main className="page-content" style={{ padding: '2rem' }}>
          <CreateEvent />
        </main>
      </div>
    </div>
  );
};

export default CreateEventPage;