// This service simulates fetching and saving application-wide settings from a backend.

// --- OUR MOCK DATABASE FOR SETTINGS ---
// In a real app, this would be stored in a database.
let mockSettings = {
    siteName: 'EduPortal Pro',
    maintenanceMode: false,
    allowNewRegistrations: true,
    defaultTheme: 'light',
    enableEmailNotifications: true,
  };
  // --- END MOCK DATABASE ---
  
  const mockDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  /**
   * Fetches the current system settings.
   * @returns {Promise<object>} A promise that resolves to the settings object.
   */
  export const getSettings = async () => {
    console.log('[Service] Fetching system settings...');
    await mockDelay(600); // Simulate network delay
    return { ...mockSettings }; // Return a copy
  };
  
  /**
   * Saves updated system settings.
   * @param {object} newSettings - The settings object to save.
   * @returns {Promise<object>} A promise that resolves to the updated settings.
   */
  export const saveSettings = async (newSettings) => {
    console.log('[Service] Saving new settings:', newSettings);
    await mockDelay(1000); // Simulate network delay
  
    // Update our in-memory settings object
    mockSettings = { ...mockSettings, ...newSettings };
    
    console.log('[Service] Settings updated successfully.');
    return { ...mockSettings };
  };