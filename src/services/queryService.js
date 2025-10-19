// This file acts as a fake database or API for handling queries.

// --- MOCK DATA ---
const allQueries = [
    { id: 1, studentId: 101, studentName: 'John Doe', subject: 'Doubt regarding deadlock prevention', queryText: "Hi, I'm having trouble understanding the difference between deadlock prevention and avoidance. Can you provide a simple example?", category: 'Academic', priority: 'high', status: 'pending', date: '2025-10-17', responses: [] },
    { id: 2, studentId: 102, studentName: 'Jane Smith', subject: 'Fee payment confirmation issue', queryText: "I paid my fees yesterday but the portal still shows 'Pending'. Can you please check on this?", category: 'Administrative', priority: 'urgent', status: 'pending', date: '2025-10-17', responses: [] },
    { id: 3, studentId: 101, studentName: 'John Doe', subject: 'Question about transaction isolation in SQL', queryText: "What is the practical difference between 'Read Committed' and 'Repeatable Read' isolation levels?", category: 'Assignment', priority: 'medium', status: 'answered', date: '2025-10-16', responses: [{ author: 'Dr. Wilson', text: "Great question! 'Read Committed' prevents dirty reads, while 'Repeatable Read' also prevents non-repeatable reads. I've attached a link to a helpful article in the portal.", date: '2025-10-16' }] },
    { id: 4, studentId: 103, studentName: 'Alice Brown', subject: 'Unable to upload certificate', queryText: "The system gives me an error every time I try to upload my PDF certificate for the recent workshop.", category: 'Technical', priority: 'high', status: 'pending', date: '2025-10-15', responses: [] },
  ];
  
  const currentStudentId = 101;
  
  export const getQueriesForRole = (userRole) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (userRole === 'student') {
          resolve(allQueries.filter(q => q.studentId === currentStudentId));
        } else {
          resolve(allQueries);
        }
      }, 500);
    });
  };
  
  export const getQueryById = (queryId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const query = allQueries.find(q => q.id === parseInt(queryId));
        if (query) {
          resolve(query);
        } else {
          reject(new Error('Query not found.'));
        }
      }, 300);
    });
  };
  
  export const postQueryResponse = (queryId, responseText) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const queryIndex = allQueries.findIndex(q => q.id === parseInt(queryId));
        if (queryIndex !== -1) {
          const newResponse = {
            author: 'Dr. Wilson',
            text: responseText,
            date: new Date().toISOString().split('T')[0],
          };
          allQueries[queryIndex].responses.push(newResponse);
          allQueries[queryIndex].status = 'answered';
          resolve(allQueries[queryIndex]);
        }
      }, 700);
    });
  };