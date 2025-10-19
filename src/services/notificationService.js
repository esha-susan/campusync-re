// This file acts as a fake database for all notifications in the system.

// MOCK DATA: A list of all notifications.
// `recipientId`: ID of the specific user (e.g., studentId, facultyId).
// `recipientRole`: A general role ('student', 'faculty').
const allNotifications = [
    // For Students & Faculty
    { id: 1, type: 'NEW_EVENT', message: 'The annual Tech Fest has been scheduled for 2025-11-15.', recipientRole: 'student', read: false, timestamp: '1 hour ago' },
    { id: 2, type: 'NEW_EVENT', message: 'The annual Tech Fest has been scheduled for 2025-11-15.', recipientRole: 'faculty', read: true, timestamp: '1 hour ago' },
  
    // For a specific student (John Doe, ID 101)
    { id: 3, type: 'ASSIGNMENT_GRADED', message: 'Your "ER Diagram Design" assignment has been graded.', recipientId: 101, read: false, timestamp: '3 hours ago' },
    { id: 4, type: 'CERTIFICATE_APPROVED', message: 'Your "Hackathon Winner" certificate was approved. +15 pts!', recipientId: 101, read: false, timestamp: '8 hours ago' },
    { id: 5, type: 'QUERY_RESPONSE', message: 'Dr. Wilson has responded to your query about "deadlock prevention".', recipientId: 101, read: true, timestamp: '1 day ago' },
  
    // For a specific faculty member (Dr. Wilson, ID 201)
    { id: 6, type: 'QUERY_NEW', message: 'New query from Jane Smith regarding "Fee payment".', recipientId: 201, read: false, timestamp: '25 minutes ago' },
  
    // For Admins
    { id: 7, type: 'CERTIFICATE_PENDING', message: 'A new certificate from Alex Ray is awaiting approval.', recipientRole: 'admin', read: false, timestamp: '2 hours ago' },
    { id: 8, type: 'CERTIFICATE_PENDING', message: 'A new certificate from Maria Garcia is awaiting approval.', recipientRole: 'admin', read: true, timestamp: '5 hours ago' },
  ];
  
  /**
   * Fetches notifications specifically for the logged-in user.
   * @param {string} userRole - 'student', 'faculty', or 'admin'
   * @param {number} userId - The unique ID of the logged-in user.
   * @returns {Promise<Array>} A promise that resolves with the user's notifications.
   */
  export const getNotificationsForUser = (userRole, userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userNotifications = allNotifications.filter(notif => {
          // 1. Is it a direct notification to this user? (e.g., a grade for a student)
          if (notif.recipientId === userId) return true;
          
          // 2. Is it a broadcast to this user's role? (e.g., an event for all students)
          if (notif.recipientRole === userRole) return true;
  
          return false;
        });
        resolve(userNotifications);
      }, 400); // Simulate network delay
    });
  };