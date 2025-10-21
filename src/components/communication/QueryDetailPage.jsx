import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQueryById, postQueryResponse } from '../../services/queryService';
import Layout from '../common/Layout'; // Make sure this import is correct
import './QueryDetailPage.css';

const QueryDetailPage = ({ currentUser, userRole, onLogout }) => {
  const { id: queryId } = useParams();
  const navigate = useNavigate();

  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [newResponse, setNewResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchQueryDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getQueryById(queryId);
      if (!data || !data.query) {
        throw new Error('Query not found.');
      }
      setDetails(data);
    } catch (err) {
      setError('Failed to load query details.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [queryId]);

  useEffect(() => {
    fetchQueryDetails();
  }, [fetchQueryDetails]);

  const handleSubmitResponse = async (e) => {
    e.preventDefault();
    if (!newResponse.trim() || !currentUser) return;
    setIsSubmitting(true);
    try {
      await postQueryResponse(queryId, newResponse, currentUser.id, currentUser.full_name);
      setNewResponse('');
      await fetchQueryDetails();
    } catch (err) {
      alert("Failed to post response. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };
  
  const query = details?.query;
  const student = details?.student;
  const responses = details?.responses || [];

  // --- THE DEFINITIVE FIX IS HERE ---
  // We now wrap the entire page's content, including loading/error states, in the Layout.
  return (
    <Layout currentUser={currentUser} onLogout={onLogout}>
      <div className="page-header">
        <h1>Query Details</h1>
        <button onClick={() => navigate(-1)} className="btn btn--secondary">
          ← Back to Query List
        </button>
      </div>

      {isLoading && <div className="loading-indicator">Loading Query Details...</div>}
      
      {error && <div className="error-message">{error}</div>}

      {!isLoading && !error && details && query && student && (
        <div className="query-detail-container">
          <div className="query-header-card">
            <h3>{query.subject}</h3>
            <p>From: <strong>{student.full_name}</strong> | Category: {query.category}</p>
            <div className="header-meta">
              <span className={`status-badge status-${query.status}`}>{query.status}</span>
              <span className="query-date">Submitted on: {formatDate(query.created_at)}</span>
            </div>
          </div>

          <div className="conversation-thread">
            <div className="message student-query">
              <div className="message-author">{student.full_name} (Student)</div>
              <div className="message-text">{query.message || query.description}</div>
              <div className="message-time">{formatDate(query.created_at)}</div>
            </div>
            
            {responses.map((response) => (
              <div key={response.id} className="message faculty-response">
                <div className="message-author">{response.author_name} (Faculty/Admin)</div>
                <div className="message-text">{response.response_text}</div>
                <div className="message-time">{formatDate(response.created_at)}</div>
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