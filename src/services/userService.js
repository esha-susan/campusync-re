// A mock database of existing users.
const allUsers = [
    { id: 101, name: 'John Doe', email: 'john.doe@example.com', role: 'student', department: 'CSE' },
    { id: 201, name: 'Dr. Sarah Wilson', email: 'sarah.wilson@example.com', role: 'faculty', department: 'ECE' },
    { id: 301, name: 'Admin User', email: 'admin@example.com', role: 'admin', department: 'Administration' },
  ];
  
  /**
   * Simulates creating a new user and adding them to our mock database.
   * @param {object} userData - An object containing { name, email, role, department }.
   * @returns {Promise<object>} A promise that resolves with the newly created user object.
   */
  export const createUser = (userData) => {
    return new Promise((resolve, reject) => {
      // Basic validation
      if (!userData.name || !userData.email || !userData.role || !userData.department) {
        return reject(new Error("All fields are required."));
      }
  
      setTimeout(() => {
        const newUser = {
          id: Date.now(), // Create a unique ID based on the current timestamp
          ...userData,
        };
        allUsers.push(newUser);
        console.log("User Created:", newUser);
        console.log("All Users:", allUsers);
        resolve(newUser);
      }, 800); // Simulate an 800ms network delay
    });
  };