import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./FormPage.css";

function AddSuccessStory() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return navigate("/login");

    try {
      await API.post("/add_success_story", {
        user_id: userId,
        title,
        text,
        image_url: imageUrl,
      });
      alert("Story shared!");
      navigate("/success-stories");
    } catch {
      alert("Failed to share story.");
    }
  };

  return (
    <div className="form-container">
      <h2>📝 Share Your Story</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your story..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button type="submit">Share Story</button>
      </form>
    </div>
  );
}

export default AddSuccessStory;
