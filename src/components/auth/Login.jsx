import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../../Supabaseclient'; // CORRECTED IMPORT PATH
import './Login.css';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        const userRole = data.user.user_metadata.role;
        if (!userRole) {
            throw new Error("User role not found. Please contact support.");
        }
        
        onLogin(userRole); // This still correctly sets the user's role in the app state
        navigate('/landing'); // MODIFIED: This now redirects to the landing page
      }

    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left"></div>
      <div className="login-right">
        <div className="login-form-container">
          <div className="form-header">
            <h2 className="form-title">Welcome Back!</h2>
            <p className="form-subtitle">Sign in to access your dashboard</p>
          </div>

          {error && (
            <div className="error-message">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={loading}
              />
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" disabled={loading} />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-link">Forgot Password?</a>
            </div>

            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="form-footer">
            <p>
              Don't have an account? <Link to="/register" className="register-link">Register here</Link>
            </p>
            <p>
              <Link to="/" className="home-link">← Back to Home</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;