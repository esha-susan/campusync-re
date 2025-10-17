import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import Footer from '../common/Footer';
import './SmartCalendar.css';

const SmartCalendar = ({ userRole, onLogout }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [view, setView] = useState('month');

  const events = [
    { id: 1, title: 'Tech Fest 2025', date: '2025-10-15', time: '10:00 AM', type: 'fest', priority: 'high', description: 'Annual technical festival' },
    { id: 2, title: 'Database Systems Assignment Due', date: '2025-10-05', time: '11:59 PM', type: 'deadline', priority: 'high', description: 'ER Diagram submission' },
    { id: 3, title: 'Workshop on AI/ML', date: '2025-10-10', time: '2:00 PM', type: 'workshop', priority: 'medium', description: 'Introduction to Machine Learning' },
    { id: 4, title: 'Sports Day', date: '2025-10-20', time: '9:00 AM', type: 'sports', priority: 'low', description: 'Inter-department sports competition' },
    { id: 5, title: 'Project Presentation', date: '2025-10-18', time: '3:00 PM', type: 'academic', priority: 'high', description: 'Final year project demo' },
    { id: 6, title: 'Cultural Night', date: '2025-10-25', time: '6:00 PM', type: 'cultural', priority: 'medium', description: 'Annual cultural program' }
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const getEventsForDate = (date) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayEvents = getEventsForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();

      days.push(
        <div 
          key={day} 
          className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${dayEvents.length > 0 ? 'has-events' : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          <span className="day-number">{day}</span>
          {dayEvents.length > 0 && (
            <div className="event-indicators">
              {dayEvents.slice(0, 3).map((event, idx) => (
                <span key={idx} className={`event-dot ${event.type}`}></span>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <>
        <div className="calendar-header-days">
          {dayNames.map(name => (
            <div key={name} className="day-name">{name}</div>
          ))}
        </div>
        <div className="calendar-grid">{days}</div>
      </>
    );
  };

  const changeMonth = (direction) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1));
  };

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="dashboard-layout">
      <Navbar userRole={userRole} userName={userRole === 'student' ? 'John Doe' : 'Dr. Sarah Wilson'} onLogout={onLogout} />
      <div className="dashboard-container">
        <Sidebar userRole={userRole} />
        <main className="dashboard-main">
          <div className="dashboard-content">
            <div className="page-header">
              <div>
                <h1 className="page-title">Smart Calendar 📅</h1>
                <p className="page-subtitle">View and manage events, deadlines, and activities</p>
              </div>
              {userRole !== 'student' && (
                <button className="btn btn-primary">+ Create Event</button>
              )}
            </div>

            <div className="calendar-container">
              <div className="calendar-card">
                <div className="calendar-controls">
                  <button className="nav-button" onClick={() => changeMonth(-1)}>←</button>
                  <h2 className="month-title">
                    {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </h2>
                  <button className="nav-button" onClick={() => changeMonth(1)}>→</button>
                </div>

                {renderCalendar()}

                <div className="calendar-legend">
                  <div className="legend-item">
                    <span className="legend-dot fest"></span>
                    <span>Fest</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot deadline"></span>
                    <span>Deadline</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot workshop"></span>
                    <span>Workshop</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot academic"></span>
                    <span>Academic</span>
                  </div>
                </div>
              </div>

              <div className="events-sidebar">
                <h3 className="sidebar-title">Upcoming Events</h3>
                <div className="events-list">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className={`event-card priority-${event.priority}`}>
                      <div className="event-header">
                        <span className={`event-type-badge ${event.type}`}>{event.type}</span>
                        <span className={`priority-badge ${event.priority}`}>{event.priority}</span>
                      </div>
                      <h4 className="event-title">{event.title}</h4>
                      <p className="event-description">{event.description}</p>
                      <div className="event-meta">
                        <span className="meta-item">📅 {event.date}</span>
                        <span className="meta-item">🕐 {event.time}</span>
                      </div>
                      {userRole === 'student' && (
                        <button className="btn-small btn-primary register-btn">Register</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default SmartCalendar;