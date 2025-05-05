import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Dashboard.css";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();
  const userId = Number(localStorage.getItem("userId"));

  useEffect(() => {
    fetchAppointments();
    API.get("/pets")
      .then((res) => setPets(res.data))
      .catch((err) => console.error("Failed to fetch pets", err));
  }, [userId]);

  const fetchAppointments = () => {
    API.get("/appointments")
      .then((res) => {
        const filtered = res.data.filter((a) => a.user_id === userId);
        setAppointments(filtered);
      })
      .catch((err) => console.error("Failed to fetch appointments", err));
  };

  const getPetInfo = (id) => {
    return pets.find((p) => p.id === id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        await API.delete(`/appointments/${id}`);
        fetchAppointments(); // refresh list
      } catch (err) {
        console.error("Error deleting appointment", err);
      }
    }
  };

  const handleEdit = (appt) => {
    localStorage.setItem("editAppt", JSON.stringify(appt));
    navigate("/edit-appointment");
  };

  return (
    <div className="dashboard-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <h2 className="welcome-msg">📌 Appointments</h2>

      {appointments.length ? (
        <div className="pet-grid">
          {appointments.map((appt) => {
            const pet = getPetInfo(appt.pet_id);
            return (
              <div className="pet-card" key={appt.id}>
                {pet && <img src={pet.image_url} alt={pet.name} />}
                <div className="pet-info">
                  <h5>{pet ? pet.name : "Unknown Pet"}</h5>
                  <p><strong>Date:</strong> {appt.date}</p>
                  <p><strong>Time:</strong> {appt.time}</p>
                  <p className="pet-desc">{appt.message}</p>
                </div>
                <div className="pet-card-buttons">
                <button onClick={() => {
                 localStorage.setItem("editAppt", JSON.stringify(appt));
                 navigate("/edit-appointment");
                }}>Edit</button>

                <button onClick={() => {
                localStorage.setItem("deleteAppt", JSON.stringify(appt));
                navigate("/delete-appointment");
               }}>Delete</button>
               </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
}

export default Appointments;


