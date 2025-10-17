import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import Footer from '../common/Footer';
import './AssignmentEvaluate.css';

const AssignmentEvaluate = ({ onLogout }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [evaluationData, setEvaluationData] = useState({
    grade: '',
    feedback: ''
  });

  const assignment = {
    id: id,
    title: 'ER Diagram Design',
    subject: 'Database Systems',
    totalPoints: 20
  };

  const submissions = [
    { 
      id: 1, 
      student: 'John Doe', 
      rollNumber: '21CS001',
      submittedDate: '2025-10-03',
      fileName: 'er_diagram_library.pdf',
      status: 'pending'
    },
    { 
      id: 2, 
      student: 'Jane Smith', 
      rollNumber: '21CS002',
      submittedDate: '2025-10-04',
      fileName: 'library_er_design.pdf',
      status: 'graded',
      grade: 'A',
      feedback: 'Excellent work! Well structured ER diagram.'
    },
    { 
      id: 3, 
      student: 'Mike Johnson', 
      rollNumber: '21CS003',
      submittedDate: '2025-10-05',
      fileName: 'er_diagram_final.pdf',
      status: 'pending'
    }
  ];

  const handleEvaluate = (submission) => {
    setSelectedSubmission(submission);
    if (submission.status === 'graded') {
      setEvaluationData({
        grade: submission.grade,
        feedback: submission.feedback
      });
    } else {
      setEvaluationData({ grade: '', feedback: '' });
    }
  };

  const handleSubmitEvaluation = (e) => {
    e.preventDefault();
    if (!evaluationData.grade || !evaluationData.feedback) {
      alert('Please provide both grade and feedback');
      return;
    }
    alert('Evaluation saved successfully!');
    setSelectedSubmission(null);
    setEvaluationData({ grade: '', feedback: '' });
  };

  return (
    <div className="dashboard-layout">
      <Navbar userRole="faculty" userName="Dr. Sarah Wilson" onLogout={onLogout} />
      <div className="dashboard-container">
        <Sidebar userRole="faculty" />
        <main className="dashboard-main">
          <div className="dashboard-content">
            <div className="page-header">
              <div>
                <h1 className="page-title">Evaluate Submissions</h1>
                <p className="page-subtitle">{assignment.subject} - {assignment.title}</p>
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
                        <div className="student-avatar">{submission.student.charAt(0)}</div>
                        <div>
                          <h4 className="student-name">{submission.student}</h4>
                          <p className="student-roll">{submission.rollNumber}</p>
                        </div>
                      </div>
                      <div className="submission-details">
                        <p className="submission-date">📅 {submission.submittedDate}</p>
                        <p className="submission-file">📄 {submission.fileName}</p>
                        <span className={`status-badge status-${submission.status}`}>
                          {submission.status === 'graded' ? `Grade: ${submission.grade}` : 'Pending'}
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
                      <h3 className="panel-title">Evaluate: {selectedSubmission.student}</h3>
                      <a href="#" className="download-link">📥 Download Submission</a>
                    </div>

                    <div className="submission-preview">
                      <div className="preview-placeholder">
                        <span className="preview-icon">📄</span>
                        <p className="preview-text">{selectedSubmission.fileName}</p>
                        <p className="preview-hint">Click download to view the full submission</p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmitEvaluation} className="evaluation-form">
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