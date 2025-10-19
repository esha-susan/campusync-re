import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../../Supabaseclient'; // This path is correct based on your setup
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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    // --- Validation Logic ---
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      // --- Supabase Logic ---
      // This part sends the extra data to your trigger.
      // It does NOT affect the visual layout.
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            role: formData.role,
            department: formData.department,
            id_number: formData.rollNumber,
          }
        }
      });

      if (error) {
        throw error;
      }
      
      if (data.user) {
        setSuccess(true);
      }

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // --- JSX and CSS Structure (Unaltered) ---
  // The entire return statement below is exactly as you provided it,
  // ensuring your formatting and CSS are preserved.
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
            Registration successful! Please check your email for a verification link.
          </div>
        )}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">Full Name *</label>
            <input
              type="text" id="fullName" name="fullName" value={formData.fullName}
              onChange={handleChange} className="form-input" placeholder="Enter your full name"
              disabled={loading}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="role" className="form-label">I am a *</label>
              <select
                id="role" name="role" value={formData.role} onChange={handleChange}
                className="form-select" disabled={loading}
              >
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address *</label>
              <input
                type="email" id="email" name="email" value={formData.email}
                onChange={handleChange} className="form-input" placeholder="your.email@example.com"
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="rollNumber" className="form-label">
                {formData.role === 'student' ? 'Roll Number' : 'Employee ID'}
              </label>
              <input
                type="text" id="rollNumber" name="rollNumber" value={formData.rollNumber}
                onChange={handleChange} className="form-input"
                placeholder={formData.role === 'student' ? 'e.g., 21CS001' : 'e.g., EMP001'}
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="department" className="form-label">Department</label>
            <select
              id="department" name="department" value={formData.department} onChange={handleChange}
              className="form-select" disabled={loading}
            >
              <option value="">Select Department</option>
              <option value="cse">Computer Science Engineering</option>
              <option value="ece">Electronics & Communication</option>
              <option value="ee">Electrical Engineering</option>
              <option value="me">Mechanical Engineering</option>
              <option value="ce">Civil Engineering</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password *</label>
              <input
                type="password" id="password" name="password" value={formData.password}
                onChange={handleChange} className="form-input" placeholder="Min. 6 characters"
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password *</label>
              <input
                type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword}
                onChange={handleChange} className="form-input" placeholder="Re-enter password"
                disabled={loading}
              />
            </div>
          </div>

          <div className="terms-group">
            <label className="checkbox-label">
              <input type="checkbox" required disabled={loading} />
              <span>I agree to the Terms of Service and Privacy Policy</span>
            </label>
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
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