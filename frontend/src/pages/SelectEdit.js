import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function SelectEdit() {
  const [pets, setPets] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPets() {
      try {
        const response = await API.get("/pets");
        const myPets = response.data.filter(pet => parseInt(pet.shelter_id) === parseInt(userId));
        setPets(myPets);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    }

    fetchPets();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-pet/${id}`);
  };

  return (
    <div className="container mt-4">
      <h2>Select a Pet to Edit</h2>
      <div className="row">
        {pets.length === 0 ? (
          <p>No pets found.</p>
        ) : (
          pets.map((pet) => (
            <div
              className="col-md-4 mb-4"
              key={pet.id}
              onClick={() => handleEdit(pet.id)}
              style={{ cursor: "pointer" }}
            >
              <div className="card h-100 border border-warning">
                <img
                  src={pet.image_url || "https://via.placeholder.com/300"}
                  className="card-img-top"
                  alt={pet.name}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{pet.name}</h5>
                  <p><strong>Breed:</strong> {pet.breed}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SelectEdit;
