// In your services/userService.js file (or wherever the other functions are)
import { supabase } from '../Supabaseclient';

// --- Functions you already have ---
// createUser, getAllUsers, deleteUser...

// ======================= ADD THIS NEW FUNCTION =======================

/**
 * Fetches a single user's profile from the 'users' table.
 * @param {string} userId - The UUID of the user from Supabase Auth.
 */
export const getUserProfile = async (userId) => {
  // If no user is logged in, there's no profile to fetch.
  if (!userId) return null;

  try {
    const { data, error } = await supabase
      .from('users')      // The name of your table with user profiles
      .select('*')        // Select all columns (name, role, department, etc.)
      .eq('id', userId)   // Find the row where the 'id' matches the logged-in user's ID
      .single();          // Expect to get only one record back

    if (error) {
      // This can happen if a user exists in auth but not in the users table yet.
      console.error("Error fetching user profile:", error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.error("An unexpected error occurred while fetching the profile:", error);
    return null;
  }
};
// ====================================================================