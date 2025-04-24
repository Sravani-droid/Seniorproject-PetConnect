import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Dashboard.css";

function AddEvent() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const shelterId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/events", {
        title,
        date,
        location,
        description,
        shelter_id: shelterId,
      });
      alert("✅ Event posted!");
      navigate("/events");
    } catch (err) {
      console.error("Event post error:", err);
      alert("❌ Failed to post event.");
    }
  };

  return (
    <div className="form-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <h2>➕ Add Event</h2>
      <form onSubmit={handleSubmit}>
        <input className="auth-input" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input className="auth-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input className="auth-input" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
        <textarea className="auth-textarea" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button className="auth-btn" type="submit">Post Event</button>
      </form>
    </div>
  );
}

export default AddEvent;