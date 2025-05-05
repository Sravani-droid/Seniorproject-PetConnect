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
  const [feedback, setFeedback] = useState({ success: "", error: "" });

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    initGapi();
    API.get("/pets")
      .then((res) => setPets(res.data))
      .catch((err) => setFeedback((f) => ({ ...f, error: "Failed to load pets." })));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ success: "", error: "" });

    if (!userId || !selectedPet || !topic || !date || !time) {
      setFeedback({ ...feedback, error: "All fields are required." });
      return;
    }

    try {
      // Save to backend
      await API.post("/appointments", {
        user_id: userId,
        pet_id: selectedPet,
        date,
        time,
        message: `Virtual Meeting Topic: ${topic}. ${message}`
      });

      // Add to Google Calendar
      await signInWithGoogle().then(async () => {
        const start = new Date(`${date}T${time}`);
        const end = new Date(start.getTime() + 30 * 60000);
        await createCalendarEvent({
          title: `Virtual Meeting - ${topic}`,
          description: message,
          start: start.toISOString(),
          end: end.toISOString()
        });
      });

      setFeedback({ ...feedback, success: "✅ Meeting scheduled and added to Google Calendar!" });
      setTimeout(() => navigate("/appointments"), 2000);
    } catch (err) {
      console.error(err);
      setFeedback({ ...feedback, error: "❌ Failed to schedule virtual meeting." });
    }
  };

  return (
    <div className="dashboard-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <div className="form-container">
        <h2>📹 Schedule Virtual Meeting</h2>
        {feedback.error && <p style={{ color: "red" }}>{feedback.error}</p>}
        {feedback.success && <p style={{ color: "green" }}>{feedback.success}</p>}

        <form onSubmit={handleSubmit}>
          <select className="auth-input" value={selectedPet} onChange={(e) => setSelectedPet(e.target.value)} required>
            <option value="">Select a pet</option>
            {pets.map((pet) => <option key={pet.id} value={pet.id}>{pet.name}</option>)}
          </select>

          <input className="auth-input" type="text" placeholder="Meeting topic" value={topic} onChange={(e) => setTopic(e.target.value)} required />
          <input className="auth-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          <input className="auth-input" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
          <textarea className="auth-textarea" placeholder="Additional message (optional)" value={message} onChange={(e) => setMessage(e.target.value)} />
          
          <button className="auth-btn" type="submit">Schedule Meeting</button>
        </form>
      </div>
    </div>
  );
}

export default VirtualMeeting;

