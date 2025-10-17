import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import Footer from '../common/Footer';
import './AssignmentSubmit.css';

const AssignmentSubmit = ({ onLogout }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    comments: '',
    file: null
  });
  const [fileName, setFileName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const assignment = {
    id: id,
    title: 'ER Diagram Design',
    subject: 'Database Systems',
    description: 'Design an ER diagram for a library management system including entities like Books, Members, Staff, Transactions, etc.',
    requirements: [
      'Identify all entities and their attributes',
      'Define relationships between entities',
      'Specify cardinality for each relationship',
      'Include weak entities if applicable',
      'Submit as PDF or image format'
    ],
    dueDate: '2025-10-05',
    points: 20
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, file: file });
      setFileName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.file) {
      alert('Please upload a file');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      alert('Assignment submitted successfully!');
      navigate('/student/assignments');
    }, 1500);
  };

  return (
    <div className="dashboard-layout">
      <Navbar userRole="student" userName="John Doe" onLogout={onLogout} />
      <div className="dashboard-container">
        <Sidebar userRole="student" />
        <main className="dashboard-main">
          <div className="dashboard-content">
            <div className="page-header">
              <div>
                <h1 className="page-title">Submit Assignment</h1>
                <p className="page-subtitle">Upload your work and add any additional comments</p>
              </div>
            </div>

            <div className="submit-container">
              <div className="assignment-details-card">
                <div className="details-header">
                  <span className="subject-tag">{assignment.subject}</span>
                  <span className="points-badge">⭐ {assignment.points} points</span>
                </div>
                <h2 className="assignment-title">{assignment.title}</h2>
                <p className="assignment-description">{assignment.description}</p>

                <div className="requirements-section">
                  <h3 className="section-title">Requirements</h3>
                  <ul className="requirements-list">
                    {assignment.requirements.map((req, index) => (
                      <li key={index} className="requirement-item">
                        <span className="check-icon">✓</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="deadline-warning">
                  <span className="warning-icon">⏰</span>
                  <div>
                    <strong>Deadline:</strong> {assignment.dueDate}
                    <p className="warning-text">Make sure to submit before the deadline to avoid penalties</p>
                  </div>
                </div>
              </div>

              <div className="submission-form-card">
                <h3 className="form-title">Your Submission</h3>
                <form onSubmit={handleSubmit} className="submission-form">
                  <div className="form-group">
                    <label htmlFor="file" className="form-label">Upload File *</label>
                    <div className="file-upload-area">
                      <input
                        type="file"
                        id="file"
                        onChange={handleFileChange}
                        className="file-input"
                        accept=".pdf,.doc,.docx,.jpg,.png,.zip"
                      />
                      <div className="file-upload-content">
                        {fileName ? (
                          <div className="file-selected">
                            <span className="file-icon">📄</span>
                            <span className="file-name">{fileName}</span>
                            <button 
                              type="button" 
                              className="remove-file"
                              onClick={() => {
                                setFileName('');
                                setFormData({ ...formData, file: null });
                              }}
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <>
                            <span className="upload-icon">📤</span>
                            <p className="upload-text">Click to upload or drag and drop</p>
                            <p className="upload-hint">PDF, DOC, DOCX, JPG, PNG, ZIP (Max 10MB)</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="comments" className="form-label">Additional Comments (Optional)</label>
                    <textarea
                      id="comments"
                      value={formData.comments}
                      onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                      className="form-textarea"
                      placeholder="Add any notes or explanations about your submission..."
                      rows="5"
                    ></textarea>
                  </div>

                  <div className="form-actions">
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => navigate('/student/assignments')}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={submitting}
                    >
                      {submitting ? 'Submitting...' : 'Submit Assignment'}
                    </button>
                  </div>
                </form>

                <div className="submission-tips">
                  <h4 className="tips-title">💡 Submission Tips</h4>
                  <ul className="tips-list">
                    <li>Review all requirements before submitting</li>
                    <li>Ensure your file is properly named and formatted</li>
                    <li>Double-check for any errors or missing information</li>
                    <li>Submit well before the deadline to avoid last-minute issues</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default AssignmentSubmit;