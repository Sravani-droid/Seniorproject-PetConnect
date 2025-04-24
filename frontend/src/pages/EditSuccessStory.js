import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import "../styles/Dashboard.css";

function EditSuccessStory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    async function fetchStory() {
      try {
        const res = await API.get("/success_stories");
        const story = res.data.find((s) => s.id === parseInt(id));
        if (story) {
          setTitle(story.title);
          setText(story.text);
          setImageUrl(story.image_url || "");
        }
      } catch (err) {
        console.error("Error fetching story:", err);
      }
    }

    fetchStory();
  }, [id]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setImageUrl(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/update_success_story/${id}`, {
        title,
        text,
        image_url: imageUrl,
      });
      alert("✅ Story updated!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Update failed:", err);
      alert("❌ Failed to update story.");
    }
  };

  return (
    <div className="form-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <h2>Edit Success Story</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="auth-input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="auth-textarea"
          placeholder="Story Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <label className="form-label">Upload Image</label>
        <input
          type="file"
          className="form-control mb-3"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Preview"
            style={{ maxWidth: "300px", marginBottom: "1rem", borderRadius: "8px" }}
          />
        )}
        <button type="submit" className="auth-btn">Update Story</button>
      </form>
    </div>
  );
}

export default EditSuccessStory;