import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 py-2 shadow-sm">
      <Link className="navbar-brand fw-bold" to="/">🐾 PetConnect</Link>
      <div className="ms-auto d-flex gap-3">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/success-stories" className="nav-link">Stories</Link>
        <Link to="/appointments" className="nav-link">Appointments</Link>
        <Link to="/events" className="nav-link">Events</Link>
        <Link to="/donate" className="nav-link">Donate</Link>
        <Link to="/login" className="nav-link">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
