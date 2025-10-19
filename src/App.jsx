import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { supabase } from '../Supabaseclient';

// --- (Import ALL your pages and components here) ---
import LogoSplash from './components/landing/LogoSplash';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import LandingPage from './components/landing/LandingPage';
import FeaturesPage from './components/landing/FeaturesPage';
import ProfilePage from './components/profile/ProfilePage';
import DashboardRouter from './components/dashboard/DashboardRouter';
import StudentDashboard from './components/dashboard/StudentDashBoard';
import FacultyDashboard from './components/dashboard/FacultyDashBoard';
import AdminDashboard from './components/dashboard/AdminDashBoard';
import SmartCalendar from './components/calendar/SmartCalendar';
import AssignmentList from './components/assignments/AssignmentList';
import AssignmentSubmit from './components/assignments/AssignmentSubmit';
import AssignmentEvaluate from './components/assignments/AssignmentEvaluate';
import CreateAssignmentPage from './components/faculty/CreateAssignmentPage';
import QueryListPage from './components/communication/QueryListPage';
import QueryForm from './components/communication/QueryForm';
import ActivityHub from './components/activities/ActivityHub';

// ======================= IMPORTS FOR THE MISSING PAGES =======================
import ActivityPoints from './components/activities/ActivityPoints';
import SubmitCertificate from './components/activities/SubmitCertificate';
// =============================================================================

function App() {
  // --- (All your existing state and useEffect hooks are correct and preserved) ---
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
        setCurrentUser(session.user);
        setUserRole(session.user.user_metadata?.role);
      }
      setLoadingSession(false);
    };
    checkSession();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      setCurrentUser(session?.user ?? null);
      setUserRole(session?.user?.user_metadata?.role ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    navigate('/landing');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loadingSession || showSplash) {
    return <LogoSplash />;
  }

  return (
    <Routes>
      {isAuthenticated ? (
        <>
          {/* --- This is the complete and final map of all your app's pages --- */}

          {/* Core Routes */}
          <Route path="/landing" element={<LandingPage onLogout={handleLogout} />} />
          <Route path="/profile" element={<ProfilePage user={currentUser} onLogout={handleLogout} />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/calendar" element={<SmartCalendar user={currentUser} onLogout={handleLogout} />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardRouter role={userRole} />} />
          <Route path="/student/dashboard" element={<StudentDashboard currentUser={currentUser} onLogout={handleLogout} />} />
          <Route path="/faculty/dashboard" element={<FacultyDashboard currentUser={currentUser} onLogout={handleLogout} />} />
          <Route path="/admin/dashboard" element={<AdminDashboard currentUser={currentUser} onLogout={handleLogout} />} />

          {/* Assignment Routes */}
          <Route path="/student/assignments" element={<AssignmentList currentUser={currentUser} onLogout={handleLogout} />} />
          <Route path="/student/assignments/submit/:id" element={<AssignmentSubmit currentUser={currentUser} onLogout={handleLogout} />} />
          <Route path="/faculty/assignments" element={<AssignmentList currentUser={currentUser} onLogout={handleLogout} />} />
          <Route path="/faculty/assignments/create" element={userRole === 'faculty' ? <CreateAssignmentPage currentUser={currentUser} onLogout={handleLogout} /> : <Navigate to="/landing" />} />
          <Route path="/faculty/assignments/evaluate/:id" element={userRole === 'faculty' ? <AssignmentEvaluate currentUser={currentUser} onLogout={handleLogout} /> : <Navigate to="/landing" />} />
          
          {/* Query Routes */}
          <Route path="/submit-query" element={<QueryForm currentUser={currentUser} onLogout={handleLogout} />} />
          <Route path="/student/queries" element={<QueryListPage currentUser={currentUser} onLogout={handleLogout} />} />
          <Route path="/faculty/queries" element={<QueryListPage currentUser={currentUser} onLogout={handleLogout} />} />

          {/* ========================== THE MISSING ROUTES ARE NOW ADDED ========================== */}
          
          {/* Activity Routes */}
          <Route path="/activities-hub" element={<ActivityHub currentUser={currentUser} onLogout={handleLogout} />} />
          <Route path="/student/activities" element={<ActivityPoints currentUser={currentUser} onLogout={handleLogout} />} />
          <Route path="/student/activities/submit" element={<SubmitCertificate currentUser={currentUser} onLogout={handleLogout} />} />

          {/* ======================================================================================= */}
          
          {/* This catch-all route MUST be the last private route. */}
          <Route path="*" element={<Navigate to="/landing" />} />
        </>
      ) : (
        <>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} /> 
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
}

export default App;