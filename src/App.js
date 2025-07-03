import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "./App.css";

export default function App() {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEvents = () => {
    setLoading(true);
    setTimeout(() => {
      setEvents([
        { _id: 1, date: new Date(), title: "Techsophy Coding Test", desc: "Placements" },
        { _id: 2, date: new Date(new Date().setDate(new Date().getDate() + 1)), title: "Coding Practice", desc: "Daily routine" }
      ]);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required");

    const newEvent = { _id: editId || Date.now(), date, title, desc };

    if (editId) {
      setEvents(events.map(ev => ev._id === editId ? newEvent : ev));
      setEditId(null);
    } else {
      setEvents([...events, newEvent]);
    }

    setTitle("");
    setDesc("");
  };

  const handleDelete = (id) => {
    setEvents(events.filter(ev => ev._id !== id));
  };

  const handleEdit = (event) => {
    setDate(new Date(event.date));
    setTitle(event.title);
    setDesc(event.desc);
    setEditId(event._id);
  };

  const isToday = (eventDate) => {
    const today = new Date();
    const eDate = new Date(eventDate);
    return today.toDateString() === eDate.toDateString();
  };

  return (
    <div className="app">
      <h1>Event Scheduler</h1>
      <p>Managing your work relates to managing your success</p>
      <div className="calendar-container">
        <Calendar value={date} onChange={setDate} />
      </div>

      <form className="event-form" onSubmit={handleSubmit}>
        <h3>{editId ? "Edit Event" : "Add New Event"}</h3>
        <p>Selected Date: {date.toDateString()}</p>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Event Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button type="submit">{editId ? "Update" : "Add"} Event</button>
      </form>

      <div className="event-list">
        <h2>Scheduled Events</h2>
        {loading ? (
          <p>Loading events...</p>
        ) : events.length === 0 ? (
          <p>No events scheduled yet.</p>
        ) : (
          events.map((event) => (
            <div
              key={event._id}
              className={`event-card ${isToday(event.date) ? "highlight" : ""}`}
            >
              <h3>{event.title}</h3>
              <p><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
              <p>{event.desc}</p>
              <button onClick={() => handleEdit(event)}>Edit</button>
              <button onClick={() => handleDelete(event._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}






