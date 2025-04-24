import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Dashboard.css";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    API.get("/appointments")
      .then((res) => setAppointments(res.data.filter(a => a.user_id === userId)))
      .catch((err) => console.error("Failed to fetch appointments", err));

    API.get("/pets")
      .then((res) => setPets(res.data))
      .catch((err) => console.error("Failed to fetch pets", err));
  }, [userId]);

  const getPetName = (id) => {
    const pet = pets.find(p => p.id === id);
    return pet ? pet.name : "Unknown Pet";
  };

  return (
    <div className="dashboard-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <h2 className="welcome-msg">📌 Appointments</h2>

      {appointments.length ? (
        <div className="pet-grid">
          {appointments.map((appt) => (
            <div className="pet-card" key={appt.id}>
              <div className="pet-info">
                <h5>{getPetName(appt.pet_id)}</h5>
                <p><strong>Date:</strong> {appt.date}</p>
                <p><strong>Time:</strong> {appt.time}</p>
                <p className="pet-desc">{appt.message}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
}

export default Appointments;


