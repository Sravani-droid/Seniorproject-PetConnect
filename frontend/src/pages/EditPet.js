import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import "../styles/FormPage.css";

function EditPet() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/pets/${id}`)
      .then((res) => {
        setForm(res.data);
        setImage(res.data.image_url);
      })
      .catch((err) => console.error("Failed to fetch pet", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/update_pet/${id}`, {
        ...form,
        age: parseInt(form.age),
        image_url: image,
      });
      alert("✅ Pet updated!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Update error", err);
      alert("❌ Failed to update pet");
    }
  };

  if (!form) return <p>Loading...</p>;

  return (
    <div className="form-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <h2>Edit Pet</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} className="auth-input" />
        <input name="breed" value={form.breed} onChange={handleChange} className="auth-input" />
        <input type="number" name="age" value={form.age} onChange={handleChange} className="auth-input" />
        <input name="gender" value={form.gender} onChange={handleChange} className="auth-input" />
        <input name="birthdate" value={form.birthdate} onChange={handleChange} className="auth-input" />
        <input name="weight" value={form.weight} onChange={handleChange} className="auth-input" />
        <input name="height" value={form.height} onChange={handleChange} className="auth-input" />
        <input name="health_status" value={form.health_status} onChange={handleChange} className="auth-input" />
        <textarea name="description" value={form.description} onChange={handleChange} className="auth-textarea" />

        <div className="form-check"><input type="checkbox" name="rabies_vaccinated" checked={form.rabies_vaccinated} onChange={handleChange} /> Rabies Vaccinated</div>
        <div className="form-check"><input type="checkbox" name="trained" checked={form.trained} onChange={handleChange} /> Trained</div>
        <div className="form-check"><input type="checkbox" name="spayed_neutered" checked={form.spayed_neutered} onChange={handleChange} /> Spayed/Neutered</div>

        <div className="form-check"><input type="checkbox" name="good_with_dogs" checked={form.good_with_dogs} onChange={handleChange} /> Good With Dogs</div>
        <div className="form-check"><input type="checkbox" name="good_with_cats" checked={form.good_with_cats} onChange={handleChange} /> Good With Cats</div>
        <div className="form-check"><input type="checkbox" name="good_with_kids" checked={form.good_with_kids} onChange={handleChange} /> Good With Kids</div>

        <label>Change Image</label>
        <input type="file" accept="image/*" onChange={handleImage} className="auth-input" />
        {image && <img src={image} alt="preview" style={{ maxWidth: "200px", margin: "10px 0" }} />}

        <button type="submit" className="auth-btn">Save Changes</button>
      </form>
    </div>
  );
}

export default EditPet;
