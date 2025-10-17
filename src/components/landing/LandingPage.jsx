import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: '📚',
      title: 'Assignment Management',
      description: 'Submit, track, and evaluate assignments seamlessly with automated notifications and feedback.'
    },
    {
      icon: '📅',
      title: 'Smart Calendar',
      description: 'Never miss an event with priority-based notifications and integrated deadline tracking.'
    },
    {
      icon: '🏆',
      title: 'Activity Points',
      description: 'Track and manage co-curricular activities with KTU point system integration.'
    },
    {
      icon: '💬',
      title: 'Communication Hub',
      description: 'Direct query submission to faculty and admins with real-time tracking and responses.'
    },
    {
      icon: '👥',
      title: 'Multi-Role Access',
      description: 'Customized dashboards for students, faculty, and administrators.'
    },
    {
      icon: '🔒',
      title: 'Secure Platform',
      description: 'Role-based authentication ensuring data privacy and security.'
    }
  ];

  return (
    <div className="landing-page">
      <nav className={`landing-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon">C</span>
            <span className="logo-name">Campusync</span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <Link to="/login" className="btn btn-primary">Login</Link>
          </div>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Welcome to <span className="gradient-text">Campusync</span>
            </h1>
            <p className="hero-subtitle">
              Your all-in-one academic management platform for seamless collaboration between students, faculty, and administration.
            </p>
            <div className="hero-buttons">
              <Link to="/register" className="btn btn-primary btn-large">Get Started</Link>
              <Link to="/login" className="btn btn-outline btn-large">Sign In</Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-card card-1">
              <div className="card-icon">📚</div>
              <div className="card-text">Assignments</div>
            </div>
            <div className="floating-card card-2">
              <div className="card-icon">📅</div>
              <div className="card-text">Events</div>
            </div>
            <div className="floating-card card-3">
              <div className="card-icon">🏆</div>
              <div className="card-text">Activities</div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="features-section">
        <div className="section-container">
          <h2 className="section-title">Powerful Features</h2>
          <p className="section-subtitle">Everything you need for efficient academic management</p>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="section-container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="section-title">About Campusync</h2>
              <p className="about-description">
                Campusync is a centralized student portal developed by students of Govt Model Engineering College 
                to streamline academic activities and communication. Our platform integrates essential features 
                for user management, assignment tracking, event scheduling, and query handling into a single, 
                secure system.
              </p>
              <p className="about-description">
                With role-based access and personalized dashboards, Campusync ensures that students, faculty, 
                and administrators can efficiently manage their academic responsibilities.
              </p>
              <div className="about-team">
                <h3>Developed By</h3>
                <div className="team-members">
                  <span className="team-member">Drishya Ajith</span>
                  <span className="team-member">Dyuthi Hareesh</span>
                  <span className="team-member">Esha Susan Shaji</span>
                  <span className="team-member">Iba Raphy</span>
                </div>
              </div>
            </div>
            <div className="about-stats">
              <div className="stat-card">
                <div className="stat-number">3</div>
                <div className="stat-label">User Roles</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">6+</div>
                <div className="stat-label">Core Features</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">100%</div>
                <div className="stat-label">Secure</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-icon">C</span>
            <span className="logo-name">Campusync</span>
          </div>
          <p className="footer-text">
            © 2025 Campusync. Govt Model Engineering College. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;