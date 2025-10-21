import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = ({ onLogout, userRole }) => {
  const [scrolled, setScrolled] = useState(false);

  // This useEffect handles the scroll-in animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

    const targets = document.querySelectorAll('.animate-on-scroll');
    targets.forEach(target => observer.observe(target));

    // Cleanup observer on component unmount
    return () => targets.forEach(target => observer.unobserve(target));
  }, []);
  
  // This useEffect handles the scrolled navbar style
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- FIX APPLIED HERE ---
  // Handler to prevent default link behavior for the logout action
  const handleLogoutClick = (e) => {
    e.preventDefault();
    // 1. Safety check to prevent "TypeError: onLogout is not a function"
    if (typeof onLogout === 'function') {
      onLogout();
    }
  };
  // -------------------------

  // Determine the correct dashboard path based on the user's role
  const dashboardPath = userRole ? `/${userRole}/dashboard` : '/dashboard';

  // Check if the user is authenticated (by checking if onLogout prop was passed)
  const isAuthenticated = typeof onLogout === 'function';

  return (
    <div className="landing-page">
      <nav className={`landing-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon">C</span>
            <span className="logo-name">Campusync</span>
          </div>
          
          {/* --- FIX APPLIED HERE: Conditional Navigation Links --- */}
          <div className="nav-links">
            {isAuthenticated ? (
              // Links for Authenticated Users
              <>
                <Link to={dashboardPath} className="nav-item">Dashboard</Link>
                <Link to="/profile" className="nav-item">Profile</Link>
                <a href="#" onClick={handleLogoutClick} className="nav-item">Logout</a>
              </>
            ) : (
              // Links for Guest Users
              <>
                <Link to="/login" className="btn btn-primary btn-small">Login</Link>
                <Link to="/register" className="btn btn-secondary btn-small">Register</Link>
              </>
            )}
          </div>
          {/* ---------------------------------------------------- */}
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Welcome to <span className="gradient-text">Campusync</span>
            </h1>
            <p className="hero-subtitle">
              Your academic life, organized and connected. Get started by exploring the features.
            </p>
            <div className="hero-buttons">
              <Link to="/features" className="btn btn-primary btn-large">Explore Features</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pillars-section">
        <div className="section-container">
          <h2 className="section-title animate-on-scroll">A Centralized Hub for Your College Life</h2>
          <div className="pillars-grid">
            <div className="pillar-card animate-on-scroll">
              <div className="pillar-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
              </div>
              <h3 className="pillar-title">Streamlined Academics</h3>
              <p className="pillar-description">
                Effortlessly manage assignments, track deadlines, and monitor your academic progress from a single, unified dashboard.
              </p>
            </div>
            <div className="pillar-card animate-on-scroll">
              <div className="pillar-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>
              </div>
              <h3 className="pillar-title">Seamless Communication</h3>
              <p className="pillar-description">
                Connect directly with faculty and administration. Submit queries and receive timely responses without the clutter of emails.
              </p>
            </div>
            <div className="pillar-card animate-on-scroll">
              <div className="pillar-icon">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-3.75-2.25M21 18l-3.75-2.25m0 0l-3.75 2.25M15 12l5.25-3M15 12v6" /></svg>
              </div>
              <h3 className="pillar-title">Holistic Development</h3>
              <p className="pillar-description">
                Keep track of co-curricular activities and manage your KTU activity points to ensure well-rounded growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="section-container">
          <div className="about-content">
            <div className="about-text animate-on-scroll">
              <h2 className="section-title" style={{textAlign: 'left'}}>About Campusync</h2>
              <p className="about-description">
                Campusync is a centralized student portal developed by students of Govt Model Engineering College 
                to streamline academic activities and communication.
              </p>
              <div className="about-team">
                <h3>Developed By</h3>
                <div className="team-members">
                  <span>Drishya Ajith</span>
                  <span>Dyuthi Hareesh</span>
                  <span>Esha Susan Shaji</span>
                  <span>Iba Raphy</span>
                </div>
              </div>
            </div>
            <div className="about-stats animate-on-scroll">
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