import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Donate() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const userId = localStorage.getItem("userId");

  const submitDonation = async () => {
    try {
      await API.post("/donate", {
        user_id: userId,
        amount: parseFloat(amount),
        message
      });
      alert("Donation sent, thank you!");
      setAmount(""); setMessage("");
    } catch {
      alert("Donation failed.");
    }
  };

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-outline-secondary mb-3">🏠 Home</Link>
      <h2>Support Us with a Donation 💖</h2>
      <input
        className="form-control my-2"
        type="number"
        placeholder="Amount ($)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <textarea
        className="form-control my-2"
        placeholder="Message (optional)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="btn btn-success" onClick={submitDonation}>Donate</button>
    </div>
  );
}

export default Donate;
