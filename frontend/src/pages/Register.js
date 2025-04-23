import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Login.css"; // same styling as Login

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("adopter");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/register", { name, email, password, role });
      alert("Registration successful!");
      navigate("/login");
    } catch {
      alert("Registration failed.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <img src="/images/logo.png" alt="Logo" className="auth-logo" />
        <h2>Register</h2>
        <input
          placeholder="Name"
          className="auth-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
          className="auth-input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="adopter">Adopter (Search & adopt pets)</option>
          <option value="shelter">Shelter (Post/manage pets)</option>
        </select>
        <button className="auth-btn" onClick={handleRegister}>Register</button>
        <p className="auth-link" onClick={() => navigate("/login")}>Already registered? Login</p>
      </div>
    </div>
  );
}

export default Register;



