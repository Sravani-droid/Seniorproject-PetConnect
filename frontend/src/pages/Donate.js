import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./FormPage.css";

function Donate() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return navigate("/login");

    try {
      await API.post("/donate", { user_id: userId, amount, message });
      alert("Thank you for your donation!");
    } catch {
      alert("Donation failed.");
    }
  };

  return (
    <div className="form-container">
      <h2>💖 Make a Donation</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount in USD"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <textarea
          placeholder="Leave a message (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Donate</button>
      </form>
    </div>
  );
}

export default Donate;

