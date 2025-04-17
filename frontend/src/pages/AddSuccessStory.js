import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function AddSuccessStory() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [preview, setPreview] = useState("");
  const userId = localStorage.getItem("userId");

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const submitStory = async () => {
    try {
      await API.post("/add_success_story", {
        title,
        text,
        image_url: preview,
        shelter_id: userId, 
      
      

      });
      alert("Story added!");
      setTitle(""); setText(""); setPreview("");
    } catch (err) {
      alert("Failed to submit story.");
    }
  };

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-outline-secondary mb-3">🏠 Home</Link>
      <h2>Share Your Success Story 🐶</h2>

      <input
        className="form-control my-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="form-control my-2"
        placeholder="What happened?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        className="form-control my-2"
        type="file"
        accept="image/*"
        onChange={handleImage}
      />
      {preview && <img src={preview} alt="preview" style={{ maxWidth: "200px", marginTop: "10px" }} />}
      <button className="btn btn-primary mt-3" onClick={submitStory}>Submit</button>
    </div>
  );
}

export default AddSuccessStory;



