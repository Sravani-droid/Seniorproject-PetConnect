import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const [pets, setPets] = useState([]);
  const [typeFilter, setTypeFilter] = useState("All");
  const [breedFilter, setBreedFilter] = useState("");

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("userRole");
  const isShelter = userRole === "shelter";

  useEffect(() => {
    API.get("/pets")
      .then((res) => setPets(res.data))
      .catch((err) => console.error("Error fetching pets", err));
  }, []);

  const filteredPets = pets.filter((pet) => {
    const typeMatch = typeFilter === "All" || pet.pet_type === typeFilter;
    const breedMatch = pet.breed.toLowerCase().includes(breedFilter.toLowerCase());
    return typeMatch && breedMatch;
  });

  const petsToDisplay = isShelter
    ? filteredPets.filter((pet) => pet.shelter_id === parseInt(userId))
    : filteredPets;

  const handleProtected = (route) => {
    if (userId) {
      navigate(route);
    } else {
      alert("Please log in to access this feature.");
      navigate("/login");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>🐾 Pet Dashboard</h2>
        <div className="dashboard-actions">
          <input
            type="text"
            placeholder="Search breed..."
            value={breedFilter}
            onChange={(e) => setBreedFilter(e.target.value)}
          />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All Types</option>
            {[...new Set(pets.map(p => p.pet_type))].map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Shelter Tools */}
      {userId && isShelter && (
        <div className="shelter-tools">
          <button onClick={() => navigate("/add-pet")}>➕ Add Pet</button>
          <button onClick={() => navigate("/select-edit")}>✏️ Edit Pet</button>
          <button onClick={() => navigate("/select-delete")}>🗑️ Delete Pet</button>
          <button onClick={() => navigate("/add-success-story")}>📝 Share Story</button>
        </div>
      )}

      {/* Feature Buttons */}
      <div className="dashboard-feature-buttons">
        <button onClick={() => handleProtected("/events")}>📅 Events</button>
        <button onClick={() => handleProtected("/appointments")}>💬 Appointments</button>
        <button onClick={() => handleProtected("/donate")}>💖 Donate</button>
        <button onClick={() => handleProtected("/feedback")}>💬 Feedback</button>
        <button onClick={() => handleProtected("/faq")}>❓ FAQs</button>
      </div>

      {/* Pets Grid */}
      <div className="pet-grid">
        {petsToDisplay.length === 0 ? (
          <p>No pets found.</p>
        ) : (
          petsToDisplay.map(pet => (
            <div className="pet-card" key={pet.id} onClick={() =>
              userId ? navigate(`/pets/${pet.id}`) : navigate("/login")
            }>
              <img src={pet.image_url} alt={pet.name} />
              <div className="pet-info">
                <h5>{pet.name}</h5>
                <p><strong>Breed:</strong> {pet.breed}</p>
                <p className="pet-desc">{pet.description?.slice(0, 60)}...</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;

