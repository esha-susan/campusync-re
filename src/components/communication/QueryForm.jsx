import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../common/Layout'; // Use the standard Layout
import './QueryForm.css';
import { submitQuery, getQueryRecipients } from '../../services/queryService';

const QueryForm = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    recipient_id: '',
    subject: '',
    category: '',
    priority: 'medium',
    message: '',
  });

  // State for the dynamic dropdown
  const [recipients, setRecipients] = useState([]);
  const [isLoadingRecipients, setIsLoadingRecipients] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const categories = ['Academic', 'Assignment', 'Examination', 'General', 'Technical', 'Administrative'];

  // This useEffect fetches the list of recipients when the component loads.
  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        setIsLoadingRecipients(true);
        const recipientData = await getQueryRecipients();
        setRecipients(recipientData);
      } catch (error) {
        console.error("Could not load recipient list:", error);
        // Optionally, show an error message to the user
      } finally {
        setIsLoadingRecipients(false);
      }
    };
    fetchRecipients();
  }, []); // The empty array ensures this runs only once.

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.recipient_id || !formData.subject || !formData.category || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      await submitQuery(formData, currentUser.id);
      alert('Query submitted successfully!');
      navigate('/student/queries'); // Redirect to the query list page
    } catch (error) {
        alert('Failed to submit query. Please try again.');
        console.error(error);
    } finally {
        setSubmitting(false);
    }
  };

  return (
    <Layout currentUser={currentUser} onLogout={onLogout}>
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Submit Query 💬</h1>
          <p className="page-header__subtitle">Ask questions or raise concerns to faculty or administration</p>
        </div>
      </div>

      <div className="query-form-container">
        <div className="form-card">
          <form onSubmit={handleSubmit} className="query-form">
            <div className="form-group">
              <label htmlFor="recipient_id" className="form-label">Send To *</label>
              <select
                id="recipient_id"
                value={formData.recipient_id}
                onChange={handleChange}
                className="form-select"
                disabled={isLoadingRecipients}
                required
              >
                <option value="">
                  {isLoadingRecipients ? 'Loading recipients...' : 'Select a recipient'}
                </option>
                {recipients.map(recipient => (
                  <option key={recipient.value} value={recipient.value}>
                    {recipient.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category" className="form-label">Category *</label>
                <select id="category" value={formData.category} onChange={handleChange} className="form-select" required>
                  <option value="">Select Category</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="priority" className="form-label">Priority *</label>
                <select id="priority" value={formData.priority} onChange={handleChange} className="form-select" required>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject" className="form-label">Subject *</label>
              <input type="text" id="subject" value={formData.subject} onChange={handleChange} className="form-input" placeholder="Brief description of your query" required />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Message *</label>
              <textarea id="message" value={formData.message} onChange={handleChange} className="form-textarea" placeholder="Describe your query in detail..." rows="8" required></textarea>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn--secondary" onClick={() => navigate(-1)}>
                Cancel
              </button>
              <button type="submit" className="btn btn--primary" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Query'}
              </button>
            </div>
          </form>
        </div>

        <div className="tips-card">
          <h3 className="tips-title">💡 Query Tips</h3>
          <ul className="tips-list">
            <li><strong>Be Clear:</strong> Write a concise subject line.</li>
            <li><strong>Be Specific:</strong> Provide all relevant details.</li>
            <li><strong>Be Polite:</strong> Use respectful language.</li>
            <li><strong>Be Patient:</strong> Allow 24-48 hours for a response.</li>
          </ul>
          <div className="response-time">
            <h4 className="response-title">⏱️ Expected Response Time</h4>
            <div className="time-info">
              <div className="time-item"><span className="priority-dot urgent"></span><span>Urgent: Within 24 hours</span></div>
              <div className="time-item"><span className="priority-dot high"></span><span>High: 1-2 days</span></div>
              <div className="time-item"><span className="priority-dot medium"></span><span>Medium: 2-3 days</span></div>
              <div className="time-item"><span className="priority-dot low"></span><span>Low: 3-5 days</span></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QueryForm;