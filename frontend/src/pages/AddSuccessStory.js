import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Dashboard.css";

function AddSuccessStory() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const navigate = useNavigate();
  const shelterId = localStorage.getItem("userId");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/add_success_story", {
        title,
        text,
        image_url: previewUrl,
        shelter_id: shelterId,
      });
      alert("✅ Story posted!");
      navigate("/success-stories");
    } catch (err) {
      console.error("Story error:", err);
      alert("❌ Failed to post story.");
    }
  };

  return (
    <div className="form-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <h2>📖 Share a Success Story</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Story Title"
          className="auth-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Tell your story..."
          className="auth-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <label className="form-label">Upload Image</label>
        <input type="file" className="form-control my-2" onChange={handleFileChange} />
        {previewUrl && <img src={previewUrl} alt="Preview" style={{ maxWidth: "100%", borderRadius: "8px", marginTop: "1rem" }} />}
        <button className="auth-btn" type="submit">Submit Story</button>
      </form>
    </div>
  );
}

export default AddSuccessStory;
