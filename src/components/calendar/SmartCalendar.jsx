import React, { useState, useEffect, useMemo } from 'react';
import Layout from '../common/Layout';
import { getNotesForUser, addNoteForUser } from '../../services/eventService';
import './SmartCalendar.css';

const SmartCalendar = ({ currentUser, onLogout }) => {
  // State for data and UI
  const [userNotes, setUserNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [noteInput, setNoteInput] = useState('');

  // The useEffect is now simple and focuses only on fetching notes
  useEffect(() => {
    if (!currentUser?.id) {
      setIsLoading(false);
      setError("User data is unavailable.");
      return;
    }
    const fetchNotes = async () => {
      try {
        setIsLoading(true);
        const notes = await getNotesForUser();
        setUserNotes(notes);
      } catch (err) {
        setError('Failed to load your personal notes.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, [currentUser]);

  // 'allCalendarItems' is now just the formatted user notes
  const allCalendarItems = useMemo(() => {
    return userNotes.map(note => ({ ...note, title: note.text, description: 'Personal Note' }));
  }, [userNotes]);

  // The handleAddNote function is unchanged and works perfectly
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteInput.trim() || !selectedDate || !currentUser?.id) return;
    const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    try {
      const newNote = await addNoteForUser(noteInput, dateStr, currentUser.id);
      setUserNotes(prevNotes => [...prevNotes, newNote]);
      setNoteInput('');
    } catch (err) {
      alert('Failed to add note. Please try again.');
    }
  };
  
  // ========================================================
  // ALL HELPER FUNCTIONS ARE NOW FULLY IMPLEMENTED
  // ========================================================

  const getItemsForDate = (date) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return allCalendarItems.filter(item => item.date === dateStr);
  };
  
  const changeMonth = (direction) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1));
  };

  const upcomingEvents = useMemo(() => {
    return allCalendarItems
      .filter(item => {
        const itemDate = new Date(item.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to the beginning of today
        return itemDate >= today;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [allCalendarItems]);

  const selectedDayItems = selectedDate ? getItemsForDate(selectedDate) : [];

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayItems = getItemsForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      days.push(
        <div key={day} className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${dayItems.length > 0 ? 'has-events' : ''}`} onClick={() => setSelectedDate(date)}>
          <span className="day-number">{day}</span>
          {dayItems.length > 0 && (
            <div className="event-indicators">
              {dayItems.slice(0, 3).map((item, idx) => (
                <span key={idx} className={`event-dot ${item.type || 'default'}`}></span>
              ))}
            </div>
          )}
        </div>
      );
    }
    return (
      <>
        <div className="calendar-header-days">{dayNames.map(name => <div key={name} className="day-name">{name}</div>)}</div>
        <div className="calendar-grid">{days}</div>
      </>
    );
  };
  // ========================================================

  return (
    <Layout currentUser={currentUser} onLogout={onLogout}>
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Smart Calendar</h1>
          <p className="page-header__subtitle">Manage your personal notes and reminders.</p>
        </div>
      </div>

      {isLoading && <div className="loading-indicator">Loading Calendar...</div>}
      {error && <div className="error-message">{error}</div>}
      
      {!isLoading && !error && (
        <div className="calendar-container">
          <div className="calendar-card">
            <div className="calendar-controls">
              <button className="nav-button" onClick={() => changeMonth(-1)}>←</button>
              <h2 className="month-title">{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
              <button className="nav-button" onClick={() => changeMonth(1)}>→</button>
            </div>
            {renderCalendar()}
            <div className="calendar-legend">
              <div className="legend-item"><span className="legend-dot note"></span><span>My Note</span></div>
            </div>
          </div>

          <div className="events-sidebar">
            {selectedDate ? (
              <>
                <div className="sidebar-header">
                  <h3 className="sidebar-title">Details for {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</h3>
                  <button className="clear-selection-btn" onClick={() => setSelectedDate(null)}>Show All Upcoming</button>
                </div>
                <div className="events-list">
                  {selectedDayItems.length > 0 ? (
                    selectedDayItems.map(item => (
                      <div key={item.id} className={`event-card priority-${item.priority || 'medium'}`}>
                        <h4 className="event-title">{item.title}</h4>
                      </div>
                    ))
                  ) : (
                    <p className="no-events-text">No notes for this day.</p>
                  )}
                </div>
                <div className="add-note-section">
                  <h4 className="add-note-title">Add a Personal Note</h4>
                  <form onSubmit={handleAddNote} className="add-note-form">
                    <input type="text" className="note-input" placeholder="e.g., Study for OS exam" value={noteInput} onChange={(e) => setNoteInput(e.target.value)} />
                    <button type="submit" className="btn btn--primary btn--small">+ Add</button>
                  </form>
                </div>
              </>
            ) : (
              <>
                <h3 className="sidebar-title">Upcoming Notes</h3>
                <div className="events-list">
                  {upcomingEvents.length > 0 ? (
                    upcomingEvents.map(event => (
                      <div key={event.id} className={`event-card priority-${event.priority}`}>
                        <h4 className="event-title">{event.title}</h4>
                        <div className="event-meta">
                          <span className="meta-item">📅 {event.date}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-events-text">No upcoming notes.</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default SmartCalendar;