import React from 'react';
import './HelpModal.css'; // We will create this CSS file next

const HelpModal = ({ onClose }) => {
  return (
    <>
      {/* The dark background overlay */}
      <div className="modal-overlay" onClick={onClose}></div>

      {/* The modal content itself */}
      <div className="help-modal">
        <div className="modal-header">
          <h2>Contact & Support</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <p className="support-intro">
            If you encounter any issues or have questions, please don't hesitate to reach out to us through the following channels.
          </p>
          
          <div className="contact-section">
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <div>
                <span className="contact-label">General & Academic Support</span>
                <a href="mailto:support@campusync.edu" className="contact-value">support@campusync.edu</a>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <div>
                <span className="contact-label">Phone Support</span>
                <span className="contact-value">+1 (800) 123-4567</span>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">🕒</span>
              <div>
                <span className="contact-label">Support Hours</span>
                <span className="contact-value">Monday - Friday, 9:00 AM to 5:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpModal;