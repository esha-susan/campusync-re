// src/services/notificationService.js

import { supabase } from '../../Supabaseclient'; // Make sure this path points to your Supabase client

/**
 * Fetches all notifications for the currently logged-in user.
 */
export const getNotificationsForUser = async () => {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .order('created_at', { ascending: false }); // Show newest first

  if (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
  return data;
};

/**
 * Marks a specific notification as read in the database.
 */
export const markNotificationAsRead = async (notificationId) => {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId);

  if (error) {
    console.error('Error marking notification as read:', error);
  }
};