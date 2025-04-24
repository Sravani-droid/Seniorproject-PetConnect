import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import "../styles/Dashboard.css";

function PetDetail() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/pets/${id}`)
      .then((res) => setPet(res.data))
      .catch((err) => console.error("Failed to fetch pet:", err));
  }, [id]);

  const handleReviewSubmit = async () => {
    try {
      await API.post("/feedback", {
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

  const handleShare = () => {
    const shareURL = `${window.location.origin}/pets/${id}`;
    navigator.clipboard.writeText(shareURL).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  if (!pet) return <div className="dashboard-container"><p>Loading...</p></div>;

  return (
    <div className="dashboard-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <div className="form-container">
        <h2>{pet.name}</h2>
        <img
          src={pet.image_url}
          alt={pet.name}
          style={{ width: "100%", borderRadius: "8px", maxHeight: "300px", objectFit: "cover", marginBottom: "1rem" }}
        />
        <button className="auth-btn mb-3" onClick={handleShare}>🔗 Share</button>
        <ul className="list-group">
          <li><strong>Breed:</strong> {pet.breed}</li>
          <li><strong>Type:</strong> {pet.pet_type}</li>
          <li><strong>Age:</strong> {pet.age}</li>
          <li><strong>Origin:</strong> {pet.origin}</li>
          <li><strong>Gender:</strong> {pet.gender}</li>
          <li><strong>Birthdate:</strong> {pet.birthdate}</li>
          <li><strong>Weight:</strong> {pet.weight}</li>
          <li><strong>Height:</strong> {pet.height}</li>
          <li><strong>Health Condition:</strong> {pet.health_status}</li>
          <li><strong>Rabies Vaccinated:</strong> {pet.rabies_vaccinated ? "Yes" : "No"}</li>
          <li><strong>Trained:</strong> {pet.trained ? "Yes" : "No"}</li>
          <li><strong>Spayed/Neutered:</strong> {pet.spayed_neutered ? "Yes" : "No"}</li>
        </ul>
        

        <div className="mt-4">
          <h4>Leave a Review</h4>
          <textarea
            className="auth-textarea"
            placeholder="Your thoughts about this pet..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <input
            className="auth-input"
            type="number"
            min="1"
            max="5"
            placeholder="Rating (1-5)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <button className="auth-btn" onClick={handleReviewSubmit}>Submit Review</button>
          {navigator.share && (
          <button className="auth-btn" onClick={() => {navigator.share({ title: pet.name,
            text: `Check out ${pet.name}, a lovely ${pet.breed} available for adoption on PetConnect!`,
            url: window.location.href,
            });
            }}
          style={{ marginTop: "1rem" }}
          >
    📤 Share This Pet
  </button>
)}
        </div>
      </div>
    </div>
  );
}

export default PetDetail;


