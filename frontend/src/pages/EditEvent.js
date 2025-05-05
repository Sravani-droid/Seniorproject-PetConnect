import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import "../styles/Dashboard.css";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    API.get(`/events/${id}`)
      .then((res) => {
        const event = res.data;
        setTitle(event.title);
        setDate(event.date);
        setLocation(event.location);
        setDescription(event.description || "");
      })
      .catch((err) => {
        console.error("Failed to fetch event", err);
        alert("❌ Error loading event details.");
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/update_event/${id}`, {
        title,
        date,
        location,
        description
      });
      alert("✅ Event updated!");
      navigate("/events");
    } catch (err) {
      console.error("Update error", err);
      alert("❌ Failed to update event.");
    }
  };

  return (
    <div className="form-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <h2>✏️ Edit Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="auth-input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="auth-input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          className="auth-input"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <textarea
          className="auth-textarea"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className="auth-btn">Update Event</button>
      </form>
    </div>
  );
}

export default EditEvent;