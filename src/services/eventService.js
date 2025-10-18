// --- MOCK DATABASE FOR CALENDAR EVENTS ---
// By declaring this with 'let' at the top level of the module,
// it will persist as long as you don't do a full page refresh.
let mockEvents = [
    // --- CORRECTED DATES FOR OCTOBER 2025 ---
    { id: 101, title: 'Database Systems Assignment Due', date: '2025-10-05', type: 'deadline', description: 'ER Diagram submission' },
    { id: 102, title: 'Workshop on AI/ML', date: '2025-10-10', type: 'workshop', description: 'Introduction to Machine Learning' },
    { id: 103, title: 'Tech Fest 2025', date: '2025-10-15', type: 'fest', description: 'Annual technical festival' },
    { id: 104, title: 'Team Sync Meeting', date: '2025-10-19', type: 'meeting', description: 'Project status update' },
    { id: 105, title: 'Cultural Night', date: '2025-10-25', type: 'cultural', description: 'Annual cultural program' }
  ];
  // --- END MOCK DATABASE ---
  
  const mockDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  /**
   * Fetches all calendar events FROM our mock database.
   */
  export const getEvents = async () => {
    console.log('[Service] Fetching events. Current count:', mockEvents.length);
    await mockDelay(500);
    // Return a copy of the array to prevent accidental mutation
    return [...mockEvents];
  };
  
  /**
   * Creates a new event and ADDS IT to our mock database.
   */
  export const createEvent = async (eventData) => {
    console.log('[Service] Attempting to create event:', eventData);
    await mockDelay(800);
  
    const newEvent = {
      id: Date.now(), // Unique ID
      ...eventData,
      // Ensure the type from the form is lowercase to match CSS classes
      type: eventData.eventType ? eventData.eventType.toLowerCase() : 'event',
    };
  
    // This is the most important line: it modifies the array.
    mockEvents.push(newEvent);
    
    console.log('[Service] Event created. New count:', mockEvents.length);
    return newEvent;
  };