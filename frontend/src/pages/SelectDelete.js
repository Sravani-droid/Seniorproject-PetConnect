import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Dashboard.css";

function SelectDelete() {
  const [pets, setPets] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    API.get("/pets")
      .then((res) => {
        const myPets = res.data.filter(p => String(p.shelter_id) === String(userId));
        setPets(myPets);
      })
      .catch((err) => console.error("Error fetching pets:", err));
  }, [userId]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this pet?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/delete_pet/${id}?shelter_id=${userId}`);
      setPets(pets.filter(p => p.id !== id));
      alert("Pet deleted successfully.");
    } catch (err) {
      console.error("Failed to delete pet:", err);
      alert("Error deleting pet.");
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="welcome-msg">🗑️ Select a Pet to Delete</h2>
      <div className="pet-grid">
        {pets.length ? pets.map(pet => (
          <div
            className="pet-card"
            key={pet.id}
            onClick={() => handleDelete(pet.id)}
            style={{ border: "1px solid #ff4d4d" }}
          >
            <img src={pet.image_url || "https://via.placeholder.com/300"} alt={pet.name} />
            <div className="pet-info">
              <h5>{pet.name}</h5>
              <p>{pet.breed}</p>
              <p className="pet-desc">{pet.description?.slice(0, 60)}...</p>
            </div>
          </div>
        )) : <p>No pets to delete.</p>}
      </div>
    </div>
  );
}

export default SelectDelete;
