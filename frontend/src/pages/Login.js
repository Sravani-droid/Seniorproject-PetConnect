import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const res = await API.post("/login", { email, password });

      localStorage.setItem("userId", res.data.user_id);
      localStorage.setItem("userRole", res.data.role);
      localStorage.setItem("userName", res.data.name);

      if (res.data.role === "adopter") {
        navigate("/adopter-dashboard");
      } else if (res.data.role === "shelter") {
        navigate("/shelter-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      alert("Login failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="auth-container">
      <img src="/images/logo.png" alt="PetConnect Logo" className="auth-logo" />
      <h2 className="auth-title">Login</h2>

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
      <button className="auth-btn" onClick={handleLogin}>Login</button>

      <p className="auth-link">
        No account? <Link to="/register" className="auth-highlight">Register</Link>
      </p>
      <p className="auth-back">
        <Link to="/" className="auth-highlight">← Back</Link>
      </p>
    </div>
  );
}

export default Login;