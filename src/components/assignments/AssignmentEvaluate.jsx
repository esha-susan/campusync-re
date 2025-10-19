import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/SideBar';
import Footer from '../common/Footer';
import './AssignmentEvaluate.css';
import { getAssignmentById, getSubmissionsForAssignment, saveEvaluation } from '../../services/assignmentService';

const AssignmentEvaluate = ({ currentUser, onLogout }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [evaluationData, setEvaluationData] = useState({ grade: '', feedback: '' });
  
  const [assignment, setAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSubmissions = useCallback(async () => {
    try {
      setIsLoading(true);
      const assignmentData = await getAssignmentById(id);
      const submissionsData = await getSubmissionsForAssignment(id);
      setAssignment(assignmentData);
      setSubmissions(submissionsData);
    } catch (err) {
      setError('Failed to load data. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const handleEvaluate = (submission) => {
    setSelectedSubmission(submission);
    setEvaluationData({
      grade: submission.grade || '',
      feedback: submission.feedback || ''
    });
  };

  const handleSubmitEvaluation = async (e) => {
    e.preventDefault();
    if (!evaluationData.grade) {
      alert('Please provide a grade');
      return;
    }
    try {
      await saveEvaluation({
        submissionId: selectedSubmission.id,
        grade: evaluationData.grade,
        feedback: evaluationData.feedback,
      });
      alert('Evaluation saved successfully!');
      fetchSubmissions(); 
      setSelectedSubmission(null);
    } catch (err) {
      alert('Failed to save evaluation.');
      console.error(err);
    }
  };
  
  if (isLoading) return <div style={{ padding: '20px' }}>Loading...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;

  return (
    <div className="layout-wrapper">
      <Sidebar userRole="faculty" />
      <div className="main-content-wrapper">
        <Navbar userRole="faculty" userName={currentUser?.user_metadata?.full_name || "Faculty"} onLogout={onLogout} />
        <main className="page-content">
          <div className="dashboard-content">
            <div className="page-header">
              <div>
                <h1 className="page-title">Evaluate Submissions</h1>
                <p className="page-subtitle">{assignment?.subject} - {assignment?.title}</p>
              </div>
              <button onClick={() => navigate('/faculty/assignments')} className="btn btn-secondary">
                ← Back to Assignments
              </button>
            </div>

            <div className="evaluate-container">
              <div className="submissions-list-card">
                <h3 className="card-title">Student Submissions</h3>
                <div className="submissions-list">
                  {submissions.length === 0 ? (
                    <p style={{ padding: '20px', textAlign: 'center' }}>No submissions found for this assignment.</p>
                  ) : (
                    submissions.map(submission => (
                      <div 
                        key={submission.id} 
                        className={`submission-item ${selectedSubmission?.id === submission.id ? 'selected' : ''}`}
                        onClick={() => handleEvaluate(submission)}
                      >
                        <div className="student-info">
                          <div className="student-avatar">{(submission.student?.full_name || 'S').charAt(0)}</div>
                          <div>
                            <h4 className="student-name">{submission.student?.full_name || 'Unknown Student'}</h4>
                            <p className="student-roll">{submission.student?.id_number || 'No ID Number'}</p>
                          </div>
                        </div>
                        <div className="submission-details">
                          <p className="submission-date">📅 {new Date(submission.submission_date).toLocaleDateString()}</p>
                          <p className="submission-file">📄 {submission.file_url ? submission.file_url.split('/').pop() : 'No File'}</p>
                          <span className={`status-badge status-${submission.grade ? 'graded' : 'pending'}`}>
                            {submission.grade ? `Grade: ${submission.grade}` : 'Pending'}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="evaluation-panel-card">
                {selectedSubmission ? (
                  <>
                    <div className="panel-header">
                      <h3 className="panel-title">Evaluate: {selectedSubmission.student?.full_name}</h3>
                      <a href={selectedSubmission.file_url} target="_blank" rel="noopener noreferrer" className="download-link">📥 Download Submission</a>
                    </div>

                    <div className="submission-preview">
                      <div className="preview-placeholder">
                        <span className="preview-icon">📄</span>
                        <p className="preview-text">{selectedSubmission.file_url ? selectedSubmission.file_url.split('/').pop() : 'No File'}</p>
                        <p className="preview-hint">Click download to view the full submission</p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmitEvaluation} className="evaluation-form">
                      <div className="form-group">
                        <label htmlFor="grade" className="form-label">Grade *</label>
                        <select
                          id="grade"
                          value={evaluationData.grade}
                          onChange={(e) => setEvaluationData({ ...evaluationData, grade: e.g.target.value })}
                          className="form-select"
                        >
                          <option value="">Select Grade</option>
                          <option value="A+">A+ (Outstanding)</option>
                          <option value="A">A (Excellent)</option>
                          <option value="B+">B+ (Very Good)</option>
                          <option value="B">B (Good)</option>
                          <option value="C">C (Average)</option>
                          <option value="D">D (Below Average)</option>
                          <option value="F">F (Fail)</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="feedback" className="form-label">Feedback *</label>
                        <textarea
                          id="feedback"
                          value={evaluationData.feedback}
                          onChange={(e) => setEvaluationData({ ...evaluationData, feedback: e.target.value })}
                          className="form-textarea"
                          placeholder="Provide detailed feedback on the submission..."
                          rows="6"
                        ></textarea>
                      </div>
                      <div className="form-actions">
                        <button 
                          type="button" 
                          className="btn btn-secondary"
                          onClick={() => setSelectedSubmission(null)}
                        >
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Save Evaluation
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="no-selection">
                    <span className="no-selection-icon">📝</span>
                    <h3>Select a Submission</h3>
                    <p>Choose a student submission from the list to begin evaluation</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AssignmentEvaluate;