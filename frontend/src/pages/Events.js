import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Dashboard.css";

function Events() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  const userId = localStorage.getItem("userId");
  const isShelter = userRole === "shelter";

  useEffect(() => {
    API.get("/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Error fetching events", err));
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="welcome-msg">📅 Upcoming Events</h2>

      {isShelter && (
        <div className="dashboard-feature-buttons">
          <button onClick={() => navigate("/add-event")}>➕ Add Event</button>
        </div>
      )}

      {events.length ? (
        <div className="pet-grid">
          {events.map((event) => (
            <div key={event.id} className="pet-card">
              <div className="pet-info">
                <h5>{event.title}</h5>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p className="pet-desc">{event.description?.slice(0, 60)}...</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No events posted yet.</p>
      )}
    </div>
  );
}

export default Events;

