import { useEffect, useState } from "react";
import API from "../services/api";
import "./FormPage.css";

function SuccessStories() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    API.get("/success_stories")
      .then((res) => setStories(res.data))
      .catch(() => alert("Failed to load stories."));
  }, []);

  return (
    <div className="form-container">
      <h2>🐶 Adoption Success Stories</h2>
      {stories.length === 0 ? (
        <p>No stories yet!</p>
      ) : (
        stories.map((s) => (
          <div key={s.id} className="story-card">
            <img src={s.image_url} alt={s.title} />
            <h4>{s.title}</h4>
            <p>{s.text}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default SuccessStories;
