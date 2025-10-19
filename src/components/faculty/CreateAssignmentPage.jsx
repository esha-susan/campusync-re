import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/SideBar';
import Footer from '../common/Footer';
import './CreateAssignmentPage.css';
import { createAssignment } from '../../services/assignmentService';

const CreateAssignmentPage = ({ onLogout }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [points, setPoints] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const subjects = [
    'Database Systems',
    'Operating Systems',
    'Computer Networks',
    'Web Development',
    'Data Structures',
    'Algorithms'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!title || !description || !subject || !dueDate || !points) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    const assignmentData = { 
      title, 
      description, 
      subject,
      dueDate, 
      points: parseInt(points),
      status: 'pending'
    };

    try {
      await createAssignment(assignmentData);
      alert('Assignment created successfully!');
      navigate('/faculty/assignments');
    } catch (err) {
      setError('Failed to create assignment. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="layout-wrapper">
      <Sidebar userRole="faculty" />
      <div className="main-content-wrapper">
        <Navbar userName="Dr. Sarah Wilson" userRole="Faculty" onLogout={onLogout} />
        <main className="page-content">
          <div className="page-header">
            <div>
              <h1 className="page-title"><span className="gradient-text">Create Assignment</span></h1>
              <p className="page-subtitle">Create a new assignment for your students</p>
            </div>
          </div>

          <div className="create-assignment-container">
            <form onSubmit={handleSubmit} className="assignment-form">
              {error && <div className="error-message">{error}</div>}

              <div className="form-group">
                <label htmlFor="title">Assignment Title *</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., ER Diagram Design"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  >
                    <option value="">Select Subject</option>
                    {subjects.map(subj => (
                      <option key={subj} value={subj}>{subj}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="dueDate">Due Date *</label>
                  <input
                    type="date"
                    id="dueDate"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="points">Points *</label>
                  <input
                    type="number"
                    id="points"
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                    placeholder="20"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide detailed instructions for the assignment"
                  rows="8"
                  required
                ></textarea>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => navigate('/faculty/assignments')}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating...' : 'Create Assignment'}
                </button>
              </div>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default CreateAssignmentPage;