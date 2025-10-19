import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getQueryById, postQueryResponse } from '../../services/queryService';
import Navbar from '../common/Navbar';
import Sidebar from '../common/SideBar';
import Footer from '../common/Footer';
import './QueryDetailPage.css'; // We will create this CSS file next

const QueryDetailPage = ({ currentUser, userRole, onLogout }) => {
  const { id } = useParams();
  const [query, setQuery] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for the faculty's response form
  const [newResponse, setNewResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use useCallback to create a stable function for fetching data
  const fetchQueryDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getQueryById(id);
      setQuery(data);
    } catch (err) {
      setError('Failed to load query details.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchQueryDetails();
  }, [fetchQueryDetails]);

  const handleSubmitResponse = async (e) => {
    e.preventDefault();
    if (!newResponse.trim()) return;

    setIsSubmitting(true);
    try {
      // Pass the query ID, the response text, and the faculty's name
      await postQueryResponse(id, newResponse, currentUser.email); // Using email as author name
      
      // Clear the form and re-fetch the data to show the new message
      setNewResponse('');
      fetchQueryDetails();
    } catch (err) {
      alert("Failed to post response. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="loading-indicator">Loading query details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!query) return <div className="error-message">Query not found.</div>;

  return (
    <div className="layout-wrapper">
      <Sidebar userRole={userRole} />
      <div className="main-content-wrapper">
        <Navbar userName={currentUser?.email} userRole={userRole.charAt(0).toUpperCase() + userRole.slice(1)} onLogout={onLogout} />
        <main className="page-content">
          <div className="page-header">
            <Link to={userRole === 'student' ? '/student/queries' : '/faculty/queries'} className="back-link">
              &larr; Back to Query List
            </Link>
            <h1 className="page-title">Query Details</h1>
          </div>

          <div className="query-detail-container">
            <div className="query-header-card">
              <h3>{query.subject}</h3>
              <p>From: <strong>{query.studentName}</strong> | Category: {query.category}</p>
              <div className="header-meta">
                <span className={`status-badge status-${query.status}`}>{query.status}</span>
                <span className="query-date">Submitted on: {query.date}</span>
              </div>
            </div>

            <div className="conversation-thread">
              <div className="message original-query">
                <div className="message-author">{query.studentName} (Student)</div>
                <div className="message-text">{query.queryText}</div>
                <div className="message-time">{new Date(query.date).toLocaleString()}</div>
              </div>
              
              {query.responses.map((response, index) => (
                <div key={index} className="message faculty-response">
                  <div className="message-author">{response.author} (Faculty/Admin)</div>
                  <div className="message-text">{response.text}</div>
                  <div className="message-time">{new Date(response.date).toLocaleString()}</div>
                </div>
              ))}
            </div>

            {userRole !== 'student' && query.status !== 'closed' && (
              <div className="response-form-card">
                <h3>Respond to Query</h3>
                <form onSubmit={handleSubmitResponse}>
                  <textarea
                    className="response-textarea"
                    value={newResponse}
                    onChange={(e) => setNewResponse(e.target.value)}
                    placeholder="Type your response here..."
                    rows="5"
                    disabled={isSubmitting}
                    required
                  ></textarea>
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Response'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default QueryDetailPage;