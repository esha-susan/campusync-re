// src/components/assignments/AssignmentFeedback.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSubmissionDetails } from '../../services/assignmentService';
import Navbar from '../common/Navbar';
import Sidebar from '../common/SideBar';
import Footer from '../common/Footer';
import './AssignmentFeedback.css'; // You can create a simple CSS file for styling

const AssignmentFeedback = ({ currentUser, onLogout }) => {
  const { id: assignmentId } = useParams();
  const studentId = currentUser.id;
  const navigate = useNavigate();

  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getSubmissionDetails(assignmentId, studentId);
        setDetails(data);
      } catch (err) {
        setError('Could not load feedback for this assignment.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [assignmentId, studentId]);

  if (isLoading) {
    return <div>Loading feedback...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="layout-wrapper">
      <Sidebar userRole="student" />
      <div className="main-content-wrapper">
        <Navbar userName={currentUser?.user_metadata?.full_name} userRole="Student" onLogout={onLogout} />
        <main className="page-content">
          <div className="page-header">
            <div>
              <h1 className="page-title">Assignment Feedback</h1>
              <p className="page-subtitle">{details?.assignment?.subject}: {details?.assignment?.title}</p>
            </div>
            <button onClick={() => navigate('/student/assignments')} className="btn btn-secondary">
              ← Back to Assignments
            </button>
          </div>

          <div className="feedback-container">
            <div className="feedback-card">
              <h3 className="feedback-card-title">Your Grade</h3>
              <p className="grade-display">{details?.grade || 'Not Graded'}</p>
            </div>
            <div className="feedback-card feedback-full-width">
              <h3 className="feedback-card-title">Instructor Feedback</h3>
              <p className="feedback-text">{details?.feedback || 'No feedback provided.'}</p>
            </div>
            <div className="feedback-card">
              <h3 className="feedback-card-title">Your Submission</h3>
              <a href={details?.file_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Download Your Submitted File
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AssignmentFeedback;