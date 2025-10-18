import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import Navbar from '../common/Navbar';
// import Sidebar from '../common/Sidebar';
// import Footer from '../common/Footer';
import './QueryList.css';

const QueryListPage = ({ onLogout }) => {
  // Mock data for the queries list
  const [queries, setQueries] = useState([
    { id: 1, studentName: 'John Doe', subject: 'Doubt regarding deadlock prevention', category: 'Academic', priority: 'high', status: 'pending', date: '2025-10-17' },
    { id: 2, studentName: 'Jane Smith', subject: 'Fee payment confirmation issue', category: 'Administrative', priority: 'urgent', status: 'pending', date: '2025-10-17' },
    { id: 3, studentName: 'Mike Johnson', subject: 'Question about transaction isolation in SQL', category: 'Assignment', priority: 'medium', status: 'answered', date: '2025-10-16' },
    { id: 4, studentName: 'Alice Brown', subject: 'Unable to upload certificate for activity points', category: 'Technical', priority: 'high', status: 'pending', date: '2025-10-15' },
    { id: 5, studentName: 'Carol Davis', subject: 'Request for bonafide certificate', category: 'General', priority: 'low', status: 'closed', date: '2025-10-14' },
  ]);

  const handleViewQuery = (id) => {
    // In a real app, this would navigate to a detailed view of the query
    alert(`Viewing details for query #${id}`);
  };

  return (
    <div className="dashboard-layout">
      {/* <Navbar userRole="admin" userName="Admin User" onLogout={onLogout} /> */}
      <div className="dashboard-container">
        {/* <Sidebar userRole="admin" /> */}
        <main className="dashboard-main">
          <div className="dashboard-content">
            <div className="page-header">
              <div className="page-title-group">
                <div className="page-title-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72 3.72a2.25 2.25 0 01-3.182 0l-3.72-3.72a2.25 2.25 0 00-2.193-1.98H4.5a2.25 2.25 0 01-2.25-2.25v-4.286c0-.97.616-1.813 1.5-2.097m14.25 0a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25m14.25 0H6.75" />
                  </svg>
                </div>
                <div>
                  <h1 className="page-title">Query Inbox</h1>
                  <p className="page-subtitle">Review, manage, and respond to all user queries</p>
                </div>
              </div>
            </div>

            <div className="query-list-container">
              <div className="table-wrapper">
                <table className="query-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Subject</th>
                      <th>Category</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {queries.map(query => (
                      <tr key={query.id}>
                        <td>{query.studentName}</td>
                        <td>{query.subject}</td>
                        <td>{query.category}</td>
                        <td>
                          <span className={`priority-badge priority-${query.priority}`}>
                            {query.priority}
                          </span>
                        </td>
                        <td>
                          <span className={`status-badge status-${query.status}`}>
                            {query.status}
                          </span>
                        </td>
                        <td>{query.date}</td>
                        <td>
                          <button 
                            className="btn-small btn-primary"
                            onClick={() => handleViewQuery(query.id)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
          {/* <Footer /> */}
        </main>
      </div>
    </div>
  );
};

export default QueryListPage;