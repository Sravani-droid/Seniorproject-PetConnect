import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Dashboard.css";

function SelectEdit() {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    API.get("/pets")
      .then((res) => {
        const myPets = res.data.filter(p => String(p.shelter_id) === String(userId));
        setPets(myPets);
      })
      .catch((err) => console.error("Error fetching pets:", err));
  }, [userId]);

  const handleEdit = (id) => {
    navigate(`/edit-pet/${id}`);
  };

  return (
    <div className="dashboard-container">
      <h2 className="welcome-msg">✏️ Select a Pet to Edit</h2>
      <div className="pet-grid">
        {pets.length ? pets.map(pet => (
          <div
            className="pet-card"
            key={pet.id}
            onClick={() => handleEdit(pet.id)}
          >
            <img src={pet.image_url || "https://via.placeholder.com/300"} alt={pet.name} />
            <div className="pet-info">
              <h5>{pet.name}</h5>
              <p>{pet.breed}</p>
              <p className="pet-desc">{pet.description?.slice(0, 60)}...</p>
            </div>
          </div>
        )) : <p>No pets to edit.</p>}
      </div>
    </div>
  );
}

export default SelectEdit;
