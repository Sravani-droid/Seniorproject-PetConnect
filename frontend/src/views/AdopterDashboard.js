import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../pages/MapWithDirections";
import API from "../services/api";
import "../styles/Dashboard.css";


function AdopterDashboard() {
  const [pets, setPets] = useState([]);
  const [typeFilter, setTypeFilter] = useState("All");
  const [breedFilter, setBreedFilter] = useState("");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/pets")
      .then((res) => setPets(res.data))
      .catch((err) => console.error("Error fetching pets", err));
  }, []);

  const toggleFavorite = (petId) => {
    const updated = favorites.includes(petId)
      ? favorites.filter((id) => id !== petId)
      : [...favorites, petId];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const filteredPets = pets.filter((pet) => {
    const matchType = typeFilter === "All" || pet.pet_type === typeFilter;
    const matchBreed = pet.breed.toLowerCase().includes(breedFilter.toLowerCase());
    return matchType && matchBreed;
  });

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-actions">
          <input type="text" placeholder="Search breed..." value={breedFilter} onChange={(e) => setBreedFilter(e.target.value)} />
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="All">All Species</option>
            {[...new Set(pets.map((p) => p.pet_type))].map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="dashboard-feature-buttons">
          <button onClick={() => navigate("/events")}>Events</button>
          <button onClick={() => navigate("/appointments")}>Appointments</button>
          <button onClick={() => navigate("/donate")}> Donate</button>
          <button onClick={() => navigate("/feedback")}> Feedback</button>
          <button onClick={() => navigate("/faq")}>FAQs</button>
          <button onClick={() => navigate("/virtual-meeting")}> Meet Shelter</button>
          <button onClick={() => navigate("/success-stories")}>Success Stories</button>
          <button onClick={() => navigate("/map-directions")}>Get Directions</button>
          
        </div>
        <div className="pet-grid">
          {filteredPets.length ? (
            filteredPets.map((pet) => (
              <div className="pet-card" key={pet.id}>
                <img src={pet.image_url} alt={pet.name} />
                <div className="pet-info">
                  <h5>{pet.name}</h5>
                  <p>{pet.breed}</p>
                  <p className="pet-desc">{pet.description?.slice(0, 50)}...</p>
                </div>
                <div className="pet-card-buttons">
                  <button onClick={() => navigate(`/pets/${pet.id}`)}>View</button>
                  <button onClick={() => toggleFavorite(pet.id)}>
                    {favorites.includes(pet.id) ? "❤️Unfavorite" : "🤍Favorite"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No pets found</p>
          )}
        </div>
      </div>
    </>
  );
}

export default AdopterDashboard;
