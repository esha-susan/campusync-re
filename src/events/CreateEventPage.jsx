import React from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/common/SideBar';
import Navbar from '../components/common/Navbar';
import CreateEvent from './CreateEvent';

const CreateEventPage = ({ user, onLogout }) => {
  const navigate = useNavigate();

  // This function will be passed to the child form component
  // and will be called on successful event creation to handle the redirect.
  const handleEventCreated = (newEvent) => {
    console.log('Event created successfully in child form. Redirecting...', newEvent);
    navigate('/calendar');
  };

  // Check for the user object before rendering the main content
  if (!user) {
    return <div>Loading user data...</div>; // Or a more sophisticated loader
  }

  return (
    <div className="layout-wrapper">
      <SideBar userRole={user.role} />
      <div className="main-content-wrapper">
        <Navbar userName={user.name} onLogout={onLogout} />
        <main className="page-content" style={{ padding: '2rem' }}>
          {/* Pass the handler function as a prop to the reusable form */}
          <CreateEvent onEventCreated={handleEventCreated} />
        </main>
      </div>
    </div>
  );
};

export default CreateEventPage;