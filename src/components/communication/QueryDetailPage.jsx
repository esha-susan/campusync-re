import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQueryById, postQueryResponse } from '../../services/queryService';
import Layout from '../common/Layout';
import './QueryDetailPage.css';

const QueryDetailPage = ({ currentUser, userRole, onLogout }) => {
  const { id: queryId } = useParams();
  const navigate = useNavigate();

  const [query, setQuery] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for the faculty's response form
  const [newResponse, setNewResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // This function fetches the query details from the backend
  const fetchQueryDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getQueryById(queryId);
      if (!data) {
        throw new Error('Query not found.');
      }
      setQuery(data);
    } catch (err) {
      setError('Failed to load query details. It may have been deleted or you may not have permission to view it.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [queryId]);

  useEffect(() => {
    fetchQueryDetails();
  }, [fetchQueryDetails]);

  // This function handles submitting a new response
  const handleSubmitResponse = async (e) => {
    e.preventDefault();
    if (!newResponse.trim() || !currentUser) return;

    setIsSubmitting(true);
    try {
      await postQueryResponse(queryId, newResponse, currentUser.id, currentUser.full_name);
      setNewResponse(''); // Clear the input
      await fetchQueryDetails(); // Re-fetch the data to show the new response
    } catch (err) {
      alert("Failed to post response. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to format dates safely
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleString();
    } catch (e) {
      return 'Invalid Date';
    }
  };

  if (isLoading) {
    return <Layout currentUser={currentUser} onLogout={onLogout}><div className="loading-indicator">Loading Query Details...</div></Layout>;
  }

  if (error) {
    return <Layout currentUser={currentUser} onLogout={onLogout}><div className="error-message">{error}</div></Layout>;
  }

  return (
    <Layout currentUser={currentUser} onLogout={onLogout}>
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Query Details</h1>
        </div>
        <button onClick={() => navigate(-1)} className="btn btn--secondary">
          ← Back to Query List
        </button>
      </div>

      {query && (
        <div className="query-detail-container">
          {/* Main Query Info Card */}
          <div className="query-header-card">
            <h3>{query.subject}</h3>
            <p>From: <strong>{query.student_full_name}</strong> | Category: {query.category}</p>
            <div className="header-meta">
              <span className={`status-badge status-${query.status}`}>{query.status}</span>
              <span className="query-date">Submitted on: {formatDate(query.created_at)}</span>
            </div>
          </div>

          {/* Conversation Thread */}
          <div className="conversation-thread">
            {/* Original Student Message */}
            <div className="message student-query">
              <div className="message-author">{query.student_full_name} (Student)</div>
              <div className="message-text">{query.message}</div>
              <div className="message-time">{formatDate(query.created_at)}</div>
            </div>
            
            {/* Faculty/Admin Responses */}
            {query.responses && query.responses.map((response, index) => (
              <div key={index} className="message faculty-response">
                <div className="message-author">{response.author_name} (Faculty/Admin)</div>
                <div className="message-text">{response.text}</div>
                <div className="message-time">{formatDate(response.created_at)}</div>
              </div>
            ))}
          </div>

          {/* Response Form for Faculty/Admin */}
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
                <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Response'}
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default QueryDetailPage;