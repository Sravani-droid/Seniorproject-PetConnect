import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { createCalendarEvent, initGapi, signInWithGoogle } from "../services/calendarAuth";
import "../styles/Dashboard.css";

function VirtualMeeting() {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    initGapi();
    API.get("/pets")
      .then(res => setPets(res.data))
      .catch(err => console.error("Failed to fetch pets:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !selectedPet) {
      alert("Please select a pet and login.");
      return;
    }

    try {
      await API.post("/appointments", {
        user_id: userId,
        pet_id: selectedPet,
        date,
        time,
        message: `Virtual Meeting Topic: ${topic}. ${message}`
      });

      // Create event in Google Calendar
      await signInWithGoogle();
      const startDateTime = new Date(`${date}T${time}`);
      const endDateTime = new Date(startDateTime.getTime() + 30 * 60 * 1000); // 30 mins
      await createCalendarEvent({
        title: `Virtual Meeting - ${topic}`,
        description: message,
        start: startDateTime.toISOString(),
        end: endDateTime.toISOString()
      });

      alert("✅ Meeting scheduled & added to your Google Calendar!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Virtual meeting error:", err);
      alert("❌ Failed to book virtual meeting.");
    }
  };

  return (
    <div className="dashboard-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <div className="form-container">
        <h2>📹 Schedule Virtual Meeting</h2>
        <form onSubmit={handleSubmit}>
          <select
            className="auth-input"
            value={selectedPet}
            onChange={(e) => setSelectedPet(e.target.value)}
            required
          >
            <option value="">Select a pet</option>
            {pets.map(pet => (
              <option key={pet.id} value={pet.id}>{pet.name}</option>
            ))}
          </select>

          <input
            className="auth-input"
            type="text"
            placeholder="Meeting topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
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
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />

          <textarea
            className="auth-textarea"
            placeholder="Additional message (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button className="auth-btn" type="submit">Schedule Meeting</button>
        </form>
      </div>
    </div>
  );
}

export default VirtualMeeting;

