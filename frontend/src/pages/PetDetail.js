import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function PetDetail() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    API.get(`/pets/${id}`)
      .then((res) => setPet(res.data))
      .catch((err) => console.error("Failed to fetch pet:", err));
  }, [id]);

  const submitReview = async () => {
    try {
      await API.post("/add_review", {
        user_id: localStorage.getItem("userId"),
        pet_id: id,
        text: reviewText,
        rating: parseInt(rating),
      });
      alert("✅ Review submitted!");
      setReviewText("");
      setRating("");
    } catch (err) {
      console.error("Review error:", err);
      alert("❌ Failed to submit review.");
    }
  };

  if (!pet) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>{pet.name}</h2>
      <img
        src={pet.image_url}
        alt={pet.name}
        style={{ maxWidth: "400px", borderRadius: "10px" }}
      />

      {/* Pet Info */}
      <ul className="list-group mt-3">
        <li className="list-group-item"><strong>Breed:</strong> {pet.breed}</li>
        <li className="list-group-item"><strong>Type:</strong> {pet.pet_type}</li>
        <li className="list-group-item"><strong>Age:</strong> {pet.age}</li>
        <li className="list-group-item"><strong>Origin:</strong> {pet.origin}</li>
        <li className="list-group-item"><strong>Description:</strong> {pet.description}</li>
      </ul>

      {/* Detailed Attributes */}
      <h4 className="mt-4">Details</h4>
      <ul className="list-group">
        <li className="list-group-item"><strong>Gender:</strong> {pet.gender}</li>
        <li className="list-group-item"><strong>Birthdate:</strong> {pet.birthdate}</li>
        <li className="list-group-item"><strong>Weight:</strong> {pet.weight}</li>
        <li className="list-group-item"><strong>Height:</strong> {pet.height}</li>
        <li className="list-group-item"><strong>Health Condition:</strong> {pet.health_status}</li>
        <li className="list-group-item"><strong>Rabies Vaccinated:</strong> {pet.rabies_vaccinated ? "Yes" : "No"}</li>
        <li className="list-group-item"><strong>Trained:</strong> {pet.trained}</li>
      </ul>

      {/* Review Section */}
      <div className="mt-5">
        <h4>Leave a Review</h4>
        <textarea
          className="form-control my-2"
          placeholder="Your thoughts about this pet..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <input
          className="form-control my-2"
          type="number"
          min="1"
          max="5"
          placeholder="Rating (1 to 5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button className="btn btn-success" onClick={submitReview}>
          Submit Review
        </button>
      </div>
    </div>
  );
}

export default PetDetail;

