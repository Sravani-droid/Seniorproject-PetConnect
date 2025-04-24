import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-box">
        <img src="/images/logo.png" alt="PetConnect Logo" className="home-logo" />
        <h1 className="home-title">Welcome to PetConnect</h1>
        <p className="home-slogan">A Home for Every Heart 🐾</p>

        <div className="home-buttons">
          <button className="home-btn primary" onClick={() => navigate("/register")}>
            Get Started
          </button>
          <button className="home-btn secondary" onClick={() => navigate("/login")}>
            Browse Pets
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;






