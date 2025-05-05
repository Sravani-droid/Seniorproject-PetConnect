import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Dashboard.css";

function SuccessStories() {
  const [stories, setStories] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/success_stories")
      .then((res) => setStories(res.data))
      .catch((err) => console.error("Fetch failed:", err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this story?")) return;
    try {
      await API.delete(`/delete_success_story/${id}`);
      setStories(stories.filter((story) => story.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="dashboard-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <h2 className="welcome-msg">🌟 Success Stories</h2>
      <div className="pet-grid">
        {stories.map((story) => (
          <div key={story.id} className="pet-card">
            <img src={story.image_url} alt={story.title} />
            <div className="pet-info">
              <h5>{story.title}</h5>
              <p className="pet-desc">{story.text.slice(0, 100)}...</p>
            </div>
            {String(story.shelter_id) === userId && (
              <div className="pet-card-buttons">
                <button onClick={() => navigate(`/edit-success-story/${story.id}`)}>Edit</button>
                <button onClick={() => handleDelete(story.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuccessStories;