

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Dashboard.css";

function EditAppointment() {
  const navigate = useNavigate();
  const existing = JSON.parse(localStorage.getItem("editAppt"));

  const [date, setDate] = useState(existing?.date || "");
  const [time, setTime] = useState(existing?.time || "");
  const [message, setMessage] = useState(existing?.message?.replace("Virtual Meeting Topic: ", "") || "");

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/appointments/${existing.id}`, {
        user_id: existing.user_id,
        pet_id: existing.pet_id,
        date,
        time,
        message: `Virtual Meeting Topic: ${message}`
      });
      alert("Appointment updated successfully!");
      navigate("/appointments");
    } catch (err) {
      console.error("Error updating appointment", err);
      alert("Failed to update appointment.");
    }
  };

  return (
    <div className="dashboard-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <div className="form-container">
        <h2>✏️ Edit Appointment</h2>
        <form onSubmit={handleUpdate}>
          <input
            className="auth-input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            className="auth-input"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
          <textarea
            className="auth-textarea"
            placeholder="Update message (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="auth-btn" type="submit">Update Appointment</button>
        </form>
      </div>
    </div>
  );
}

export default EditAppointment;