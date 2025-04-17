import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function SuccessStories() {
  const [stories, setStories] = useState([]);
  const userId = parseInt(localStorage.getItem("userId"));
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/success_stories").then((res) => setStories(res.data));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this story?")) return;
    try {
      await API.delete(`/delete_success_story/${id}`);
      setStories(stories.filter((s) => s.id !== id));
    } catch (err) {
      alert("Failed to delete story.");
    }
  };

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-outline-secondary mb-3">🏠 Home</Link>
      <h2>Success Stories 🐾</h2>

      {stories.length === 0 ? (
        <p>No stories shared yet.</p>
      ) : (
        <div className="row">
          {stories.map((story) => (
            <div className="col-md-4 mb-4" key={story.id}>
              <div className="card h-100">
                {story.image_url && (
                  <img src={story.image_url} className="card-img-top" alt="Success" />
                )}
                <div className="card-body">
                  <h5 className="card-title">{story.title}</h5>
                  <p className="card-text">{story.text}</p>

                  {userId === story.user_id && (
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-warning" onClick={() => navigate(`/edit-success-story/${story.id}`)}>✏️ Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(story.id)}>🗑️ Delete</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SuccessStories;
