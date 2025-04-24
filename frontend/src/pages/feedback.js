import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Dashboard.css";

function Feedback() {
  const [text, setText] = useState("");
  const [rating, setRating] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/feedback", {
        user_id: userId,
        pet_id: 0, // placeholder if not tied to pet
        text,
        rating: parseInt(rating),
      });
      alert("Thanks for your feedback!");
      setText("");
      setRating("");
    } catch {
      alert("Feedback submission failed.");
    }
  };

  return (
    <div className="dashboard-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <div className="form-container">
        <h2>💬 Submit Feedback</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className="auth-textarea"
            placeholder="What would you like to share with us?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <input
            className="auth-input"
            type="number"
            min="1"
            max="5"
            placeholder="Rating (1 to 5)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <button className="auth-btn" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Feedback;

