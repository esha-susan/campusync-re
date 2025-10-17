import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    // Simulate login - In real app, this would be an API call
    onLogin(formData.role);
    navigate(`/${formData.role}/dashboard`);
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-branding">
          <div className="brand-logo">
            <div className="logo-icon-large">C</div>
          </div>
          <h1 className="brand-title">Campusync</h1>
          <p className="brand-subtitle">Your Gateway to Academic Excellence</p>
          <div className="brand-features">
            <div className="brand-feature">
              <span className="feature-icon">✓</span>
              <span>Assignment Management</span>
            </div>
            <div className="brand-feature">
              <span className="feature-icon">✓</span>
              <span>Smart Calendar</span>
            </div>
            <div className="brand-feature">
              <span className="feature-icon">✓</span>
              <span>Activity Tracking</span>
            </div>
            <div className="brand-feature">
              <span className="feature-icon">✓</span>
              <span>Direct Communication</span>
            </div>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-form-container">
          <div className="form-header">
            <h2 className="form-title">Welcome Back!</h2>
            <p className="form-subtitle">Sign in to access your dashboard</p>
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="role" className="form-label">I am a</label>
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

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your password"
              />
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-link">Forgot Password?</a>
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Sign In
            </button>
          </form>

          <div className="form-footer">
            <p>Don't have an account? <Link to="/register" className="register-link">Register here</Link></p>
          </div>

          <div className="back-home">
            <Link to="/" className="home-link">← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;