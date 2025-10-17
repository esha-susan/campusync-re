import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Landing & Auth
import LogoSplash from './components/landing/LogoSplash';
import LandingPage from './components/landing/LandingPage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Dashboards
import StudentDashboard from './components/dashboard/StudentDashboard';
import FacultyDashboard from './components/dashboard/FacultyDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';

// Assignments
import AssignmentList from './components/assignments/AssignmentList';
import AssignmentSubmit from './components/assignments/AssignmentSubmit';
import AssignmentEvaluate from './components/assignments/AssignmentEvaluate';

// Calendar
import SmartCalendar from './components/calendar/SmartCalendar';

// Activities
import ActivityPoints from './components/activities/ActivityPoints';
import SubmitCertificate from './components/activities/SubmitCertificate';

// Communication
import QueryForm from './components/communication/QueryForm';
import QueryList from './components/communication/QueryList';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  if (showSplash) {
    return <LogoSplash />;
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          
          {/* Student Routes */}
          <Route 
            path="/student/dashboard" 
            element={isAuthenticated && userRole === 'student' ? 
              <StudentDashboard onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/student/assignments" 
            element={isAuthenticated && userRole === 'student' ? 
              <AssignmentList userRole="student" onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/student/assignments/submit/:id" 
            element={isAuthenticated && userRole === 'student' ? 
              <AssignmentSubmit onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/student/calendar" 
            element={isAuthenticated && userRole === 'student' ? 
              <SmartCalendar userRole="student" onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/student/activities" 
            element={isAuthenticated && userRole === 'student' ? 
              <ActivityPoints onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/student/activities/submit" 
            element={isAuthenticated && userRole === 'student' ? 
              <SubmitCertificate onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/student/queries" 
            element={isAuthenticated && userRole === 'student' ? 
              <QueryList userRole="student" onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/student/queries/new" 
            element={isAuthenticated && userRole === 'student' ? 
              <QueryForm onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />

          {/* Faculty Routes */}
          <Route 
            path="/faculty/dashboard" 
            element={isAuthenticated && userRole === 'faculty' ? 
              <FacultyDashboard onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/faculty/assignments" 
            element={isAuthenticated && userRole === 'faculty' ? 
              <AssignmentList userRole="faculty" onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/faculty/assignments/evaluate/:id" 
            element={isAuthenticated && userRole === 'faculty' ? 
              <AssignmentEvaluate onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/faculty/calendar" 
            element={isAuthenticated && userRole === 'faculty' ? 
              <SmartCalendar userRole="faculty" onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/faculty/queries" 
            element={isAuthenticated && userRole === 'faculty' ? 
              <QueryList userRole="faculty" onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />

          {/* Admin Routes */}
          <Route 
            path="/admin/dashboard" 
            element={isAuthenticated && userRole === 'admin' ? 
              <AdminDashboard onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/admin/calendar" 
            element={isAuthenticated && userRole === 'admin' ? 
              <SmartCalendar userRole="admin" onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/admin/activities" 
            element={isAuthenticated && userRole === 'admin' ? 
              <ActivityPoints onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/admin/queries" 
            element={isAuthenticated && userRole === 'admin' ? 
              <QueryList userRole="admin" onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;