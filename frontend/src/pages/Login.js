import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/login", form);
      localStorage.setItem("userId", response.data.user_id);
      localStorage.setItem("userRole", response.data.role);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <Link to="/" className="btn btn-outline-secondary mb-3">🏠 Home</Link>
      <h2>Login to PetConnect</h2>
      <p className="text-muted">Access your account to browse or manage pets.</p>

      <form onSubmit={handleLogin}>
        <input
          className="form-control my-2"
          placeholder="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="form-control my-2"
          placeholder="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="btn btn-success w-100 mt-2" type="submit">Login</button>
      </form>

      <p className="mt-3 text-center">
        Don't have an account?{" "}
        <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;

