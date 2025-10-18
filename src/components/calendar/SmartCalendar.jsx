import React, { useState, useEffect, useMemo } from 'react';
import './SmartCalendar.css';
import CreateEvent from '../../events/CreateEvent';
import { getEvents } from '../../services/eventService'; // 1. IMPORT THE EVENT SERVICE

const SmartCalendar = ({ user, onLogout }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  // 2. INITIALIZE STATE FOR DYNAMIC DATA, LOADING, AND ERRORS
  // The 'events' state now starts empty and will be filled by our service.
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [userNotes, setUserNotes] = useState([]);
  const [noteInput, setNoteInput] = useState('');

  const notesStorageKey = `calendarUserNotes_${user.id}`;

  // 3. FETCH GLOBAL EVENTS FROM THE SERVICE WHEN THE COMPONENT LOADS
  useEffect(() => {
    const fetchGlobalEvents = async () => {
      try {
        setIsLoading(true);
        const globalEvents = await getEvents(); // This gets the updated list from your service
        setEvents(globalEvents);
      } catch (err) {
        setError('Failed to load campus events. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGlobalEvents();
  }, []); // The empty array [] ensures this runs only once when the component mounts

  // This effect for loading/saving user's personal notes is already perfect. No changes needed.
  useEffect(() => {
    const savedNotes = localStorage.getItem(notesStorageKey);
    if (savedNotes) {
      setUserNotes(JSON.parse(savedNotes));
    }
    return () => setUserNotes([]); 
  }, [notesStorageKey]);

  useEffect(() => {
    localStorage.setItem(notesStorageKey, JSON.stringify(userNotes));
  }, [userNotes, notesStorageKey]);

  // This useMemo hook is also perfect. It will now combine the fetched global events with personal notes.
  const allCalendarItems = useMemo(() => {
    const formattedNotes = userNotes.map(note => ({ ...note, title: note.text, description: 'Personal Note' }));
    return [...events, ...formattedNotes];
  }, [events, userNotes]);

  // This function is for the IN-PAGE form and is now correct.
  const handleAddNewEvent = (newEvent) => {
    setEvents(prevEvents => [...prevEvents, newEvent]);
    setIsFormVisible(false);
  };

  // --- All of your other functions (getItemsForDate, handleAddNote, renderCalendar, etc.) are perfect. No changes are needed in them. ---
  const getItemsForDate = (date) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return allCalendarItems.filter(item => item.date === dateStr);
  };
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteInput.trim() || !selectedDate) return;
    const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    const newNote = { id: `note-${Date.now()}`, date: dateStr, text: noteInput, type: 'note', priority: 'medium', title: noteInput, description: 'Personal Note'};
    setUserNotes([...userNotes, newNote]);
    setNoteInput('');
  };
  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i = 0; i < startingDayOfWeek; i++) { days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>); }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayItems = getItemsForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      days.push(
        <div key={day} className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${dayItems.length > 0 ? 'has-events' : ''}`} onClick={() => setSelectedDate(date)}>
          <span className="day-number">{day}</span>
          {dayItems.length > 0 && (<div className="event-indicators">{dayItems.slice(0, 3).map((item, idx) => (<span key={idx} className={`event-dot ${item.type}`}></span>))}</div>)}
        </div>
      );
    }
    return (<><div className="calendar-header-days">{dayNames.map(name => (<div key={name} className="day-name">{name}</div>))}</div><div className="calendar-grid">{days}</div></>);
  };
  const changeMonth = (direction) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1));
  };
  const upcomingEvents = useMemo(() => {
    return allCalendarItems
      .filter(item => {
        const itemDate = new Date(item.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return itemDate >= today;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [allCalendarItems]);
  const selectedDayItems = selectedDate ? getItemsForDate(selectedDate) : [];

  // 4. ADD A CHECK FOR THE LOADING STATE
  if (isLoading) {
    return <div>Loading Calendar...</div>; // Or a more sophisticated loading spinner
  }

  // 5. ADD A CHECK FOR AN ERROR STATE
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="dashboard-layout">
      {/* ... The rest of your JSX structure is great. No changes needed below ... */}
      <div className="dashboard-container">
        <main className="dashboard-main">
          <div className="dashboard-content">
            <div className="page-header">
              <div className="page-title-group">
                <div className="page-title-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M12 12.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <div>
                  <h1 className="page-title">Smart Calendar</h1>
                  <p className="page-subtitle">View and manage events, deadlines, and activities</p>
                </div>
              </div>
              
              {user.role === 'admin' && (
                <button onClick={() => setIsFormVisible(!isFormVisible)} className="btn btn-primary page-header-button">
                  {isFormVisible ? 'Close Form' : 'Create Event'}
                </button>
              )}
            </div>

            <div className="calendar-container">
              <div className="calendar-card">
                <div className="calendar-controls">
                  <button className="nav-button" onClick={() => changeMonth(-1)}>←</button>
                  <h2 className="month-title">{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                  <button className="nav-button" onClick={() => changeMonth(1)}>→</button>
                </div>
                {renderCalendar()}
                <div className="calendar-legend">
                  <div className="legend-item"><span className="legend-dot fest"></span><span>Fest</span></div>
                  <div className="legend-item"><span className="legend-dot deadline"></span><span>Deadline</span></div>
                  <div className="legend-item"><span className="legend-dot workshop"></span><span>Workshop</span></div>
                  <div className="legend-item"><span className="legend-dot note"></span><span>My Note</span></div>
                </div>
              </div>

              <div className="events-sidebar">
                {selectedDate ? (
                  <>
                    <div className="sidebar-header">
                      <h3 className="sidebar-title">
                        Details for {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                      </h3>
                      <button className="clear-selection-btn" onClick={() => setSelectedDate(null)}>Show All Upcoming</button>
                    </div>
                    <div className="events-list">
                      {selectedDayItems.length > 0 ? (
                        selectedDayItems.map(item => (
                          <div key={item.id} className={`event-card priority-${item.priority}`}>
                            <h4 className="event-title">{item.title}</h4>
                            <p className="event-description">{item.description}</p>
                          </div>
                        ))
                      ) : (
                        <p className="no-events-text">No events or notes for this day.</p>
                      )}
                    </div>
                    {user.role === 'student' && (
                      <div className="add-note-section">
                        <h4 className="add-note-title">Add a Personal Note</h4>
                        <form onSubmit={handleAddNote} className="add-note-form">
                          <input type="text" className="note-input" placeholder="e.g., Study for OS exam" value={noteInput} onChange={(e) => setNoteInput(e.target.value)}/>
                          <button type="submit" className="btn-small btn-primary">+ Add</button>
                        </form>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <h3 className="sidebar-title">Upcoming Events</h3>
                    <div className="events-list">
                      {upcomingEvents.length > 0 ? (
                        upcomingEvents.map(event => (
                          <div key={event.id} className={`event-card priority-${event.priority}`}>
                            <h4 className="event-title">{event.title}</h4>
                            <p className="event-description">{event.description}</p>
                            <div className="event-meta">
                              <span className="meta-item">📅 {event.date}</span>
                              {event.time && <span className="meta-item">🕐 {event.time}</span>}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="no-events-text">No upcoming events.</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {user.role === 'admin' && isFormVisible && (
              <div className="event-creation-card">
                <CreateEvent onEventCreated={handleAddNewEvent} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SmartCalendar;