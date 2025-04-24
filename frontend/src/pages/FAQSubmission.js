import { useState } from "react";
import API from "../services/api";
import "../styles/Dashboard.css";

function FAQSubmission() {
  const [question, setQuestion] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/submit_faq", { question });
      setMessage("✅ Question submitted for review!");
      setQuestion("");
    } catch (err) {
      setMessage("❌ Failed to submit.");
      console.error("FAQ submission error:", err);
    }
  };

  return (
    <div className="form-container">
      <h2>❓ Submit a Question</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="auth-textarea"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question..."
          required
        />
        <button className="auth-btn" type="submit">Submit</button>
      </form>
      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </div>
  );
}

export default FAQSubmission;