//
// File: src/services/settingsService.js
//

// =========== THE FIX ===========
// Changed from '../Supabaseclient' to a path relative to the src root.
// Assuming Supabaseclient.js is in src/
import { supabase } from '../Supabaseclient'; 
// ===============================


const SETTINGS_TABLE = 'settings';

/**
 * Fetches all application settings.
 */
export const getSettings = async () => {
  const { data, error } = await supabase
    .from(SETTINGS_TABLE)
    .select('*')
    .eq('id', 1) 
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching settings:', error);
    throw error;
  }
  
  return data || {
    siteName: 'My University Portal',
    allowNewRegistrations: true,
    maintenanceMode: false,
    enableEmailNotifications: true,
  };
};

/**
 * Saves the application settings.
 */
export const saveSettings = async (settings) => {
  const { data, error } = await supabase
    .from(SETTINGS_TABLE)
    .update(settings)
    .eq('id', 1);

  if (error) {
    console.error('Error saving settings:', error);
    throw error;
  }
  return data;
};