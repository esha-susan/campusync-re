import React from 'react';
import { Link } from 'react-router-dom';
import './FeaturesPage.css';

const FeaturesPage = () => {
  return (
    <div className="features-page-container">
      <div className="features-page-content">
        <h1 className="features-page-title">Explore Features</h1>
        <p className="features-page-subtitle">
          Select an action to get started with your academic tasks.
        </p>
        
        <div className="actions-grid">
          <Link to="/assignments" className="action-card">
            <div className="action-card-content">
              <div className="action-icon">📚</div>
              <h3 className="action-title">Assignment Management</h3>
              <p className="action-description">View deadlines, submit your work, and check grades.</p>
            </div>
            <div className="action-arrow">→</div>
          </Link>
          <Link to="/calendar" className="action-card">
            <div className="action-card-content">
              <div className="action-icon">📅</div>
              <h3 className="action-title">Smart Calendar</h3>
              <p className="action-description">See all upcoming events, holidays, and important dates.</p>
            </div>
            <div className="action-arrow">→</div>
          </Link>

          {/* --- THIS IS THE CORRECTED LINK --- */}
          <Link to="/submit-query" className="action-card">
            <div className="action-card-content">
              <div className="action-icon">💬</div>
              <h3 className="action-title">Communication Hub</h3>
              <p className="action-description">Contact faculty or administration with your questions.</p>
            </div>
            <div className="action-arrow">→</div>
          </Link>
          {/* --- END OF CORRECTION --- */}

           <Link to="/activities" className="action-card">
            <div className="action-card-content">
              <div className="action-icon">🏆</div>
              <h3 className="action-title">Activity Points</h3>
              <p className="action-description">Track and manage your co-curricular activity points.</p>
            </div>
            <div className="action-arrow">→</div>
          </Link>
        </div>

        <div className="back-link-container">
          <Link to="/landing" className="back-link">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;