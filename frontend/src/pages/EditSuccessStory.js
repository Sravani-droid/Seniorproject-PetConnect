import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EditSuccessStory() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStory() {
      const res = await API.get("/success_stories");
      const current = res.data.find((s) => s.id === parseInt(id));
      if (current) {
        setStory(current);
        setPreview(current.image_url);
      }
    }
    fetchStory();
  }, [id]);

  const handleChange = (e) => {
    setStory({ ...story, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/update_success_story/${id}`, {
        ...story,
        image_url: preview,
      });
      alert("Story updated!");
      navigate("/success-stories");
    } catch (err) {
      alert("Update failed.");
    }
  };

  if (!story) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-outline-secondary mb-3">🏠 Home</Link>
      <h2>Edit Your Story</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control my-2"
          name="title"
          value={story.title}
          onChange={handleChange}
        />
        <textarea
          className="form-control my-2"
          name="text"
          value={story.text}
          onChange={handleChange}
        />
        <input
          type="file"
          className="form-control"
          onChange={handleImage}
          accept="image/*"
        />
        {preview && <img src={preview} alt="" style={{ maxWidth: "200px", marginTop: "10px" }} />
    }
        <button type="submit" className="btn btn-primary mt-3">Save Changes</button>
      </form>
    </div>
  );
}

export default EditSuccessStory;
