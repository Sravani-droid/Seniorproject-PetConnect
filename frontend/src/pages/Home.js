import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleProtectedRoute = (route) => {
    if (userId) {
      navigate(route);
    } else {
      alert("Please log in to access this feature.");
      navigate("/login");
    }
  };

  return (
    <div className="container mt-5">
      {/* 🔰 Logo + Slogan */}
      <div className="text-center my-4">
        <img 
        src="/images/petconnect-logo.jpg" 
        alt="PetConnect Logo"
         style={{ height: "120px", marginBottom: "10px" }} 
/>

        
        <h5 className="text-muted fst-italic">A Home for Every Heart</h5>
      </div>

      {/* 🏠 Hero Section */}
      <div className="text-center mb-5">
        <h1 className="display-4">Welcome to PetConnect 🐾</h1>
        <p className="lead">Helping shelters and adopters connect with compassion and care.</p>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <Link to="/register" className="btn btn-primary">Get Started</Link>
          <Link to="/login" className="btn btn-outline-secondary">Login</Link>
          <Link to="/dashboard" className="btn btn-success">Browse Pets</Link>
        </div>
      </div>

      {/* 📜 About Section */}
      <div className="mb-5">
        <h3>About PetConnect</h3>
        <p>
          PetConnect is a capstone project built to support local animal shelters and improve pet adoption outcomes.
          It allows shelters to post adoptable pets and helps adopters browse, filter, and connect — all in one place.
        </p>
      </div>

      {/* 🎯 Explore Features */}
      <div className="mb-5">
        <h3>Explore Features</h3>
        <div className="d-flex flex-wrap gap-3">
          <button onClick={() => handleProtectedRoute("/events")} className="btn btn-outline-primary">📅 View Events</button>
          <button onClick={() => handleProtectedRoute("/appointments")} className="btn btn-outline-success">💬 Schedule Appointment</button>
          <button onClick={() => handleProtectedRoute("/donate")} className="btn btn-outline-danger">💖 Donate</button>
        </div>
      </div>

      {/* 🐶 Success Stories */}
      <div className="mb-5">
        <h3>Success Stories 🐶</h3>
        <p>Read how PetConnect helped pets find their forever homes, or share your own!</p>
        <div className="d-flex gap-3">
          <Link to="/success-stories" className="btn btn-outline-info">📖 View Stories</Link>
          <Link to="/add-success-story" className="btn btn-outline-success">📝 Share Story</Link>
        </div>
      </div>

      {/* ❓ FAQs or Feedback */}
      <div className="mb-5">
        <h3>Have Questions?</h3>
        <p>Visit our FAQs or send feedback to help us improve!</p>
        <Link to="/feedback" className="btn btn-outline-dark me-2">Give Feedback</Link>
        <Link to="/faq" className="btn btn-outline-dark">FAQs</Link>
      </div>

      {/* 📞 Footer */}
      <footer className="text-center mt-5 pt-4 border-top">
        <p>© 2025 PetConnect | A Home for Every Heart</p>
        <small>Built with ❤️ by Sravani Kadiyala, Murray State University</small>
      </footer>
    </div>
  );
}

export default Home;
