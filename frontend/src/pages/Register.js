import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "adopter",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/register", form);
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      alert("Registration failed. Email might already be used.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <Link to="/" className="btn btn-outline-secondary mb-3">🏠 Home</Link>
      <h2>Create Your PetConnect Account 🐾</h2>
      <p className="text-muted">
        Whether you're looking to adopt or help animals find homes, you're in the right place!
      </p>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control my-2"
          placeholder="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
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

        <label className="form-label mt-3">Who are you?</label>
        <select
          className="form-select"
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="adopter">Adopter - Looking to adopt</option>
          <option value="shelter">Shelter - Listing animals</option>
        </select>

        <div className="form-text mt-2 mb-3">
          By signing up, you agree to our{" "}
          <a href="#">Privacy Policy</a> and{" "}
          <a href="#">Terms of Service</a>.
        </div>

        <button className="btn btn-primary w-100" type="submit">Register</button>
      </form>

      <p className="mt-3 text-center">
        Already have an account?{" "}
        <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;
