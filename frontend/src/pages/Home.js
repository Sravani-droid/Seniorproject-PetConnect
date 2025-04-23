import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  return (
    <div className="home-container">
      <div className="home-content">
        <img src="/images/logo.png" alt="PetConnect Logo" className="home-logo" />
        <h1 className="home-title">Welcome to PetConnect</h1>
        <p className="home-slogan">A Home for Every Heart 🐾</p>

        <div className="home-buttons">
          <button onClick={() => navigate("/register")}>Get Started</button>
          <button onClick={() => userId ? navigate("/dashboard") : navigate("/login")}>Browse Pets</button>
        </div>
      </div>
    </div>
  );
}

export default Home;



