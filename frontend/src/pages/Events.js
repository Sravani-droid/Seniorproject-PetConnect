import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Events() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: "", date: "", location: "", description: "" });
  const userId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("userRole");

  const fetchEvents = async () => {
    const res = await API.get("/events");
    setEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAdd = async () => {
    await API.post("/events", { ...form, shelter_id: userId });
    setForm({ title: "", date: "", location: "", description: "" });
    fetchEvents();
  };

  const handleDelete = async (id) => {
    await API.delete(`/events/${id}`);
    fetchEvents();
  };

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-outline-secondary mb-3">🏠 Home</Link>
      <h2>Upcoming Events 📅</h2>

      {events.map((e) => (
        <div key={e.id} className="border p-3 my-3">
          <h5>{e.title}</h5>
          <p><strong>Date:</strong> {e.date}</p>
          <p><strong>Location:</strong> {e.location}</p>
          <p>{e.description}</p>
          {userRole === "shelter" && parseInt(userId) === e.shelter_id && (
            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(e.id)}>Delete</button>
          )}
        </div>
      ))}

      {userRole === "shelter" && (
        <>
          <h5 className="mt-4">Add Event</h5>
          <input className="form-control my-2" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input className="form-control my-2" placeholder="Date (YYYY-MM-DD)" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <input className="form-control my-2" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          <textarea className="form-control my-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <button className="btn btn-primary" onClick={handleAdd}>Add Event</button>
        </>
      )}
    </div>
  );
}

export default Events;
