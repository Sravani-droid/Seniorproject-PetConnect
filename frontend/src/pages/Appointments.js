import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [newAppt, setNewAppt] = useState({ date: "", time: "", pet_id: "", message: "" });
  const userId = localStorage.getItem("userId");

  const fetchAppointments = async () => {
    const res = await API.get("/appointments");
    setAppointments(res.data.filter((a) => a.user_id == userId));
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleAdd = async () => {
    await API.post("/appointments", { ...newAppt, user_id: userId });
    setNewAppt({ date: "", time: "", pet_id: "", message: "" });
    fetchAppointments();
  };

  const handleDelete = async (id) => {
    await API.delete(`/appointments/${id}`);
    fetchAppointments();
  };

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-outline-secondary mb-3">🏠 Home</Link>
      <h3>My Appointments</h3>
      <ul className="list-group mb-4">
        {appointments.map((a) => (
          <li key={a.id} className="list-group-item d-flex justify-content-between">
            📅 {a.date} ⏰ {a.time} 🐶 Pet ID: {a.pet_id}
            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(a.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h5>Add Appointment</h5>
      <input className="form-control my-2" placeholder="Date (YYYY-MM-DD)" value={newAppt.date} onChange={(e) => setNewAppt({ ...newAppt, date: e.target.value })} />
      <input className="form-control my-2" placeholder="Time (HH:MM)" value={newAppt.time} onChange={(e) => setNewAppt({ ...newAppt, time: e.target.value })} />
      <input className="form-control my-2" placeholder="Pet ID" value={newAppt.pet_id} onChange={(e) => setNewAppt({ ...newAppt, pet_id: e.target.value })} />
      <textarea className="form-control my-2" placeholder="Message (optional)" value={newAppt.message} onChange={(e) => setNewAppt({ ...newAppt, message: e.target.value })} />
      <button className="btn btn-primary" onClick={handleAdd}>Add</button>
    </div>
  );
}

export default Appointments;
