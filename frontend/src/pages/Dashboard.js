import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    if (userRole === "adopter") {
      navigate("/adopter-dashboard");
    } else if (userRole === "shelter") {
      navigate("/shelter-dashboard");
    } else {
      navigate("/login");
    }
  }, [userRole, navigate]);

  return null;
}

export default Dashboard;


