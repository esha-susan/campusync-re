import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAssignments } from '../../services/assignmentService'; 

import Navbar from '../common/Navbar';
import Sidebar from '../common/SideBar'; 
import './AssignmentList.css'; 

const AssignmentList = ({ userRole, onLogout }) => {
  const [filter, setFilter] = useState(userRole === 'faculty' ? 'needs-grading' : 'all');
  
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await getAssignments(userRole);
        setAssignments(data);
      } catch (err) {
        setError('Failed to load assignments. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignments();
  }, [userRole]);

  const filteredAssignments = assignments.filter(a => {
    if (filter === 'all') return true;
    if (userRole === 'faculty' && filter === 'needs-grading') {
      return a.submissions > 0 && a.status !== 'graded';
    }
    return a.status === filter;
  });

  const pageDetails = {
    title: userRole === 'faculty' ? 'Manage Assignments' : 'Assignments',
    subtitle: userRole === 'faculty' ? 'Review submissions, provide grades, and give feedback.' : 'View and submit your assignments',
  };

  const filterTabs = userRole === 'faculty' ? (
    <>
      <button className={`filter-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
      <button className={`filter-tab ${filter === 'needs-grading' ? 'active' : ''}`} onClick={() => setFilter('needs-grading')}>Needs Grading</button>
      <button className={`filter-tab ${filter === 'graded' ? 'active' : ''}`} onClick={() => setFilter('graded')}>Graded</button>
    </>
  ) : (
    <>
      <button className={`filter-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
      <button className={`filter-tab ${filter === 'pending' ? 'active' : ''}`} onClick={() => setFilter('pending')}>Pending</button>
      <button className={`filter-tab ${filter === 'submitted' ? 'active' : ''}`} onClick={() => setFilter('submitted')}>Submitted</button>
      <button className={`filter-tab ${filter === 'graded' ? 'active' : ''}`} onClick={() => setFilter('graded')}>Graded</button>
    </>
  );

  const AssignmentCardActions = ({ assignment }) => {
    if (userRole === 'faculty') {
      return (
        <div className="assignment-card-actions faculty-actions">
          <div className="submission-info">
            <span>Submissions: {assignment.submissions || 0} / {assignment.totalStudents || 50}</span>
          </div>
          <Link to={`/faculty/assignments/evaluate/${assignment.id}`} className="btn btn-primary btn-block">
            Evaluate
          </Link>
        </div>
      );
    }

    // Student View
    switch (assignment.status) {
      case 'pending':
        return <Link to={`/student/assignments/submit/${assignment.id}`} className="btn btn-primary btn-block">Submit Assignment</Link>;
      case 'submitted':
        return <button className="btn btn-secondary btn-block" disabled>Submitted - Awaiting Grading</button>;
      case 'graded':
        return <Link to={`/student/assignments/${assignment.id}`} className="btn btn-success btn-block">View Feedback</Link>;
      default:
        return null;
    }
  };

  const renderContent = () => {
    if (isLoading) return <div className="loading-indicator">Loading assignments...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (filteredAssignments.length === 0) return <div className="no-assignments">No assignments found for this category.</div>;

    return (
      <div className="assignments-grid">
        {filteredAssignments.map(assignment => (
          <div key={assignment.id} className="assignment-card">
            <div className="assignment-card-header">
              <span className="subject-tag">{assignment.subject || 'General'}</span>
              <span className={`status-badge status-${assignment.status}`}>
                {userRole === 'faculty' ? `${assignment.status}` : (assignment.status === 'graded' ? `Grade: ${assignment.grade}` : assignment.status)}
              </span>
            </div>
            <div className="assignment-card-body">
              <h3 className="assignment-card-title">{assignment.title}</h3>
              <p className="assignment-card-description">{assignment.description}</p>
            </div>
            <div className="assignment-card-meta">
              <div className="meta-item"><span>📅</span> Due: {assignment.dueDate}</div>
              <div className="meta-item"><span>⭐</span> {assignment.points || 20} points</div>
            </div>
            <div className="assignment-card-actions">
                <AssignmentCardActions assignment={assignment} />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="layout-wrapper">
      <Sidebar userRole={userRole} />
      
      <div className="main-content-wrapper">
        <div className="navbar-container">
          <Navbar userName="Dr. Wilson" userRole={userRole} onLogout={onLogout} /> 
        </div>
        
        <main className="page-content">
          <div className="page-header">
            <h1 className="page-title">{pageDetails.title}</h1>
            <p className="page-subtitle">{pageDetails.subtitle}</p>
          </div>

          <div className="filter-tabs">
            {filterTabs}
          </div>

          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AssignmentList;