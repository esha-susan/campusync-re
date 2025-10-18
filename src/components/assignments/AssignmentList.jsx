import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/SideBar'; // <-- 1. IMPORT YOUR REAL SIDEBAR
// import Footer from '../common/Footer';
import './AssignmentList.css'; 

const AssignmentList = ({ userRole, onLogout, initialFilter = 'all' }) => {
  const [filter, setFilter] = useState(initialFilter);
  const [assignments] = useState([
    { id: 1, title: 'ER Diagram Design', subject: 'Database Systems', description: 'Design an ER diagram for a library management system.', dueDate: '2025-10-05', status: 'pending', points: 20 },
    { id: 2, title: 'Process Scheduling Algorithm', subject: 'Operating Systems', description: 'Implement and compare different CPU scheduling algorithms.', dueDate: '2025-10-08', status: 'submitted', points: 25 },
    { id: 3, title: 'TCP/IP Protocol Analysis', subject: 'Computer Networks', description: 'Analyze TCP/IP packet structure and flow control mechanisms.', dueDate: '2025-10-12', status: 'graded', grade: 'A', points: 20 },
    { id: 4, title: 'Binary Search Tree Implementation', subject: 'Data Structures', description: 'Implement BST with insertion, deletion, and traversal operations.', dueDate: '2025-10-15', status: 'pending', points: 30 }
  ]);
  const filteredAssignments = assignments.filter(a => filter === 'all' || a.status === filter);
  
  return (
    <div className="layout-wrapper">
      
      {/* --- 2. USE THE IMPORTED SIDEBAR COMPONENT --- */}
      <Sidebar userRole={userRole} />
      
      {/* --- MAIN CONTENT AREA --- */}
      <div className="main-content-wrapper">
        <div className="navbar-container">
        <Navbar userName="John Doe" userRole="Student" /> 
          {/* You will replace this with your <Navbar /> component later */}
          <div className="navbar-placeholder">
            <input type="text" placeholder="Search..." />
            <div className="user-profile">
              <span>J</span>
              <div>John Doe</div>
            </div>
          </div>
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

          <div className="assignments-grid">
            {filteredAssignments.map(assignment => (
              <div key={assignment.id} className="assignment-card">
                <div className="assignment-card-header">
                  <span className="subject-tag">{assignment.subject}</span>
                  <span className={`status-badge status-${assignment.status}`}>
                    {assignment.status === 'graded' ? `Grade: ${assignment.grade}` : assignment.status}
                  </span>
                </div>
                <div className="assignment-card-body">
                  <h3 className="assignment-card-title">{assignment.title}</h3>
                  <p className="assignment-card-description">{assignment.description}</p>
                </div>
                <div className="assignment-card-meta">
                  <div className="meta-item"><span>📅</span> Due: {assignment.dueDate}</div>
                  <div className="meta-item"><span>⭐</span> {assignment.points} points</div>
                </div>
                <div className="assignment-card-actions">
                  {assignment.status === 'pending' && <Link to={`/student/assignments/submit/${assignment.id}`} className="btn btn-primary btn-block">Submit Assignment</Link>}
                  {assignment.status === 'submitted' && <button className="btn btn-secondary btn-block" disabled>Submitted - Awaiting Grading</button>}
                  {assignment.status === 'graded' && <Link to={`/student/assignments/${assignment.id}`} className="btn btn-success btn-block">View Feedback</Link>}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AssignmentList;