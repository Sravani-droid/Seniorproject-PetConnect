import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Dashboard.css";

function SelectDelete() {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();
  const userId = Number(localStorage.getItem("userId"));
  const userName = localStorage.getItem("userName") || "Shelter";

  useEffect(() => {
    API.get("/pets")
      .then((res) => {
        const myPets = res.data.filter((pet) => pet.shelter_id === userId);
        setPets(myPets);
      })
      .catch((err) => console.error("Error loading pets", err));
  }, [userId]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;
    try {
      await API.delete(`/delete_pet/${id}`);
      alert("✅ Pet deleted");
      setPets((prev) => prev.filter((pet) => pet.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("❌ Failed to delete pet");
    }
  };

  return (
    <div className="dashboard-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <h2>Welcome to PetConnect, {userName}</h2>

      {pets.length ? (
        <div className="pet-grid">
          {pets.map((pet) => (
            <div key={pet.id} className="pet-card">
              <img src={pet.image_url} alt={pet.name} />
              <div className="pet-info">
                <h5>{pet.name}</h5>
                <p>{pet.breed}</p>
              </div>
              <button
                className="auth-btn"
                style={{ backgroundColor: "darkred" }}
                onClick={() => handleDelete(pet.id, pet.name)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SelectDelete;
