import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/SideBar';
import Footer from '../common/Footer';
import './AssignmentSubmit.css';
import { submitAssignment } from '../../services/assignmentService'; // New service
import { supabase } from '../../../Supabaseclient'; // For fetching data

// MODIFIED: Added currentUser prop to get the student's ID
const AssignmentSubmit = ({ currentUser, onLogout }) => {
  console.log("CURRENT USER ID:", currentUser?.id); 
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ comments: '', file: null });
  const [fileName, setFileName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // MODIFIED: Removed mock data, added state for real assignment data
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

  // MODIFIED: Fetch real assignment data when the component loads
  useEffect(() => {
    const fetchAssignment = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('assignments')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error("Error fetching assignment:", error);
        setError("Could not load assignment details.");
      } else {
        setAssignment(data);
      }
      setLoading(false);
    };

    fetchAssignment();
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, file: file });
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file) {
      alert('Please upload a file before submitting.');
      return;
    }
    setSubmitting(true);
    setError('');

    try {
      // MODIFIED: Calling the real submission service
      await submitAssignment({
        assignmentId: id,
        studentId: currentUser.id,
        file: formData.file,
        comments: formData.comments,
      });
      alert(`Assignment "${assignment.title}" submitted successfully!`);
      navigate('/student/assignments');
    } catch (err) {
      setError('Submission failed. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading assignment details...</div>; // Or a proper spinner component
  }

  if (error && !assignment) {
    return <div>Error: {error}</div>;
  }
  
  // NO CHANGES TO THE JSX OR STYLING BELOW THIS LINE
  return (
    <div className="dashboard-layout">
      {/* Sidebar and Navbar would be here, using currentUser for name */}
      <div className="dashboard-container">
        <main className="dashboard-main">
          <div className="dashboard-content-wide">
            <div className="page-header">
              <div>
                <h1 className="page-title"><span className="gradient-text">Submit Assignment</span></h1>
                <p className="page-subtitle">Upload your work for: {assignment.title}</p>
              </div>
            </div>
            {error && <div className="error-message" style={{textAlign: 'center', marginBottom: '20px'}}>{error}</div>}
            <div className="submit-container">
              <div className="assignment-details-card">
                <div className="details-header">
                  <span className="subject-tag">{assignment.subject}</span>
                  <span className="points-badge">⭐ {assignment.points} points</span>
                </div>
                <h2 className="assignment-title-main">{assignment.title}</h2>
                <p className="assignment-description">{assignment.description}</p>
                <div className="deadline-warning">
                  <span className="warning-icon">⏰</span>
                  <div><strong>Deadline:</strong> {new Date(assignment.due_date).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="submission-form-card">
                <h3 className="form-title">Your Submission</h3>
                <form onSubmit={handleSubmit} className="submission-form">
                  <div className="form-group">
                    <label htmlFor="file" className="form-label">Upload File *</label>
                    <div className="file-upload-area">
                      <input type="file" id="file" onChange={handleFileChange} className="file-input" accept=".pdf,.doc,.docx,.jpg,.png,.zip" />
                      <div className="file-upload-content">
                        {fileName ? (
                          <div className="file-selected">
                            <span className="file-icon">📄</span>
                            <span className="file-name">{fileName}</span>
                            <button type="button" className="remove-file" onClick={() => { setFileName(''); setFormData({ ...formData, file: null }); }}>✕</button>
                          </div>
                        ) : (
                          <>
                            <span className="upload-icon">📤</span>
                            <p className="upload-text">Click to upload or drag & drop</p>
                            <p className="upload-hint">PDF, DOCX, JPG, PNG, ZIP (Max 10MB)</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="comments" className="form-label">Additional Comments</label>
                    <textarea id="comments" value={formData.comments} onChange={(e) => setFormData({ ...formData, comments: e.target.value })} className="form-textarea" placeholder="Add any notes for your instructor..." rows="5"></textarea>
                  </div>
                  <div className="form-actions">
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/student/assignments')}>Cancel</button>
                    <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit Assignment'}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AssignmentSubmit;