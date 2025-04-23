import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  // Hide navbar on homepage
  if (location.pathname === "/") return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-2">
      <Link className="navbar-brand" to="/">🐾 PetConnect</Link>
      <div className="ms-auto d-flex gap-3">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/success-stories" className="nav-link">Stories</Link>
        <Link to="/events" className="nav-link">Events</Link>
        <Link to="/appointments" className="nav-link">Appointments</Link>
        <Link to="/login" className="nav-link">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;




