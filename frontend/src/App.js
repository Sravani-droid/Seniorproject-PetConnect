import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import AddPet from "./pages/AddPet";
import AddSuccessStory from "./pages/AddSuccessStory";
import Appointments from "./pages/Appointments";
import Dashboard from "./pages/Dashboard";
import Donate from "./pages/Donate";
import EditPet from "./pages/EditPet";
import EditSuccessStory from "./pages/EditSuccessStory";
import Events from "./pages/Events";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PetDetail from "./pages/PetDetail";
import Register from "./pages/Register";
import SelectDelete from "./pages/SelectDelete";
import SelectEdit from "./pages/SelectEdit";
import SuccessStories from "./pages/SuccessStories";
import FAQ from "./pages/faq";
import Feedback from "./pages/feedback";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-pet" element={<AddPet />} />
          <Route path="/edit-pet/:id" element={<EditPet />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/add-success-story" element={<AddSuccessStory />} />
          <Route path="/edit-success-story/:id" element={<EditSuccessStory />} />
          <Route path="/pets/:id" element={<PetDetail />} />
          <Route path="/select-edit" element={<SelectEdit />} />
          <Route path="/select-delete" element={<SelectDelete />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/events" element={<Events />} />
          <Route path="/donate" element={<Donate />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;


