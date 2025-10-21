import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/SideBar';
import Footer from '../common/Footer';
import './Dashboard.css';
// ======================= THIS IS THE ONLY CORRECTION =======================
// We now import the correct function name: 'getAssignmentsForFaculty'
import { getAssignmentsForFaculty } from '../../services/assignmentService'; 
// ===========================================================================

const FacultyDashboard = ({ currentUser, onLogout }) => {
  const [assignmentsToEvaluate, setAssignmentsToEvaluate] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        // We now call the correct function for the faculty
        const allAssignments = await getAssignmentsForFaculty(currentUser.id);
        
        // Filter the list to find only those with ungraded submissions
        const pending = allAssignments.filter(
          (assignment) => (assignment.submissions - assignment.gradedCount) > 0
        );
        
        setAssignmentsToEvaluate(pending);
      } catch (err) {
        console.error("Failed to fetch dashboard assignments:", err);
        setError("Could not load assignments. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (currentUser && currentUser.id) {
        fetchDashboardData();
    }
  }, [currentUser]);

  const stats = [
    { label: 'Pending Evaluations', value: isLoading ? '...' : assignmentsToEvaluate.length, icon: '📝', color: '#3b82f6' },
    { label: 'Total Students', value: '50', icon: '👥', color: '#10b981' },
    { label: 'Pending Queries', value: '2', icon: '💬', color: '#f59e0b' },
    
  ];
  const quickActions = [ { to: '/faculty/assignments/create', label: 'Create Assignment', icon: '➕' }, { to: '/calendar', label: 'View Calendar', icon: '📅' }, { to: '/faculty/assignments', label: 'Manage Assignments', icon: '👥' }, { to: '/faculty/queries', label: 'View Queries', icon: '💬' }];
  const recentQueries = [ { id: 1, student: 'John Doe', subject: 'Database Systems', query: 'Clarification on normalization concepts', time: '2 hours ago', status: 'pending' }, { id: 2, student: 'Jane Smith', subject: 'Operating Systems', query: 'Doubt regarding deadlock prevention', time: '5 hours ago', status: 'answered' }];

  const renderAssignmentsToEvaluate = () => {
    if (isLoading) {
      return <p>Loading assignments...</p>;
    }
    if (error) {
      return <p style={{ color: 'red' }}>{error}</p>;
    }
    if (assignmentsToEvaluate.length === 0) {
      return <p>No assignments are currently awaiting evaluation. Great job!</p>;
    }
    return (
      <div className="assignments-list">
        {assignmentsToEvaluate.map(a => (
          <div key={a.id} className="assignment-item">
            <div>
              <span className="assignment-subject">{a.subject}</span>
              <h4 className="assignment-title">{a.title}</h4>
            </div>
            <div className="submission-progress">
              <p className="progress-text">{a.submissions}/{a.totalStudents} submitted</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${(a.submissions / a.totalStudents) * 100}%` }}></div>
              </div>
              <Link to={`/faculty/assignments/evaluate/${a.id}`} className="btn-small">Evaluate</Link>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="layout-wrapper">
      <Sidebar userRole="faculty" />
      <div className="main-content-wrapper">
        <Navbar userName={currentUser?.user_metadata?.full_name || 'Faculty'} userRole="Faculty" onLogout={onLogout} />
        
        <main className="dashboard-main">
          <div className="dashboard-content">
            <div className="welcome-section">
              <div><h1 className="dashboard-title">Welcome, {currentUser?.user_metadata?.full_name || 'Faculty'}! 👋</h1><p className="dashboard-subtitle">Here's an overview of your teaching activities.</p></div>
            </div>
            <div className="stats-grid">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-card" style={{ borderLeftColor: stat.color }}>
                  <div className="stat-icon" style={{ backgroundColor: `${stat.color}20` }}><span>{stat.icon}</span></div>
                  <div><p className="stat-label">{stat.label}</p><h3 className="stat-value">{stat.value}</h3></div>
                </div>
              ))}
            </div>
            <div className="dashboard-grid">
              <div className="dashboard-card">
                <div className="card-header-flex">
                  <h3 className="card-title">Pending Assignments</h3>
                  <Link to="/faculty/assignments" className="view-all-link">View All →</Link>
                </div>
                {renderAssignmentsToEvaluate()}
              </div>
              
              <div className="dashboard-card">
                <div className="card-header-flex"><h3 className="card-title">Recent Queries</h3><Link to="/faculty/queries" className="view-all-link">View All →</Link></div>
                <div className="queries-list">
                  {recentQueries.map(q => (
                    <div key={q.id} className="query-item">
                      <div className="query-header"><div className="student-avatar">{q.student.charAt(0)}</div><div className="query-info"><h4 className="student-name">{q.student}</h4><span className="query-subject">{q.subject}</span></div><span className={`status-badge status-${q.status}`}>{q.status}</span></div>
                      <p className="query-text">{q.query}</p><span className="query-time">{q.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="dashboard-card"><h3 className="card-title">Quick Actions</h3>
              <div className="quick-actions">
                {quickActions.map((action) => (
                  <Link key={action.label} to={action.to} className="action-card">
                    <span className="action-icon">{action.icon}</span><span className="action-label">{action.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default FacultyDashboard;