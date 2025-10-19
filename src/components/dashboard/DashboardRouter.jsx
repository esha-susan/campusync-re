import React from 'react';
import { Navigate } from 'react-router-dom';

const DashboardRouter = ({ role }) => {
  switch (role) {
    case 'student':
      return <Navigate to="/student/dashboard" />;
    case 'faculty':
      return <Navigate to="/faculty/dashboard" />;
    case 'admin':
      return <Navigate to="/admin/dashboard" />;
    default:
      return <Navigate to="/landing" />;
  }
};

export default DashboardRouter;