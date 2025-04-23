import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider, signInWithPopup } from "../firebase";
import API from "../services/api";
import "./Login.css";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/login", { email, password });
      localStorage.setItem("userId", res.data.user.id);
      localStorage.setItem("userRole", res.data.user.role);
      navigate("/dashboard");
    } catch {
      alert("Login failed.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("userId", user.uid);
      localStorage.setItem("userRole", "adopter");
      navigate("/dashboard");
    } catch (error) {
      alert("Google login failed");
    }
  };
  

  

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <img src="/images/logo.png" alt="Logo" className="auth-logo" />
        <h2>Login</h2>

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

        <div className="auth-google">
          <button className="auth-btn" onClick={handleGoogleLogin}>
            Login with Google
          </button>
        </div>

        <p className="auth-link" onClick={() => navigate("/register")}>
          Don't have an account? Register
        </p>
      </div>
    </div>
  );
}

export default Login;



