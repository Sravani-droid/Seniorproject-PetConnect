import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const [pets, setPets] = useState([]);
  const [typeFilter, setTypeFilter] = useState("All");
  const [breedFilter, setBreedFilter] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("userRole");

  const isShelter = userRole === "shelter";

  useEffect(() => {
    async function fetchPets() {
      try {
        const response = await API.get("/pets");
        setPets(response.data);
      } catch (error) {
        console.error("Failed to fetch pets:", error);
      }
    }

    fetchPets();
  }, []);

  const filteredPets = pets.filter((pet) => {
    const typeMatch = typeFilter === "All" || pet.pet_type === typeFilter;
    const breedMatch = pet.breed.toLowerCase().includes(breedFilter.toLowerCase());
    return typeMatch && breedMatch;
  });

  const petsToDisplay = isShelter && userId
    ? filteredPets.filter((pet) => parseInt(pet.shelter_id) === parseInt(userId))
    : filteredPets;

  return (
    <div className="container mt-4">
      {/* Home Button */}
      <Link to="/" className="btn btn-outline-secondary mb-3">🏠 Home</Link>

      <h2 className="mb-4">Available Pets 🐾</h2>

      {/* Shelter Tools */}
      {userId && isShelter && (
        <div className="mb-4 d-flex flex-wrap gap-3">
          <button className="btn btn-success" onClick={() => navigate("/add-pet")}>➕ Add Pet</button>
          <button className="btn btn-warning" onClick={() => navigate("/select-edit")}>✏️ Edit Pet</button>
          <button className="btn btn-danger" onClick={() => navigate("/select-delete")}>🗑️ Delete Pet</button>
          
        </div>
      )}

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by breed..."
            value={breedFilter}
            onChange={(e) => setBreedFilter(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All Types</option>
            {Array.from(new Set(pets.map((pet) => pet.pet_type))).map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Pet Cards */}
      <div className="row">
        {petsToDisplay.length === 0 ? (
          <p>No pets found matching your filters.</p>
        ) : (
          petsToDisplay.map((pet) => (
            <div className="col-md-4 mb-4" key={pet.id}>
              <div className="card h-100 position-relative">
                <img
                  src={pet.image_url || "https://via.placeholder.com/300"}
                  className="card-img-top"
                  alt={pet.name}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{pet.name}</h5>
                  <p><strong>Breed:</strong> {pet.breed}</p>
                  <p><strong>Type:</strong> {pet.pet_type}</p>
                  <p><strong>Origin:</strong> {pet.origin}</p>
                  <p><strong>Age:</strong> {pet.age}</p>
                  <p>{pet.description}</p>

                  {/* Conditional link */}
                  {!userId ? (
                    <Link to="/login" className="stretched-link" />
                  ) : (
                    <Link to={`/pets/${pet.id}`} className="stretched-link" />
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;

