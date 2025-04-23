import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./FormPage.css";

function Feedback() {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/feedback", { text });
      alert("Thanks for your feedback!");
      setText("");
    } catch {
      alert("Feedback failed.");
    }
  };

  return (
    <div className="form-container">
      <h2>💬 Feedback</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Tell us what you think..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}

export default Feedback;

