import React, { useState, useEffect } from 'react';
import { getSettings, saveSettings } from '../../services/settingsService';
import './AdminSettingsPage.css'; // We will create this next

// A reusable ToggleSwitch component for our settings
const ToggleSwitch = ({ label, checked, onChange }) => (
  <label className="toggle-switch">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span className="slider"></span>
    <span className="toggle-label">{label}</span>
  </label>
);

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch initial settings when the component loads
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSettings();
        setSettings(data);
      } catch (err) {
        setError('Failed to load settings.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  // Generic handler for text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  // Generic handler for toggle changes
  const handleToggleChange = (name) => {
    setSettings(prev => ({ ...prev, [name]: !prev[name] }));
  };

  // Handle the save button click
  const handleSave = async () => {
    setIsSaving(true);
    setSuccessMessage('');
    setError(null);
    try {
      await saveSettings(settings);
      setSuccessMessage('Settings saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000); // Hide message after 3 seconds
    } catch (err) {
      setError('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="loading-indicator">Loading Settings...</div>;
  if (error && !isSaving) return <div className="error-message">{error}</div>;

  return (
    <div className="settings-page">
      <h1 className="page-title">System Settings</h1>
      <p className="page-subtitle">Manage global application settings</p>

      {/* General Settings Section */}
      <div className="settings-section">
        <h2>General</h2>
        <div className="settings-item">
          <label htmlFor="siteName">Application Name</label>
          <input
            type="text"
            id="siteName"
            name="siteName"
            value={settings.siteName || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>
      
      {/* User Management Section */}
      <div className="settings-section">
        <h2>User Management</h2>
        <div className="settings-item-toggle">
          <ToggleSwitch
            label="Allow new user registrations"
            checked={settings.allowNewRegistrations || false}
            onChange={() => handleToggleChange('allowNewRegistrations')}
          />
        </div>
      </div>
      
      {/* System Maintenance Section */}
      <div className="settings-section">
        <h2>System</h2>
        <div className="settings-item-toggle">
          <ToggleSwitch
            label="Enable Maintenance Mode"
            checked={settings.maintenanceMode || false}
            onChange={() => handleToggleChange('maintenanceMode')}
          />
           <p className="setting-description">
            When enabled, non-admin users will be locked out of the system.
          </p>
        </div>
        <div className="settings-item-toggle">
          <ToggleSwitch
            label="Enable Email Notifications"
            checked={settings.enableEmailNotifications || false}
            onChange={() => handleToggleChange('enableEmailNotifications')}
          />
          <p className="setting-description">
            Turn off all outgoing system emails (e.g., password resets, notifications).
          </p>
        </div>
      </div>

      <div className="settings-actions">
        {successMessage && <div className="success-message">{successMessage}</div>}
        {error && <div className="error-message">{error}</div>}
        <button onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default AdminSettingsPage;