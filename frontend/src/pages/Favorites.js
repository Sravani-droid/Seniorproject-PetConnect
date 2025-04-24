import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Dashboard.css";

function Favorites() {
  const [favoritePets, setFavoritePets] = useState([]);
  const navigate = useNavigate();
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  useEffect(() => {
    API.get("/pets")
      .then((res) => {
        const filtered = res.data.filter((pet) => favorites.includes(pet.id));
        setFavoritePets(filtered);
      })
      .catch((err) => console.error("Error fetching pets:", err));
  }, []);

  const toggleFavorite = (petId) => {
    const updated = favorites.includes(petId)
      ? favorites.filter((id) => id !== petId)
      : [...favorites, petId];
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavoritePets((prev) => prev.filter((pet) => updated.includes(pet.id)));
  };

  return (
    <div className="dashboard-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <h2 style={{ color: "#facc15" }}>❤️ Your Favorite Pets</h2>

      <div className="pet-grid">
        {favoritePets.length ? favoritePets.map((pet) => (
          <div
            className="pet-card"
            key={pet.id}
            onClick={() => navigate(`/pets/${pet.id}`)}
          >
            <img src={pet.image_url} alt={pet.name} />
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(pet.id);
              }}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "transparent",
                border: "none",
                fontSize: "1.5rem",
                color: "#facc15"
              }}
            >
              ♥
            </button>
            <div className="pet-info">
              <h5>{pet.name}</h5>
              <p>{pet.breed}</p>
              <p className="pet-desc">{pet.description?.slice(0, 60)}...</p>
            </div>
          </div>
        )) : <p style={{ color: "#ccc" }}>You have no favorite pets yet.</p>}
      </div>
    </div>
  );
}

export default Favorites;