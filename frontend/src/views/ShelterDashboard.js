import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/MapWithDirections";
import API from "../services/api";
import "../styles/Dashboard.css";


function ShelterDashboard() {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "Shelter";
  const userId = Number(localStorage.getItem("userId"));

  useEffect(() => {
    API.get("/pets")
      .then((res) => {
        const myPets = res.data.filter((pet) => pet.shelter_id === userId);
        setPets(myPets);
      })
      .catch((err) => console.error("Error fetching pets", err));
  }, [userId]);

  return (
    <div className="dashboard-container">
      <h2>Welcome, {userName}!</h2>

      <div className="dashboard-feature-buttons">
        <button onClick={() => navigate("/add-pet")}>Add Pet</button>
        <button onClick={() => navigate("/select-edit")}>Edit</button>
        <button onClick={() => navigate("/select-delete")}>Delete</button>
        <button onClick={() => navigate("/add-success-story")}>Share Story</button>
        <button onClick={() => navigate("/appointments")}>Appointments</button>
        <button onClick={() => navigate("/donate")}>Donate</button>
        <button onClick={() => navigate("/feedback")}>Feedback</button>
        <button onClick={() => navigate("/faq")}>FAQs</button>
        <button onClick={() => navigate("/events")}>Events</button>
        <button onClick={() => navigate("/map-directions")}>Get Directions</button>
        </div>

      <div className="pet-grid">
        {pets.length ? pets.map((pet) => (
          <div className="pet-card" key={pet.id}>
            <img src={pet.image_url} alt={pet.name} />
            <div className="pet-info">
              <h5>{pet.name}</h5>
              <p>{pet.breed}</p>
              <p className="pet-desc">{pet.description?.slice(0, 50)}...</p>
            </div>
            <div className="pet-card-buttons">
              <button onClick={() => navigate(`/pets/${pet.id}`)}>View</button>
              <button onClick={() => navigate(`/edit-pet/${pet.id}`)}>Edit</button>
              <button onClick={() => navigate(`/select-delete`)}>Delete</button>
            </div>
          </div>
        )) : <p>No pets listed yet.</p>}
      </div>
    </div>
  );
}

export default ShelterDashboard;
  