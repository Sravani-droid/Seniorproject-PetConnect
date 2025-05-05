import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import AddEvent from "./pages/AddEvent";
import AddPet from "./pages/AddPet";
import AddSuccessStory from "./pages/AddSuccessStory";
import Appointments from "./pages/Appointments";
import Dashboard from "./pages/Dashboard";
import DeleteAppointment from "./pages/DeleteAppointment";
import Donate from "./pages/Donate";
import EditAppointment from "./pages/EditAppointment";
import EditEvent from "./pages/EditEvent";
import EditPet from "./pages/EditPet";
import EditSuccessStory from "./pages/EditSuccessStory";
import Events from "./pages/Events";
import FAQ from "./pages/FAQ";
import Favorites from "./pages/Favorites";
import Feedback from "./pages/Feedback";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MapWithDirections from "./pages/MapWithDirections";
import PetDetail from "./pages/PetDetail";
import Register from "./pages/Register";
import SelectDelete from "./pages/SelectDelete";
import SelectEdit from "./pages/SelectEdit";
import SuccessStories from "./pages/SuccessStories";
import VirtualMeeting from "./pages/VirtualMeeting";
import AdopterDashboard from "./views/AdopterDashboard";
import ShelterDashboard from "./views/ShelterDashboard";




function AppRoutes() {
  const location = useLocation();
  const hideNavbarOn = ["/", "/login", "/register"];
  const showNavbar = !hideNavbarOn.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-pet" element={<AddPet />} />
        <Route path="/edit-pet/:id" element={<EditPet />} />
        <Route path="/select-edit" element={<SelectEdit />} />
        <Route path="/select-delete" element={<SelectDelete />} />
        <Route path="/events" element={<Events />} />
        <Route path="/add-success-story" element={<AddSuccessStory />} />
        <Route path="/edit-success-story/:id" element={<EditSuccessStory />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/pets/:id" element={<PetDetail />} />
        <Route path="/success-stories" element={<SuccessStories />} />
        <Route path="/virtual-meeting" element={<VirtualMeeting />} />
        <Route path="/adopter-dashboard" element={<AdopterDashboard />} />
        <Route path="/shelter-dashboard" element={<ShelterDashboard />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/edit-appointment" element={<EditAppointment />} />
        <Route path="/delete-appointment" element={<DeleteAppointment />} />
        <Route path="/edit-event/:id" element={<EditEvent />} />
        <Route path="/map-directions" element={<MapWithDirections />} />
        </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;


