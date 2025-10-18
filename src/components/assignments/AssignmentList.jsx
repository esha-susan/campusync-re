// 1. IMPORT useEffect and getAssignments SERVICE
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAssignments } from '../../services/assignmentService'; 

import Navbar from '../common/Navbar';
import Sidebar from '../common/SideBar'; 
import './AssignmentList.css'; 

const AssignmentList = ({ userRole, onLogout, initialFilter = 'all' }) => {
  const [filter, setFilter] = useState(initialFilter);

  // 2. SET UP STATE FOR DYNAMIC DATA, LOADING, AND ERRORS
  // The assignments state will now start empty and be filled by our service.
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. FETCH DATA WHEN THE COMPONENT MOUNTS
  // useEffect runs after the component renders. We use it to fetch data.
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        // We call the getAssignments function from our service file.
        // It will return the array from the service (including any new assignments).
        const data = await getAssignments(userRole);
        setAssignments(data);
      } catch (err) {
        setError('Failed to load assignments. Please try again later.');
        console.error(err);
      } finally {
        // This runs whether the fetch succeeded or failed.
        setIsLoading(false);
      }
    };

    fetchAssignments();
  }, [userRole]); // The dependency array makes this run only once when the component mounts.

  const filteredAssignments = assignments.filter(a => filter === 'all' || a.status === filter);
  
  // Helper function to render the main content
  const renderContent = () => {
    if (isLoading) {
      return <div className="loading-indicator">Loading assignments...</div>;
    }

    if (error) {
      return <div className="error-message">{error}</div>;
    }

    if (filteredAssignments.length === 0) {
      return <div className="no-assignments">No assignments found for this category.</div>
    }

    return (
      <div className="assignments-grid">
        {filteredAssignments.map(assignment => (
          <div key={assignment.id} className="assignment-card">
            {/* Your assignment card JSX remains the same */}
            <div className="assignment-card-header">
              <span className="subject-tag">{assignment.subject || 'General'}</span>
              <span className={`status-badge status-${assignment.status || (assignment.submitted ? 'submitted' : 'pending')}`}>
                {assignment.status === 'graded' ? `Grade: ${assignment.grade}` : (assignment.status || (assignment.submitted ? 'submitted' : 'pending'))}
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
              {assignment.status === 'pending' && <Link to={`/student/assignments/submit/${assignment.id}`} className="btn btn-primary btn-block">Submit Assignment</Link>}
              {assignment.status === 'submitted' && <button className="btn btn-secondary btn-block" disabled>Submitted - Awaiting Grading</button>}
              {assignment.status === 'graded' && <Link to={`/student/assignments/${assignment.id}`} className="btn btn-success btn-block">View Feedback</Link>}
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
          <Navbar userName="John Doe" userRole="Student" /> 
        </div>
        
        <main className="page-content">
          <div className="page-header">
            <h1 className="page-title">Assignments</h1>
            <p className="page-subtitle">View and submit your assignments</p>
          </div>

          <div className="filter-tabs">
            <button className={`filter-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
            <button className={`filter-tab ${filter === 'pending' ? 'active' : ''}`} onClick={() => setFilter('pending')}>Pending</button>
            <button className={`filter-tab ${filter === 'submitted' ? 'active' : ''}`} onClick={() => setFilter('submitted')}>Submitted</button>
            <button className={`filter-tab ${filter === 'graded' ? 'active' : ''}`} onClick={() => setFilter('graded')}>Graded</button>
          </div>

          {/* 4. RENDER THE DYNAMIC CONTENT */}
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AssignmentList;