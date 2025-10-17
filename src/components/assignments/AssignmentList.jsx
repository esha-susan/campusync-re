import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import Footer from '../common/Footer';
import './AssignmentList.css';

const AssignmentList = ({ userRole, onLogout }) => {
  const [filter, setFilter] = useState('all');
  const [assignments] = useState([
    { 
      id: 1, 
      title: 'ER Diagram Design', 
      subject: 'Database Systems', 
      description: 'Design an ER diagram for a library management system',
      dueDate: '2025-10-05', 
      status: 'pending',
      points: 20,
      submissions: userRole === 'faculty' ? 45 : null,
      total: userRole === 'faculty' ? 50 : null
    },
    { 
      id: 2, 
      title: 'Process Scheduling Algorithm', 
      subject: 'Operating Systems', 
      description: 'Implement and compare different CPU scheduling algorithms',
      dueDate: '2025-10-08', 
      status: 'submitted',
      points: 25,
      submissions: userRole === 'faculty' ? 38 : null,
      total: userRole === 'faculty' ? 50 : null
    },
    { 
      id: 3, 
      title: 'TCP/IP Protocol Analysis', 
      subject: 'Computer Networks', 
      description: 'Analyze TCP/IP packet structure and flow control mechanisms',
      dueDate: '2025-10-12', 
      status: 'graded',
      grade: 'A',
      points: 20,
      submissions: userRole === 'faculty' ? 42 : null,
      total: userRole === 'faculty' ? 50 : null
    },
    { 
      id: 4, 
      title: 'Binary Search Tree Implementation', 
      subject: 'Data Structures', 
      description: 'Implement BST with insertion, deletion, and traversal operations',
      dueDate: '2025-10-15', 
      status: 'pending',
      points: 30,
      submissions: userRole === 'faculty' ? 20 : null,
      total: userRole === 'faculty' ? 50 : null
    }
  ]);

  const filteredAssignments = assignments.filter(assignment => {
    if (filter === 'all') return true;
    return assignment.status === filter;
  });

  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="dashboard-layout">
      <Navbar userRole={userRole} userName={userRole === 'student' ? 'John Doe' : 'Dr. Sarah Wilson'} onLogout={onLogout} />
      <div className="dashboard-container">
        <Sidebar userRole={userRole} />
        <main className="dashboard-main">
          <div className="dashboard-content">
            <div className="page-header">
              <div>
                <h1 className="page-title">Assignments</h1>
                <p className="page-subtitle">
                  {userRole === 'student' ? 'View and submit your assignments' : 'Manage and evaluate student assignments'}
                </p>
              </div>
              {userRole === 'faculty' && (
                <Link to="/faculty/assignments/create" className="btn btn-primary">
                  + Create Assignment
                </Link>
              )}
            </div>

            <div className="filter-tabs">
              <button 
                className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
                onClick={() => setFilter('pending')}
              >
                Pending
              </button>
              <button 
                className={`filter-tab ${filter === 'submitted' ? 'active' : ''}`}
                onClick={() => setFilter('submitted')}
              >
                Submitted
              </button>
              <button 
                className={`filter-tab ${filter === 'graded' ? 'active' : ''}`}
                onClick={() => setFilter('graded')}
              >
                Graded
              </button>
            </div>

            <div className="assignments-grid">
              {filteredAssignments.map(assignment => {
                const daysRemaining = getDaysRemaining(assignment.dueDate);
                return (
                  <div key={assignment.id} className="assignment-card">
                    <div className="assignment-card-header">
                      <span className="subject-tag">{assignment.subject}</span>
                      <span className={`status-badge status-${assignment.status}`}>
                        {assignment.status === 'graded' && assignment.grade ? 
                          `Grade: ${assignment.grade}` : 
                          assignment.status}
                      </span>
                    </div>

                    <h3 className="assignment-card-title">{assignment.title}</h3>
                    <p className="assignment-card-description">{assignment.description}</p>

                    <div className="assignment-card-meta">
                      <div className="meta-item">
                        <span className="meta-icon">📅</span>
                        <span className="meta-text">Due: {assignment.dueDate}</span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-icon">⭐</span>
                        <span className="meta-text">{assignment.points} points</span>
                      </div>
                      {daysRemaining > 0 && assignment.status === 'pending' && (
                        <div className="meta-item">
                          <span className="meta-icon">⏰</span>
                          <span className="meta-text" style={{ color: daysRemaining <= 2 ? '#ef4444' : 'inherit' }}>
                            {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} left
                          </span>
                        </div>
                      )}
                    </div>

                    {userRole === 'faculty' && (
                      <div className="submission-info">
                        <span className="submission-text">
                          {assignment.submissions}/{assignment.total} submissions
                        </span>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${(assignment.submissions / assignment.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="assignment-card-actions">
                      {userRole === 'student' ? (
                        <>
                          {assignment.status === 'pending' && (
                            <Link to={`/student/assignments/submit/${assignment.id}`} className="btn btn-primary btn-block">
                              Submit Assignment
                            </Link>
                          )}
                          {assignment.status === 'submitted' && (
                            <button className="btn btn-secondary btn-block" disabled>
                              Submitted - Awaiting Grading
                            </button>
                          )}
                          {assignment.status === 'graded' && (
                            <Link to={`/student/assignments/${assignment.id}`} className="btn btn-success btn-block">
                              View Feedback
                            </Link>
                          )}
                        </>
                      ) : (
                        <Link to={`/faculty/assignments/evaluate/${assignment.id}`} className="btn btn-primary btn-block">
                          Evaluate Submissions
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default AssignmentList;