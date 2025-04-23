import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <GoogleOAuthProvider clientId="693342524373-6m9p2a9gn4aujd09lde1ilo6uq0g1cd8.apps.googleusercontent.com">
      <div className="auth-wrapper">
        <div className="auth-box">
          <img src="/images/logo.png" alt="Logo" className="auth-logo" />
          <h2>Login</h2>

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

          <button className="auth-btn" onClick={handleLogin}>Login</button>

          <div className="auth-separator">or</div>

          <GoogleLogin
            onSuccess={(res) => {
              console.log("Google login success", res);
              alert("Logged in with Google!");
              navigate("/dashboard");
            }}
            onError={() => {
              alert("Google login failed");
              console.error("Google Login Error");
            }}
          />

          <p className="auth-link" onClick={() => navigate("/register")}>
            Don’t have an account? Register
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
