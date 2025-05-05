import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/FormPage.css";

function AddSuccessStory() {
  const [form, setForm] = useState({ title: "", text: "" });
  const [previewImage, setPreviewImage] = useState("");
  const navigate = useNavigate();
  const shelterId = localStorage.getItem("userId");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.text || !previewImage) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    try {
      await API.post("/add_success_story", {
        title: form.title,
        text: form.text,
        image_url: previewImage,
        shelter_id: shelterId,
      });
      alert("✅ Success story added!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Submit failed", err);
      alert("❌ Failed to add story.");
    }
  };

  return (
    <div className="form-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <h2>📖 Share a Success Story</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Story Title" className="auth-input" />
        <textarea name="text" value={form.text} onChange={handleChange} placeholder="Story Description" className="auth-textarea" />

        <label>Upload Image</label>
        <input type="file" accept="image/*" onChange={handleImage} className="auth-input" />
        {previewImage && (
          <img
            src={previewImage}
            alt="preview"
            style={{ maxWidth: "100%", maxHeight: "300px", borderRadius: "8px", marginBottom: "1rem" }}
          />
        )}

        <button type="submit" className="auth-btn">Submit Story</button>
      </form>
    </div>
  );
}

export default AddSuccessStory;
