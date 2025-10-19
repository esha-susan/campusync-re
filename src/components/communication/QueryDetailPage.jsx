import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getQueryById, postQueryResponse } from '../../services/queryService';

import Navbar from '../common/Navbar';
import Sidebar from '../common/SideBar';
import './QueryDetailPage.css'; // Make sure this CSS file exists

const QueryDetailPage = ({ userRole, onLogout }) => {
  const { id } = useParams();
  const [query, setQuery] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newResponse, setNewResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuery = async () => {
      // Reset state for safety on component remount
      setQuery(null);
      setError(null);
      setIsLoading(true);
      try {
        const data = await getQueryById(id);
        setQuery(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuery();
  }, [id]);

  const handleSubmitResponse = async (e) => {
    e.preventDefault();
    if (!newResponse.trim()) return;

    setIsSubmitting(true);
    try {
      await postQueryResponse(id, newResponse);
      const updatedQuery = await getQueryById(id); // Refetch to see the update
      setQuery(updatedQuery);
      setNewResponse(''); // Clear the form
    } catch (err) {
      alert("Failed to post response. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- SAFE RENDER LOGIC ---
  // These checks run before attempting to render the main content.
  if (isLoading) {
    return <div className="loading-indicator">Loading query details...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  // **THE CRASH FIX IS HERE**: We check if the query is null AFTER loading and error checks.
  // This prevents the app from trying to read properties of a null object.
  if (!query) {
    return <div className="error-message">Query not found. It may have been deleted or the link is incorrect.</div>;
  }

  // If we get here, it is safe to render the query details.
  return (
    <div className="layout-wrapper">
      <Sidebar userRole={userRole} />
      <div className="main-content-wrapper">
        <Navbar userName="User" userRole={userRole} onLogout={onLogout} />
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
              <p>From: <strong>{query.studentName}</strong> | Category: {query.category} | Date: {query.date}</p>
              <span className={`status-badge status-${query.status}`}>{query.status}</span>
            </div>

            <div className="conversation-thread">
              <div className="message original-query">
                <div className="message-author">{query.studentName} (Student)</div>
                <div className="message-text">{query.queryText}</div>
                <div className="message-time">{query.date}</div>
              </div>
              {query.responses.map((response, index) => (
                <div key={index} className="message faculty-response">
                  <div className="message-author">{response.author} (Faculty)</div>
                  <div className="message-text">{response.text}</div>
                  <div className="message-time">{response.date}</div>
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
                  ></textarea>
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Response'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default QueryDetailPage;