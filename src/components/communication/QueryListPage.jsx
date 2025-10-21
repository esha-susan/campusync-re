import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getQueriesForRole } from '../../services/queryService'; 
import Navbar from '../common/Navbar';
import Sidebar from '../common/SideBar';
import Footer from '../common/Footer';
import './QueryList.css';
import Layout from '../common/Layout';

const QueryListPage = ({ currentUser, userRole, onLogout }) => {
  const [queries, setQueries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQueries = async () => {
      if (!userRole) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const data = await getQueriesForRole();
        setQueries(data || []);
      } catch (err) {
        setError('Failed to load queries. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQueries();
  }, [userRole]);

  const pageDetails = {
    title: userRole === 'student' ? 'My Queries' : 'Query Inbox',
    subtitle: userRole === 'student' 
      ? 'Track the status of your submitted queries and create new ones.' 
      : 'Review, manage, and respond to all user queries.',
  };

  const HeaderAction = () => {
    if (userRole === 'student') {
      return (
        <Link to="/submit-query" className="btn btn-primary">
          + Submit New Query
        </Link>
      );
    }
    return null;
  };

  const renderContent = () => {
    if (isLoading) return <div className="loading-indicator">Loading queries...</div>;
    if (error) return <div className="error-message">{error}</div>;
    
    if (queries.length === 0) {
      const message = userRole === 'student' 
        ? "You haven't submitted any queries yet." 
        : "The query inbox is empty. Great job!";
      return <div className="no-assignments">{message}</div>;
    }

    return (
      
      <div className="table-wrapper">
        <table className="query-table">
          <thead>
            <tr>
              {userRole !== 'student' && <th>Student</th>}
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
                {userRole !== 'student' && <td>{query.studentName}</td>}
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
                  <Link 
                    to={userRole === 'student' ? `/student/queries/${query.id}` : `/faculty/queries/${query.id}`}
                    className="btn-small btn-primary"
                  >
                    {userRole === 'student' ? 'View Details' : 'View & Respond'}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    );
  };

  return (
    <Layout currentUser={currentUser} onLogout={onLogout}>
    <div className="layout-wrapper">
      
      <div className="main-content-wrapper">
        
        <main className="page-content">
          <div className="page-header">
            <div className="page-title-group">
              <h1 className="page-title">{pageDetails.title}</h1>
              <p className="page-subtitle">{pageDetails.subtitle}</p>
            </div>
            {/* ======================= THIS IS THE CORRECTION ======================= */}
            {/* The misplaced curly brace has been removed. */}
            <div className="page-header-actions">
              <HeaderAction />
            </div>
            {/* ======================================================================= */}
          </div>

          <div className="query-list-container">
            {renderContent()}
          </div>
        </main>
        <Footer />
      </div>
    </div>
    </Layout>
  );
};

export default QueryListPage;