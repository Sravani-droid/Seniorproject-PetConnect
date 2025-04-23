import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AddSuccessStory from "./pages/AddSuccessStory";
import ScheduleAppointment from "./pages/Appointments";
import Dashboard from "./pages/Dashboard";
import Donate from "./pages/Donate";
import FAQ from "./pages/faq";
import Feedback from "./pages/feedback";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PetDetail from "./pages/PetDetail";
import Register from "./pages/Register";
import SuccessStories from "./pages/SuccessStories";

function App() {
  return (
    
    <GoogleOAuthProvider clientId="693342524373-6m9p2a9gn4aujd09lde1ilo6uq0g1cd8.apps.googleusercontent.com">
      <h1 style={{ color: "red" }}>If you see this, React is working</h1>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pets/:id" element={<PetDetail />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/add-success-story" element={<AddSuccessStory />} />
          <Route path="/appointments" element={<ScheduleAppointment />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
