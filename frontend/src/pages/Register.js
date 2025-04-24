import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Login.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("adopter");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/register", { name, email, password, role });
      localStorage.clear(); // Clear any previous session data
      alert("Registered successfully! Please log in.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <img src="/images/logo.png" alt="PetConnect Logo" className="auth-logo" />
      <h2 className="auth-title">Create Account</h2>

      <input
        type="text"
        className="auth-input"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        className="auth-input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="auth-input"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <select
        className="auth-input"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="adopter">Adopter – I want to adopt a pet</option>
        <option value="shelter">Shelter – I want to list/manage pets</option>
      </select>

      <p className="auth-note"><strong>Adopter:</strong> Looking to adopt a pet.</p>
      <p className="auth-note"><strong>Shelter:</strong> Representing a shelter to list and manage pets.</p>

      <button className="auth-btn" onClick={handleRegister}>Register</button>

      <p className="auth-link">
        Already registered? <Link to="/login" className="auth-highlight">Login</Link>
      </p>
      <p className="auth-link back-link">
        <Link to="/" className="auth-highlight">← Back</Link>
      </p>
    </div>
  );
}

export default Register;