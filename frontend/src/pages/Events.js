import { useEffect, useState } from "react";
import API from "../services/api";
import "./FormPage.css";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get("/events")
      .then((res) => setEvents(res.data))
      .catch(() => alert("Failed to load events."));
  }, []);

  return (
    <div className="form-container">
      <h2>📅 Upcoming Events</h2>
      {events.length === 0 ? (
        <p>No events scheduled.</p>
      ) : (
        events.map((event) => (
          <div key={event.id} className="faq-item">
            <h4>{event.title}</h4>
            <p><strong>When:</strong> {event.date}</p>
            <p>{event.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Events;

