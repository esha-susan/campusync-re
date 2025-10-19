import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/SideBar';
import Footer from '../common/Footer';
import './QueryForm.css';
import { submitQuery, getQueryRecipients } from '../../services/queryService';

const QueryForm = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    recipient_id: '', // State now holds the UUID of the recipient
    subject: '',
    category: '',
    priority: 'medium',
    message: '',
  });

  // State for the dynamic dropdown
  const [recipients, setRecipients] = useState([]);
  const [isLoadingRecipients, setIsLoadingRecipients] = useState(true);

  // State for file handling and submission status
  const [attachment, setAttachment] = useState(null);
  const [fileName, setFileName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // List of categories can remain hardcoded as it's static
  const categories = ['Academic', 'Assignment', 'Examination', 'General', 'Technical', 'Administrative'];

  // This useEffect hook fetches the list of faculty/admins when the component first loads.
  useEffect(() => {
    const fetchRecipients = async () => {
      try {
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachment(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.recipient_id || !formData.subject || !formData.category || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      // We pass the formData (which contains recipient_id) and the student's ID
      await submitQuery(formData, currentUser.id);
      
      alert('Query submitted successfully! You will receive a response soon.');
      navigate('/student/queries'); // Redirect to the list to see the new query
    } catch (error) {
        alert('Failed to submit query. Please try again.');
    } finally {
        setSubmitting(false);
    }
  };

  return (
    <div className="layout-wrapper">
      <Sidebar userRole="student" />
      <div className="main-content-wrapper">
        <Navbar userName={currentUser?.email} userRole="Student" onLogout={onLogout} />
        <main className="page-content">
          <div className="page-header">
            <div>
              <h1 className="page-title">Submit Query 💬</h1>
              <p className="page-subtitle">Ask questions or raise concerns to faculty or administration</p>
            </div>
          </div>

          <div className="query-form-container">
            <div className="form-card">
              <form onSubmit={handleSubmit} className="query-form">
                <div className="form-group">
                  <label htmlFor="recipient" className="form-label">Send To *</label>
                  <select
                    id="recipient"
                    value={formData.recipient_id}
                    onChange={(e) => setFormData({ ...formData, recipient_id: e.target.value })}
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
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="form-select"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="priority" className="form-label">Priority *</label>
                    <select
                      id="priority"
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="form-select"
                      required
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="form-input"
                    placeholder="Brief description of your query"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message *</label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-textarea"
                    placeholder="Describe your query in detail..."
                    rows="8"
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="attachment" className="form-label">Attachment (Optional)</label>
                  <div className="file-upload-area">
                    <input
                      type="file"
                      id="attachment"
                      onChange={handleFileChange}
                      className="file-input"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    <div className="file-upload-content">
                      {fileName ? (
                        <div className="file-selected">
                          <span className="file-icon">📎</span>
                          <span className="file-name">{fileName}</span>
                          <button 
                            type="button" 
                            className="remove-file"
                            onClick={() => {
                              setFileName('');
                              setAttachment(null);
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <>
                          <span className="upload-icon">📎</span>
                          <p className="upload-text">Attach supporting documents</p>
                          <p className="upload-hint">PDF, DOC, DOCX, JPG, PNG (Max 5MB)</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => navigate('/student/dashboard')}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={submitting}
                  >
                    {submitting ? 'Submitting...' : 'Submit Query'}
                  </button>
                </div>
              </form>
            </div>

            <div className="tips-card">
              <h3 className="tips-title">💡 Query Tips</h3>
              <ul className="tips-list">
                <li>
                  <strong>Be Clear:</strong> Write a concise subject line that summarizes your query
                </li>
                <li>
                  <strong>Be Specific:</strong> Provide all relevant details in your message
                </li>
                <li>
                  <strong>Be Polite:</strong> Use respectful language when communicating
                </li>
                <li>
                  <strong>Be Patient:</strong> Allow 24-48 hours for a response
                </li>
                <li>
                  <strong>Attach Files:</strong> Include screenshots or documents if they help explain your query
                </li>
              </ul>

              <div className="response-time">
                <h4 className="response-title">⏱️ Expected Response Time</h4>
                <div className="time-info">
                  <div className="time-item">
                    <span className="priority-dot urgent"></span>
                    <span>Urgent: Within 24 hours</span>
                  </div>
                  <div className="time-item">
                    <span className="priority-dot high"></span>
                    <span>High: 1-2 days</span>
                  </div>
                  <div className="time-item">
                    <span className="priority-dot medium"></span>
                    <span>Medium: 2-3 days</span>
                  </div>
                  <div className="time-item">
                    <span className="priority-dot low"></span>
                    <span>Low: 3-5 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default QueryForm;