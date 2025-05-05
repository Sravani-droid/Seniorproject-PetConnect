import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

function Navbar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar-dashboard">
      <div className="logo-title" onClick={() => navigate("/dashboard")}>
         Welcome to PetConnect, <span style={{ color: "#facc15" }}>{userName}</span>
      </div>
      <div className="profile-dropdown">
        <span className="profile-icon" role="img" aria-label="profile">👤</span>
        <div className="dropdown-content">
          <button onClick={() => navigate("/favorites")}>❤️ Favorites</button>
          <button onClick={handleLogout}>🚪 Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
