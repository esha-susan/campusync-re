import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAssignmentPage.css';
// 1. Import the service function
import { createAssignment } from '../../services/assignmentService';

const CreateAssignmentPage = ({ onLogout }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const assignmentData = { title, description, dueDate };

    try {
      // 2. Call the service function instead of console.log
      await createAssignment(assignmentData);
      alert('Assignment created successfully!');
      // 3. Redirect the user after successful creation
      navigate('/faculty/assignments');
    } catch (err) {
      setError('Failed to create assignment. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-assignment-container">
      <header className="page-header">
        <h1>Create New Assignment</h1>
        <button onClick={onLogout} className="logout-button">Logout</button>
      </header>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="create-assignment-form">
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="title">Assignment Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          {/* 4. Disable button while loading */}
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Assignment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAssignmentPage;