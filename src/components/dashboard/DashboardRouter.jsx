import React from 'react';
import { Navigate } from 'react-router-dom';

// Import all three of your dashboard components
import StudentDashboard from './StudentDashBoard';
import FacultyDashboard from './FacultyDashBoard';
import AdminDashboard from './AdminDashBoard';

const DashboardRouter = ({ role, onLogout }) => {
  // Use a switch statement to determine which component to render
  switch (role) {
    case 'student':
      return <StudentDashboard onLogout={onLogout} />;
    case 'faculty':
      return <FacultyDashboard onLogout={onLogout} />;
    case 'admin':
      return <AdminDashboard onLogout={onLogout} />;
    default:
      // If the role is unknown or not set, redirect to the landing page
      return <Navigate to="/landing" />;
  }
};

export default DashboardRouter;