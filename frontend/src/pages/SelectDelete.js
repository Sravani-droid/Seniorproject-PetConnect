import { useEffect, useState } from "react";
import API from "../services/api";

function SelectDelete() {
  const [pets, setPets] = useState([]);
  const userId = localStorage.getItem("userId");

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

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this pet?");
    if (!confirm) return;

    try {
      await API.delete(`/delete_pet/${id}?shelter_id=${userId}`);
      setPets(pets.filter(p => p.id !== id));
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Select a Pet to Delete</h2>
      <div className="row">
        {pets.length === 0 ? (
          <p>No pets found.</p>
        ) : (
          pets.map((pet) => (
            <div
              className="col-md-4 mb-4"
              key={pet.id}
              onClick={() => handleDelete(pet.id)}
              style={{ cursor: "pointer" }}
            >
              <div className="card h-100 border border-danger">
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

export default SelectDelete;
