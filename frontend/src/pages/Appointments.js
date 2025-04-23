import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./FormPage.css";

function ScheduleAppointment() {
  const [datetime, setDatetime] = useState("");
  const [reason, setReason] = useState("");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return navigate("/login");

    try {
      await API.post("/appointments", {
        user_id: userId,
        date_time: datetime,
        reason,
      });
      alert("Appointment scheduled!");
    } catch {
      alert("Failed to schedule.");
    }
  };

  return (
    <div className="form-container">
      <h2>📅 Schedule an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="datetime-local"
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
          required
        />
        <textarea
          placeholder="Reason or message..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
        <button type="submit">Schedule</button>
      </form>
    </div>
  );
}

export default ScheduleAppointment;

