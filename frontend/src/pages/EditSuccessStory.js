import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import "../styles/Dashboard.css";

function EditSuccessStory() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/success_stories")
      .then((res) => {
        const story = res.data.find((s) => s.id === Number(id));
        if (story) {
          setTitle(story.title);
          setText(story.text);
          setImageUrl(story.image_url || "");
        }
      })
      .catch((err) => console.error("Fetch error:", err));
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
      navigate("/success-stories");
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="form-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <h2>Edit Story</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="auth-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="auth-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input
          type="file"
          className="form-control my-2"
          onChange={handleImageUpload}
        />
        {imageUrl && <img src={imageUrl} alt="Preview" className="story-preview" />}
        <button className="auth-btn" type="submit">Update Story</button>
      </form>
    </div>
  );
}

export default EditSuccessStory;