import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userService'; // Import our new service
import Navbar from '../common/Navbar';
import Sidebar from '../common/SideBar';
import Footer from '../common/Footer';
import './CreateUserPage.css'; // We will create this CSS file

const CreateUserPage = ({ onLogout }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'student', // Default role
    department: 'CSE', // Default department
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError('Name and Email are required.');
      return;
    }
    setIsSubmitting(true);
    setError('');
    try {
      await createUser(formData);
      alert('User created successfully!');
      navigate('/dashboard'); // Redirect to dashboard after success
    } catch (err) {
      setError('Failed to create user. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="layout-wrapper">
      <Sidebar userRole="admin" />
      <div className="main-content-wrapper">
        <Navbar userName="Admin User" userRole="Admin" onLogout={onLogout} />
        <main className="dashboard-main">
          <div className="dashboard-content">
            <div className="welcome-section">
              <div>
                <h1 className="dashboard-title">Create New User</h1>
                <p className="dashboard-subtitle">Add a new student or faculty member to the system.</p>
              </div>
              <Link to="/dashboard" className="btn-primary-link">&larr; Back to Dashboard</Link>
            </div>
            
            <div className="dashboard-card">
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <select id="role" name="role" value={formData.role} onChange={handleChange}>
                      <option value="student">Student</option>
                      <option value="faculty">Faculty</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="department">Department</label>
                    <select id="department" name="department" value={formData.department} onChange={handleChange}>
                      <option value="CSE">Computer Science</option>
                      <option value="ECE">Electronics & Communication</option>
                      <option value="ME">Mechanical Engineering</option>
                      <option value="CE">Civil Engineering</option>
                    </select>
                  </div>
                </div>
                {error && <p className="form-error">{error}</p>}
                <div className="form-actions">
                  <button type="submit" className="btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating User...' : 'Create User'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default CreateUserPage;