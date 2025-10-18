// src/services/assignmentService.js

let mockAssignments = [
    // ... your initial assignments
    { id: 1, title: 'Calculus I - Problem Set 1', dueDate: '2025-11-15', submitted: true, grade: 'A', status: 'graded' },
    { id: 2, title: 'History of Ancient Rome - Essay', dueDate: '2025-11-20', submitted: false, grade: null, status: 'pending' },
  ];
  
  const mockDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  export const getAssignments = async (userRole) => {
    console.log('[Service] Getting assignments. Current count:', mockAssignments.length);
    await mockDelay(500);
    return [...mockAssignments];
  };
  
  export const createAssignment = async (assignmentData) => {
    console.log('[Service] Trying to create assignment with:', assignmentData);
    await mockDelay(1000);
  
    const newAssignment = {
      id: Date.now(), // Use timestamp for a more unique ID
      ...assignmentData,
      submitted: false,
      grade: null,
      // IMPORTANT: Add the status property so filters work!
      status: 'pending', 
    };
  
    // The most important part: add the new assignment to the array
    mockAssignments.push(newAssignment);
    
    console.log('[Service] Assignment created. New count:', mockAssignments.length);
    console.log('[Service] Full list is now:', mockAssignments);
  
    return newAssignment;
  };