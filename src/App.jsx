import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

// Import all your components
import LogoSplash from './components/landing/LogoSplash';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import LandingPage from './components/landing/LandingPage';
import FeaturesPage from './components/landing/FeaturesPage';
import DashboardRouter from './components/dashboard/DashboardRouter';
import SmartCalendar from './components/calendar/SmartCalendar';
import QueryForm from './components/communication/QueryForm';
import QueryListPage from './components/communication/QueryList';
import AssignmentSubmit from './components/assignments/AssignmentSubmit'; // <-- IMPORTED

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole, setUserRole] = useState('student'); 

  const navigate = useNavigate();
  const handleLogin = (role) => { /* ... */ };
  const handleLogout = () => { /* ... */ };
  useEffect(() => { const timer = setTimeout(() => setShowSplash(false), 2500); return () => clearTimeout(timer); }, []);

  return (
    <>
      {showSplash ? <LogoSplash /> : (
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/landing" element={<LandingPage onLogout={handleLogout} />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/dashboard" element={<DashboardRouter role={userRole} onLogout={handleLogout} />} />
              <Route path="/calendar" element={<SmartCalendar userRole={userRole} onLogout={handleLogout} />} />
              <Route path="/submit-query" element={<QueryForm onLogout={handleLogout} />} />
              <Route path="/admin/queries" element={ userRole === 'admin' ? <QueryListPage onLogout={handleLogout} /> : <Navigate to="/dashboard" /> } />
              
              {/* --- THIS IS THE CORRECT ROUTE DEFINITION --- */}
              <Route 
                path="/student/assignments/submit/:id" 
                element={
                  userRole === 'student'
                    ? <AssignmentSubmit onLogout={handleLogout} />
                    : <Navigate to="/dashboard" />
                }
              />
              
              <Route path="*" element={<Navigate to="/landing" />} />
            </>
          ) : (
            <>{/* ... Public routes ... */}</>
          )}
        </Routes>
      )}
    </>
  );
}

export default App;