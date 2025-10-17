import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    rollNumber: '',
    department: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    // Simulate registration
    setSuccess(true);
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <div className="register-header">
          <Link to="/" className="back-link">← Back</Link>
          <div className="register-logo">
            <div className="logo-icon">C</div>
            <span className="logo-text">Campusync</span>
          </div>
          <h2 className="register-title">Create Your Account</h2>
          <p className="register-subtitle">Join Campusync and streamline your academic journey</p>
        </div>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠</span>
            {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            <span className="success-icon">✓</span>
            Registration successful! Redirecting to login...
          </div>
        )}

        <form onSubmit={handleSubmit} className="register-form">
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">Full Name *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your full name"
            />
          </div>

          {/* Role Selection */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="role" className="form-label">I am a *</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="form-select"
              >
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
          </div>

          {/* Email & Roll/Employee ID */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="rollNumber" className="form-label">
                {formData.role === 'student' ? 'Roll Number' : 'Employee ID'}
              </label>
              <input
                type="text"
                id="rollNumber"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                className="form-input"
                placeholder={formData.role === 'student' ? 'e.g., 21CS001' : 'e.g., EMP001'}
              />
            </div>
          </div>

          {/* Department */}
          <div className="form-group">
            <label htmlFor="department" className="form-label">Department</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select Department</option>
              <option value="cse">Computer Science Engineering</option>
              <option value="ece">Electronics & Communication</option>
              <option value="ee">Electrical Engineering</option>
              <option value="me">Mechanical Engineering</option>
              <option value="ce">Civil Engineering</option>
            </select>
          </div>

          {/* Password & Confirm Password */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Min. 6 characters"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
                placeholder="Re-enter password"
              />
            </div>
          </div>

          {/* Terms */}
          <div className="terms-group">
            <label className="checkbox-label">
              <input type="checkbox" required />
              <span>I agree to the Terms of Service and Privacy Policy</span>
            </label>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Create Account
          </button>
        </form>

        <div className="register-footer">
          <p>Already have an account? <Link to="/login" className="login-link">Sign in here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
