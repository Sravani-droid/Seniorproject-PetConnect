import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Dashboard.css";

function Donate() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("You must be logged in to donate!");
      return navigate("/login");
    }

    try {
      await API.post("/donate", {
        user_id: userId,
        amount: parseFloat(amount),
        message,
      });
      alert("💖 Donation successful!");
      setAmount("");
      setMessage("");
      navigate("/dashboard");
    } catch (err) {
      console.error("Donation error:", err);
      alert("❌ Donation failed.");
    }
  };

  return (
    <div className="form-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <h2>💖 Make a Donation</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="auth-input"
          type="number"
          step="0.01"
          placeholder="Amount (USD)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <textarea
          className="auth-textarea"
          placeholder="Message (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="auth-btn">Donate</button>
      </form>
    </div>
  );
}

export default Donate;

