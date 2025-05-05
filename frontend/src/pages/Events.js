import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Dashboard.css";

const mapContainerStyle = {
  height: "200px",
  width: "100%",
  marginTop: "10px",
  borderRadius: "8px"
};

const GOOGLE_MAPS_API_KEY = "AIzaSyBtMk5ZGnNc0gs21yx-DaA9MhusGBUq37w";

function Events() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  const isShelter = userRole === "shelter";

  useEffect(() => {
    API.get("/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Error fetching events", err));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/delete_event/${id}`);
      setEvents(events.filter((e) => e.id !== id));
      alert("✅ Event deleted.");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("❌ Failed to delete event.");
    }
  };

  const parseLatLng = (location) => {
    const match = location.match(/([-.\d]+)[,\s]+([-.\d]+)/);
    if (!match) return null;
    return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
  };

  return (
    <div className="dashboard-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <h2 className="welcome-msg">📅 Upcoming Events</h2>

      {isShelter && (
        <div className="dashboard-feature-buttons">
          <button onClick={() => navigate("/add-event")}>➕ Add Event</button>
        </div>
      )}

      {events.length ? (
        <div className="pet-grid">
          {events.map((event) => {
            const coords = parseLatLng(event.location); // Ex: "37.7749, -122.4194"
            return (
              <div key={event.id} className="pet-card">
                <div className="pet-info">
                  <h5>{event.title}</h5>
                  <p><strong>Date:</strong> {event.date}</p>
                  <p><strong>Location:</strong> {event.location}</p>
                  <p className="pet-desc">{event.description?.slice(0, 60)}...</p>
                </div>

                {coords && (
                  <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      center={coords}
                      zoom={13}
                    >
                      <Marker position={coords} />
                    </GoogleMap>
                  </LoadScript>
                )}

                {isShelter && (
                  <div className="pet-card-buttons">
                    <button onClick={() => navigate(`/edit-event/${event.id}`)}>✏️ Edit</button>
                    <button onClick={() => handleDelete(event.id)}>🗑️ Delete</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p>No events posted yet.</p>
      )}
    </div>
  );
}

export default Events;

