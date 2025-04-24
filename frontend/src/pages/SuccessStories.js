import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Dashboard.css";

function SuccessStories() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    API.get("/success_stories")
      .then((res) => setStories(res.data))
      .catch((err) => console.error("Failed to fetch stories", err));
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="welcome-msg">📖 Success Stories</h2>
      <div className="pet-grid">
        {stories.map((story) => (
          <div key={story.id} className="pet-card">
            <img src={story.image_url} alt={story.title} />
            <div className="pet-info">
              <h5>{story.title}</h5>
              <p className="pet-desc">{story.text.slice(0, 80)}...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuccessStories;
