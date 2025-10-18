import React, { useState } from 'react';
import './CreateEvent.css';
import { createEvent } from '../services/eventService';

// --- 1. THE COMPONENT NOW ACCEPTS A PROP: onEventCreated ---
const CreateEvent = ({ onEventCreated }) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '12:00 PM', // Added time field
    eventType: 'Workshop',
    venue: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventData.title || !eventData.date) {
      setMessage('Error: Event Title and Date are required.');
      return;
    }
    
    setIsSubmitting(true);
    setMessage('');

    try {
      // Simulate API call
      await createEvent(eventData);
      
      // --- 2. CREATE A COMPLETE EVENT OBJECT TO SEND TO THE PARENT ---
      const newEvent = {
        id: `event-${Date.now()}`, // Create a unique ID
        title: eventData.title,
        description: eventData.description,
        date: eventData.date,
        time: eventData.time,
        type: eventData.eventType.toLowerCase(), // e.g., 'workshop'
        priority: 'medium', // Default priority
      };

      // --- 3. CALL THE FUNCTION FROM THE PARENT TO ADD THE EVENT AND CLOSE THE FORM ---
      onEventCreated(newEvent);

      setMessage('Event created successfully!');
      // Reset form for next time
      setEventData({ title: '', description: '', date: '', time: '12:00 PM', eventType: 'Workshop', venue: '' });

    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-event-container">
      <div className="event-form-header">
        <h1>Create a New Event</h1>
        <p>Fill out the details below to add a new event to the campus calendar.</p>
      </div>
      <form onSubmit={handleSubmit} className="event-form">
        {/* ... form fields ... */}
        <div className="form-group">
          <label htmlFor="title">Event Title</label>
          <input type="text" id="title" name="title" value={eventData.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Event Description</label>
          <textarea id="description" name="description" value={eventData.description} onChange={handleChange} rows="3"></textarea>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Event Date</label>
            <input type="date" id="date" name="date" value={eventData.date} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input type="time" id="time" name="time" value={eventData.time} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="eventType">Event Type</label>
          <select id="eventType" name="eventType" value={eventData.eventType} onChange={handleChange}>
            <option>Workshop</option><option>Seminar</option><option>Cultural</option><option>Sports</option><option>Fest</option><option>Deadline</option><option>Other</option>
          </select>
        </div>
        <button type="submit" className="btn-submit-event" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Add Event to Calendar'}
        </button>
        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
};

export default CreateEvent;