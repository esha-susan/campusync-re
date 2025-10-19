import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/SideBar';
import Footer from '../common/Footer';
import './AssignmentEvaluate.css';
// MODIFIED: Make sure all required service functions are imported
import { getAssignmentById, getSubmissionsForAssignment, saveEvaluation } from '../../services/assignmentService';

const AssignmentEvaluate = ({ currentUser, onLogout }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [evaluationData, setEvaluationData] = useState({ grade: '', feedback: '' });
  
  // States for real data
  const [assignment, setAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch real data when the component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
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
    };
    fetchData();
  }, [id]);

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
      const updatedSubmission = await saveEvaluation({
        submissionId: selectedSubmission.id,
        grade: evaluationData.grade,
        feedback: evaluationData.feedback,
      });
      alert('Evaluation saved successfully!');
      
      // Refresh the local list with the new grade and feedback
      const updatedSubmissions = submissions.map(sub => 
        sub.id === selectedSubmission.id ? { ...sub, ...updatedSubmission } : sub
      );
      setSubmissions(updatedSubmissions);
      setSelectedSubmission(null);
    } catch (err) {
      alert('Failed to save evaluation.');
      console.error(err);
    }
  };
  
  if (isLoading) return <div style={{ padding: '20px' }}>Loading...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;

  // --- The only changes are below, to access the student object correctly ---
  return (
    <div className="dashboard-layout">
      <Navbar userRole="faculty" userName={currentUser?.user_metadata?.full_name || "Faculty"} onLogout={onLogout} />
      <div className="dashboard-container">
        <Sidebar userRole="faculty" />
        <main className="dashboard-main">
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
                  {submissions.map(submission => (
                    <div 
                      key={submission.id} 
                      className={`submission-item ${selectedSubmission?.id === submission.id ? 'selected' : ''}`}
                      onClick={() => handleEvaluate(submission)}
                    >
                      <div className="student-info">
                        {/* ======================= FIX #1 ======================= */}
                        {/* Access the first character of `full_name` */}
                        <div className="student-avatar">{submission.student.full_name.charAt(0)}</div>
                        <div>
                          {/* Access the `full_name` property */}
                          <h4 className="student-name">{submission.student.full_name}</h4>
                          {/* Access the `id_number` property */}
                          <p className="student-roll">{submission.student.id_number}</p>
                        </div>
                        {/* ====================================================== */}
                      </div>
                      <div className="submission-details">
                        <p className="submission-date">📅 {new Date(submission.submission_date).toLocaleDateString()}</p>
                        <p className="submission-file">📄 {submission.file_url.split('/').pop()}</p>
                        <span className={`status-badge status-${submission.grade ? 'graded' : 'pending'}`}>
                          {submission.grade ? `Grade: ${submission.grade}` : 'Pending'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="evaluation-panel-card">
                {selectedSubmission ? (
                  <>
                    <div className="panel-header">
                      {/* ======================= FIX #2 ======================= */}
                      {/* Access the `full_name` property here as well */}
                      <h3 className="panel-title">Evaluate: {selectedSubmission.student.full_name}</h3>
                      {/* ====================================================== */}
                      <a href={selectedSubmission.file_url} target="_blank" rel="noopener noreferrer" className="download-link">📥 Download Submission</a>
                    </div>

                    <div className="submission-preview">
                      <div className="preview-placeholder">
                        <span className="preview-icon">📄</span>
                        <p className="preview-text">{selectedSubmission.file_url.split('/').pop()}</p>
                        <p className="preview-hint">Click download to view the full submission</p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmitEvaluation} className="evaluation-form">
                      {/* Your form JSX is already correct and needs no changes */}
                      <div className="form-group">
                        <label htmlFor="grade" className="form-label">Grade *</label>
                        <select
                          id="grade"
                          value={evaluationData.grade}
                          onChange={(e) => setEvaluationData({ ...evaluationData, grade: e.target.value })}
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
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default AssignmentEvaluate;