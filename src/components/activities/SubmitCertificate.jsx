import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../common/SideBar';
import Navbar from '../common/Navbar';
import '../dashboard/Dashboard.css'; // Shared styles for the header
import './SubmitCertificate.css'; // Styles for this specific page

const SubmitCertificate = ({ onLogout }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    activityName: '', category: '', eventLevel: '', position: '', 
    eventDate: '', organizer: '', description: '', certificate: null
  });
  const [fileName, setFileName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const categories = ['Technical', 'Academic', 'Sports', 'Cultural', 'Social Service', 'Other'];
  const eventLevels = ['International', 'National', 'State', 'University', 'College'];
  const positions = ['Winner', 'Runner Up', 'Participant', 'Organizer'];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, certificate: file });
      setFileName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.activityName || !formData.category || !formData.eventLevel || 
        !formData.position || !formData.eventDate || !formData.certificate) {
      alert('Please fill in all required fields');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      alert('Certificate submitted successfully! Your submission is pending approval.');
      navigate('/student/activities');
    }, 1500);
  };

  return (
    <div className="layout-wrapper">
      <Sidebar userRole="student" />
      <div className="main-content-wrapper">
        <Navbar userName="John Doe" userRole="Student" />
        <main className="page-content">
          <div className="page-header">
            <div>
              <h1 className="page-title"><span className="gradient-text">Submit Certificate</span></h1>
              <p className="page-subtitle">Upload your activity certificate for approval</p>
            </div>
          </div>

          <div className="submit-certificate-container">
            <div className="form-card">
              <form onSubmit={handleSubmit} className="certificate-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="activityName" className="form-label">Activity Name *</label>
                    <input type="text" id="activityName" value={formData.activityName} onChange={(e) => setFormData({ ...formData, activityName: e.target.value })} className="form-input" placeholder="e.g., Smart India Hackathon"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="category" className="form-label">Category *</label>
                    <select id="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="form-select">
                      <option value="">Select Category</option>
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="eventLevel" className="form-label">Event Level *</label>
                    <select id="eventLevel" value={formData.eventLevel} onChange={(e) => setFormData({ ...formData, eventLevel: e.target.value })} className="form-select">
                      <option value="">Select Level</option>
                      {eventLevels.map(level => <option key={level} value={level}>{level}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="position" className="form-label">Position *</label>
                    <select id="position" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} className="form-select">
                      <option value="">Select Position</option>
                      {positions.map(pos => <option key={pos} value={pos}>{pos}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="eventDate" className="form-label">Event Date *</label>
                      <input type="date" id="eventDate" value={formData.eventDate} onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })} className="form-input" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="organizer" className="form-label">Organized By</label>
                      <input type="text" id="organizer" value={formData.organizer} onChange={(e) => setFormData({ ...formData, organizer: e.target.value })} className="form-input" placeholder="e.g., IEEE, ACM" />
                    </div>
                  </div>
                <div className="form-group">
                  <label htmlFor="certificate" className="form-label">Upload Certificate *</label>
                  <div className="file-upload-area">
                    <input type="file" id="certificate" onChange={handleFileChange} className="file-input" accept=".pdf,.jpg,.jpeg,.png"/>
                    <div className="file-upload-content">
                      {fileName ? (
                        <div className="file-selected">
                          <span>📄</span><span className="file-name">{fileName}</span>
                          <button type="button" className="remove-file" onClick={() => { setFileName(''); setFormData({ ...formData, certificate: null }); }}>✕</button>
                        </div>
                      ) : (
                        <>
                          <span>📤</span><p className="upload-text">Click to upload certificate</p><p className="upload-hint">PDF, JPG, PNG (Max 5MB)</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => navigate('/student/activities')}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit for Approval'}</button>
                </div>
              </form>
            </div>
            <div className="info-card">
              <h3 className="info-title">📋 Submission Guidelines</h3>
              <ul className="info-list">
                <li>Ensure the certificate is clear and readable</li>
                <li>Certificate must include your name and event details</li>
                <li>Upload original certificates only</li>
                <li>Submission will be reviewed within 3-5 working days</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SubmitCertificate;