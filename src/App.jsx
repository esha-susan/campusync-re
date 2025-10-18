import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

// --- SERVICE AND PAGE COMPONENT IMPORTS ---
import { getLoggedInUserData } from './services/authService';
import ProfilePage from './components/profile/ProfilePage';

// --- EXISTING COMPONENT IMPORTS ---
import LogoSplash from './components/landing/LogoSplash';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import LandingPage from './components/landing/LandingPage';
import FeaturesPage from './components/landing/FeaturesPage';
import DashboardRouter from './components/dashboard/DashboardRouter';
import SmartCalendar from './components/calendar/SmartCalendar';
import QueryForm from './components/communication/QueryForm';
import QueryListPage from './components/communication/QueryList';
import AssignmentSubmit from './components/assignments/AssignmentSubmit';
import AssignmentList from './components/assignments/AssignmentList';
import AssignmentEvaluate from './components/assignments/AssignmentEvaluate';
import ActivityHub from './components/activities/ActivityHub';
import ActivityPoints from './components/activities/ActivityPoints';
import SubmitCertificate from './components/activities/SubmitCertificate';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole, setUserRole] = useState('student'); // Change this to 'admin' or 'student' to test
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
          {isAuthenticated && currentUser ? ( // Wait for currentUser to be loaded
            <>
              <Route path="/landing" element={<LandingPage onLogout={handleLogout} />} />
              <Route path="/profile" element={<ProfilePage user={currentUser} onLogout={handleLogout} />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/dashboard" element={<DashboardRouter role={userRole} onLogout={handleLogout} />} />
              <Route path="/student/dashboard" element={<DashboardRouter role={userRole} onLogout={handleLogout} />} />
              
              {/* THIS ROUTE NOW PASSES THE ENTIRE 'user' OBJECT */}
              <Route 
                path="/calendar" 
                element={<SmartCalendar user={currentUser} onLogout={handleLogout} />} 
              />
              
              <Route path="/submit-query" element={<QueryForm onLogout={handleLogout} />} />
              <Route path="/student/assignments" element={<AssignmentList userRole="student" onLogout={handleLogout} />} />
              <Route path="/student/assignments/submit/:id" element={<AssignmentSubmit onLogout={handleLogout} />} />
              <Route path="/activities-hub" element={userRole === 'student' ? <ActivityHub /> : <Navigate to="/dashboard" />} />
              <Route path="/student/activities" element={userRole === 'student' ? <ActivityPoints onLogout={handleLogout} /> : <Navigate to="/dashboard" />} />
              <Route path="/activities" element={userRole === 'student' ? <ActivityPoints onLogout={handleLogout} /> : <Navigate to="/dashboard" />} />
              <Route path="/student/activities/submit" element={userRole === 'student' ? <SubmitCertificate onLogout={handleLogout} /> : <Navigate to="/dashboard" />} />
              <Route path="/faculty/assignments" element={userRole === 'faculty' ? <AssignmentList userRole="faculty" /> : <Navigate to="/dashboard" />} />
              <Route path="/faculty/assignments/evaluate/:id" element={userRole === 'faculty' ? <AssignmentEvaluate /> : <Navigate to="/dashboard" />} />
              <Route path="/admin/queries" element={userRole === 'admin' ? <QueryListPage /> : <Navigate to="/dashboard" />} />
              <Route path="*" element={<Navigate to="/landing" />} />
            </>
          ) : (
            <>
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