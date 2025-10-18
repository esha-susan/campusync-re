import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../common/SideBar';
import Navbar from '../common/Navbar';
import '../dashboard/Dashboard.css'; // Shared styles for the header
import './SubmitCertificate.css'; // Styles for this specific page

// The component now accepts the full 'user' object as a prop
// I've added a default empty object for 'user' if it's not provided,
// though optional chaining is generally preferred if you expect it might be null/undefined.
const SubmitCertificate = ({ user = {}, onLogout }) => { // Added default user = {}
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    activityName: '',
    category: '',
    eventLevel: '',
    position: '',
    eventDate: '',
    organizer: '',
    certificate: null,
    activityPoints: '' // Stored as string initially for text input
  });
  const [fileName, setFileName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(''); // State to hold error messages

  const categories = ['Technical', 'Academic', 'Sports', 'Cultural', 'Social Service', 'Other'];
  const eventLevels = ['International', 'National', 'State', 'University', 'College'];
  const positions = ['Winner', 'Runner Up', 'Participant', 'Organizer'];

  const handleFileChange = (e) => {
    setError(''); // Clear previous errors
    const file = e.target.files[0];
    if (file) {
      // Basic file size validation (e.g., max 5MB)
      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
      if (file.size > MAX_FILE_SIZE) {
        setError('File size exceeds 5MB. Please upload a smaller file.');
        setFormData({ ...formData, certificate: null });
        setFileName('');
        return;
      }
      setFormData({ ...formData, certificate: file });
      setFileName(file.name);
    } else {
      setFormData({ ...formData, certificate: null });
      setFileName('');
    }
  };

  const handleInputChange = (e) => {
    setError(''); // Clear previous errors on any input change
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors before new submission attempt

    // Validate all required fields
    if (
      !formData.activityName ||
      !formData.category ||
      !formData.eventLevel ||
      !formData.position ||
      !formData.eventDate ||
      !formData.certificate ||
      !formData.activityPoints
    ) {
      setError('Please fill in all required fields and upload your certificate.');
      return;
    }

    // Further validation for activityPoints
    const points = parseInt(formData.activityPoints, 10);
    if (isNaN(points) || points <= 0) {
      setError('Activity Points must be a positive number.');
      return;
    }

    // Ensure certificate is actually a File object
    if (!(formData.certificate instanceof File)) {
        setError('Please upload a valid certificate file.');
        return;
    }

    setSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // In a real application, you would send formData to your backend here
      console.log('Submitting certificate:', { ...formData, certificateFileName: formData.certificate.name });
      alert(`Certificate for ${points} points submitted successfully! Your submission is pending approval.`);
      setSubmitting(false); // Reset submitting state
      navigate('/student/activities');
    }, 1500);
  };

  return (
    <div className="layout-wrapper">
      {/* Use optional chaining for user properties in Sidebar and Navbar */}
      <Sidebar userRole={user?.role} />
      <div className="main-content-wrapper">
        <Navbar userName={user?.name} userRole={user?.role} onLogout={onLogout} />
        <main className="page-content">
          <div className="page-header">
            <div>
              <h1 className="page-title"><span className="gradient-text">Submit Certificate</span></h1>
              <p className="page-subtitle">Upload your activity certificate and claim your points</p>
            </div>
          </div>

          <div className="submit-certificate-container">
            <div className="form-card">
              <form onSubmit={handleSubmit} className="certificate-form">
                {error && <p className="form-error-message">{error}</p>} {/* Display error message */}

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="activityName" className="form-label">Activity Name *</label>
                    <input
                      type="text"
                      id="activityName"
                      value={formData.activityName}
                      onChange={handleInputChange} // Use generic handler
                      className="form-input"
                      placeholder="e.g., Smart India Hackathon"
                      required // HTML5 validation
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category" className="form-label">Category *</label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={handleInputChange} // Use generic handler
                      className="form-select"
                      required // HTML5 validation
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="eventLevel" className="form-label">Event Level *</label>
                    <select
                      id="eventLevel"
                      value={formData.eventLevel}
                      onChange={handleInputChange} // Use generic handler
                      className="form-select"
                      required // HTML5 validation
                    >
                      <option value="">Select Level</option>
                      {eventLevels.map(level => <option key={level} value={level}>{level}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="position" className="form-label">Position *</label>
                    <select
                      id="position"
                      value={formData.position}
                      onChange={handleInputChange} // Use generic handler
                      className="form-select"
                      required // HTML5 validation
                    >
                      <option value="">Select Position</option>
                      {positions.map(pos => <option key={pos} value={pos}>{pos}</option>)}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="eventDate" className="form-label">Event Date *</label>
                      <input
                        type="date"
                        id="eventDate"
                        value={formData.eventDate}
                        onChange={handleInputChange} // Use generic handler
                        className="form-input"
                        required // HTML5 validation
                      />
                    </div>
                    <div className="form-group">
                        <label htmlFor="activityPoints" className="form-label">Activity Points Claimed *</label>
                        <input
                          type="number"
                          id="activityPoints"
                          value={formData.activityPoints}
                          onChange={handleInputChange} // Use generic handler
                          className="form-input"
                          placeholder="e.g., 20"
                          min="1" // Prevents users from entering 0 or negative numbers
                          required // HTML5 validation
                        />
                    </div>
                </div>

                <div className="form-group">
                  <label htmlFor="organizer" className="form-label">Organized By</label>
                  <input
                    type="text"
                    id="organizer"
                    value={formData.organizer}
                    onChange={handleInputChange} // Use generic handler
                    className="form-input"
                    placeholder="e.g., IEEE, ACM"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="certificate" className="form-label">Upload Certificate *</label>
                  <div className="file-upload-area">
                    <input
                      type="file"
                      id="certificate"
                      onChange={handleFileChange}
                      className="file-input"
                      accept=".pdf,.jpg,.jpeg,.png"
                      required // HTML5 validation
                    />
                    <div className="file-upload-content">
                      {fileName ? (
                        <div className="file-selected">
                          <span>📄</span><span className="file-name">{fileName}</span>
                          <button
                            type="button"
                            className="remove-file"
                            onClick={() => {
                              setFileName('');
                              setFormData({ ...formData, certificate: null });
                              setError(''); // Clear error if file is removed
                            }}
                          >✕</button>
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
                <li>Claim the activity points as per the event guidelines</li>
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