

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Dashboard.css";

function DeleteAppointment() {
  const navigate = useNavigate();
  const appt = JSON.parse(localStorage.getItem("deleteAppt"));
  const [petName, setPetName] = useState("");

  useEffect(() => {
    if (appt?.pet_id) {
      API.get(`/pets/${appt.pet_id}`)
        .then((res) => setPetName(res.data.name))
        .catch(() => setPetName("Unknown"));
    }
  }, [appt]);

  const handleDelete = async () => {
    try {
      await API.delete(`/appointments/${appt.id}`);
      alert("Appointment deleted successfully.");
      navigate("/appointments");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete appointment.");
    }
  };

  return (
    <div className="dashboard-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <div className="form-container">
        <h2>🗑️ Delete Appointment</h2>
        <p>Are you sure you want to delete this appointment?</p>
        <p><strong>Pet:</strong> {petName}</p>
        <p><strong>Date:</strong> {appt.date}</p>
        <p><strong>Time:</strong> {appt.time}</p>
        <div className="dashboard-actions">
          <button className="auth-btn" onClick={handleDelete}>Yes, Delete</button>
          <button className="auth-btn" onClick={() => navigate("/appointments")}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAppointment;