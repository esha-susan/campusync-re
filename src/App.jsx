import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { supabase } from '../Supabaseclient';

// --- All your component imports are correct ---
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
import AssignmentFeedback from './components/assignments/AssignmentFeedback';
import CreateAssignmentPage from './components/faculty/CreateAssignmentPage';
import QueryListPage from './components/communication/QueryListPage';
import QueryForm from './components/communication/QueryForm';
import ActivityHub from './components/activities/ActivityHub';
import ActivityPoints from './components/activities/ActivityPoints';
import SubmitCertificate from './components/activities/SubmitCertificate';
import QueryDetailPage from './components/communication/QueryDetailPage';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const navigate = useNavigate();

  // ========================== THIS IS THE DEFINITIVE FIX ==========================
  // This useEffect is now crash-proof and will always finish loading.
  useEffect(() => {
    const setupSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session && session.user) {
          const user = session.user;
          
          const { data: profile, error } = await supabase
            .from('users')
            .select('role')
            .eq('id', user.id)
            .single();

          if (error) {
            // Log the error but don't stop the app
            console.error("Critical Error: Could not fetch user role.", error.message);
            setUserRole(null);
          } else {
            setUserRole(profile?.role?.toLowerCase() ?? null);
          }

          setIsAuthenticated(true);
          setCurrentUser(user);
        } else {
          setIsAuthenticated(false);
          setCurrentUser(null);
          setUserRole(null);
        }
      } catch (e) {
        // Catch any unexpected errors during the setup process
        console.error("An unexpected error occurred during session setup:", e);
        setIsAuthenticated(false);
        setCurrentUser(null);
        setUserRole(null);
      } finally {
        // THIS IS THE KEY: This code will RUN NO MATTER WHAT, guaranteeing
        // that the loading screen will always disappear.
        setLoadingSession(false);
      }
    };

    setupSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        // Re-run the full setup on login/logout to ensure consistency
        setupSession();
    });

    return () => subscription.unsubscribe();
  }, []);
  // ====================================================================================

  const handleLogin = (role) => {
    const lowerCaseRole = role ? role.toLowerCase() : null;
    if (lowerCaseRole === 'admin') navigate('/admin/dashboard');
    else if (lowerCaseRole === 'faculty') navigate('/faculty/dashboard');
    else if (lowerCaseRole === 'student') navigate('/student/dashboard');
    else navigate('/landing');
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

  // All your routing logic is now safe.
  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="/landing" element={<LandingPage onLogout={handleLogout} userRole={userRole} />} />
          <Route path="/profile" element={<ProfilePage user={currentUser} onLogout={handleLogout} />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/calendar" element={<SmartCalendar user={currentUser} onLogout={handleLogout} />} />
          <Route path="/dashboard" element={<DashboardRouter role={userRole} />} />
          <Route path="/student/dashboard" element={<StudentDashboard currentUser={currentUser} onLogout={handleLogout} />} />
          <Route path="/faculty/dashboard" element={<FacultyDashboard currentUser={currentUser} onLogout={handleLogout} />} />
          <Route path="/admin/dashboard" element={<AdminDashboard currentUser={currentUser} onLogout={handleLogout} />} />
          <Route path="/student/assignments" element={<AssignmentList currentUser={currentUser} userRole={userRole} onLogout={handleLogout} />} />
          <Route path="/student/assignments/:id" element={<AssignmentFeedback currentUser={currentUser} onLogout={handleLogout} />} />
          <Route path="/student/assignments/submit/:id" element={<AssignmentSubmit currentUser={currentUser} onLogout={handleLogout} />} />
          <Route path="/faculty/assignments" element={<AssignmentList currentUser={currentUser} userRole={userRole} onLogout={handleLogout} />} />
          <Route path="/faculty/assignments/create" element={userRole === 'faculty' ? <CreateAssignmentPage currentUser={currentUser} onLogout={handleLogout} /> : <Navigate to="/landing" />} />
          <Route path="/faculty/assignments/evaluate/:id" element={userRole === 'faculty' ? <AssignmentEvaluate currentUser={currentUser} onLogout={handleLogout} /> : <Navigate to="/landing" />} />
          <Route path="/submit-query" element={<QueryForm currentUser={currentUser} onLogout={handleLogout} />} />
          <Route path="/student/queries/:id" element={<QueryDetailPage currentUser={currentUser} userRole="student" onLogout={handleLogout} />} />
          <Route path="/faculty/queries/:id" element={<QueryDetailPage currentUser={currentUser} userRole="faculty" onLogout={handleLogout} />} />
          <Route path="/student/queries" element={<QueryListPage currentUser={currentUser} userRole={userRole} onLogout={handleLogout} />} />
          <Route path="/faculty/queries" element={<QueryListPage currentUser={currentUser} userRole={userRole} onLogout={handleLogout} />} />
          <Route path="/activities-hub" element={<ActivityHub currentUser={currentUser} onLogout={handleLogout} />} />
          <Route path="/student/activities" element={<ActivityPoints currentUser={currentUser} onLogout={handleLogout} />} />
          <Route path="/student/activities/submit" element={<SubmitCertificate currentUser={currentUser} onLogout={handleLogout} />} />
          <Route path="*" element={<Navigate to="/landing" />} />
        </>
      ) : (
        <>
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