// MOCK USER DATA - Replace with actual API calls later
const MOCK_USER_DATA = {
    admin: {
      id: 'ADM-001',
      name: 'Dr. Admin',
      email: 'admin@campusync.com',
      role: 'admin',
      profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    faculty: {
      id: 'FAC-007',
      name: 'Prof. Jane Smith',
      email: 'jane.smith@campusync.com',
      role: 'faculty',
      profilePicture: 'https://randomuser.me/api/portraits/women/5.jpg',
    },
    student: {
      id: 'STU-123',
      name: 'John Doe',
      email: 'john.doe@campusync.com',
      role: 'student',
      profilePicture: 'https://randomuser.me/api/portraits/men/10.jpg',
    },
  };
  
  /**
   * Simulates fetching the currently logged-in user's data.
   * In a real app, you would get the user's role from a JWT token or session.
   * @param {string} userRole - The role of the user ('admin', 'faculty', 'student').
   * @returns {Promise<object>} - A promise that resolves with the user data.
   */
  export const getLoggedInUserData = (userRole) => {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        resolve(MOCK_USER_DATA[userRole] || null);
      }, 500);
    });
  };