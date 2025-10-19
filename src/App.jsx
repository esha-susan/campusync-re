import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

// --- SERVICE IMPORTS ---
import { getLoggedInUserData } from './services/authService';

// --- PAGE & COMPONENT IMPORTS ---
// Landing & Auth
import LogoSplash from './components/landing/LogoSplash';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import LandingPage from './components/landing/LandingPage';
import FeaturesPage from './components/landing/FeaturesPage';

// Shared Components
import ProfilePage from './components/profile/ProfilePage';
import DashboardRouter from './components/dashboard/DashboardRouter';
import SmartCalendar from './components/calendar/SmartCalendar';

// Communication Components
import QueryForm from './components/communication/QueryForm';
import QueryListPage from './components/communication/QueryListPage';
import QueryDetailPage from './components/communication/QueryDetailPage';

// Assignment Components
import AssignmentList from './components/assignments/AssignmentList';
import AssignmentSubmit from './components/assignments/AssignmentSubmit';
import AssignmentEvaluate from './components/assignments/AssignmentEvaluate';
import CreateAssignmentPage from './components/faculty/CreateAssignmentPage';

// Activity Components
import ActivityHub from './components/activities/ActivityHub';
import ActivityPoints from './components/activities/ActivityPoints';
import SubmitCertificate from './components/activities/SubmitCertificate';

// Admin & Event Components
import AdminSettingsPage from './components/admin/AdminSettingsPage';
import CreateEventPage from './events/CreateEventPage';
// ========================== THIS IS THE ONLY CHANGE ==========================
// 1. Import the new CreateUserPage component
import CreateUserPage from './components/admin/CreateUserPage';
// ===========================================================================

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole, setUserRole] = useState('admin'); // Set to 'admin' for testing
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setCurrentUser(null);
    navigate('/login');
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isAuthenticated && userRole) {
      const fetchUserData = async () => {
        const userData = await getLoggedInUserData(userRole);
        setCurrentUser(userData);
      };
      fetchUserData();
    }
  }, [isAuthenticated, userRole]);

  return (
    <>
      {showSplash ? <LogoSplash /> : (
        <Routes>
          {isAuthenticated && currentUser ? (
            <>
              {/* --- Core & Shared Routes --- */}
              <Route path="/profile" element={<ProfilePage user={currentUser} onLogout={handleLogout} />} />
              <Route path="/landing" element={<LandingPage onLogout={handleLogout} />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/dashboard" element={<DashboardRouter role={userRole} onLogout={handleLogout} />} />
              <Route path="/calendar" element={<SmartCalendar user={currentUser} onLogout={handleLogout} />} />

              {/* --- Assignment Routes --- */}
              <Route path="/student/assignments" element={<AssignmentList userRole="student" onLogout={handleLogout} />} />
              <Route path="/student/assignments/submit/:id" element={<AssignmentSubmit onLogout={handleLogout} />} />
              <Route path="/faculty/assignments" element={<AssignmentList userRole="faculty" onLogout={handleLogout} />} />
              <Route path="/faculty/assignments/create" element={userRole === 'faculty' ? <CreateAssignmentPage onLogout={handleLogout} /> : <Navigate to="/dashboard" />} />
              <Route path="/faculty/assignments/evaluate/:id" element={userRole === 'faculty' ? <AssignmentEvaluate onLogout={handleLogout} /> : <Navigate to="/dashboard" />} />

              {/* --- Communication / Query Routes --- */}
              <Route path="/submit-query" element={userRole === 'student' ? <QueryForm onLogout={handleLogout} /> : <Navigate to="/dashboard" />} />
              <Route path="/student/queries" element={userRole === 'student' ? <QueryListPage userRole="student" onLogout={handleLogout} /> : <Navigate to="/dashboard" />} />
              <Route path="/student/queries/:id" element={userRole === 'student' ? <QueryDetailPage userRole="student" onLogout={handleLogout} /> : <Navigate to="/dashboard" />} />
              <Route path="/faculty/queries" element={userRole === 'faculty' ? <QueryListPage userRole="faculty" onLogout={handleLogout} /> : <Navigate to="/dashboard" />} />
              <Route path="/faculty/queries/:id" element={userRole === 'faculty' ? <QueryDetailPage userRole="faculty" onLogout={handleLogout} /> : <Navigate to="/dashboard" />} />
              <Route path="/admin/queries" element={userRole === 'admin' ? <QueryListPage userRole="admin" onLogout={handleLogout} /> : <Navigate to="/dashboard" />} />
              <Route path="/admin/queries/:id" element={userRole === 'admin' ? <QueryDetailPage userRole="admin" onLogout={handleLogout} /> : <Navigate to="/dashboard" />} />

              {/* --- Activity Routes --- */}
              <Route path="/activities-hub" element={userRole === 'student' ? <ActivityHub onLogout={handleLogout} /> : <Navigate to="/dashboard" />} />
              <Route path="/student/activities" element={userRole === 'student' ? <ActivityPoints onLogout={handleLogout} /> : <Navigate to="/dashboard" />} />
              <Route path="/student/activities/submit" element={userRole === 'student' ? <SubmitCertificate onLogout={handleLogout} /> : <Navigate to="/dashboard" />} />

              {/* --- Admin-Specific Routes --- */}
              {/* ========================== THIS IS THE ONLY CHANGE ========================== */}
              {/* 2. Add the Route for the Create User page */}
              <Route path="/admin/users/create" element={userRole === 'admin' ? <CreateUserPage onLogout={handleLogout} /> : <Navigate to="/dashboard" />} />
              {/* =========================================================================== */}
              <Route path="/admin/settings" element={userRole === 'admin' ? <AdminSettingsPage onLogout={handleLogout} /> : <Navigate to="/dashboard" />} />
              <Route path="/calendar/schedule" element={userRole === 'admin' ? <CreateEventPage user={currentUser} onLogout={handleLogout} /> : <Navigate to="/dashboard" />} />
              
              {/* --- Catch-all Route --- */}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </>
          ) : (
            <>
              {/* --- PUBLIC ROUTES --- */}
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      )}
    </>
  );
}

export default App;