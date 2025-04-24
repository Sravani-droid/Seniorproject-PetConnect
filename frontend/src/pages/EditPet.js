import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import "../styles/FormPage.css";

function EditPet() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    breed: "",
    age: "",
    pet_type: "",
    origin: "",
    description: "",
    gender: "",
    birthdate: "",
    weight: "",
    height: "",
    health_status: "",
    rabies_vaccinated: false,
    trained: false,
    spayed_neutered: false,
  });

  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchPet() {
      try {
        const res = await API.get(`/pets/${id}`);
        const data = res.data;
        setForm({
          name: data.name,
          breed: data.breed,
          age: data.age,
          pet_type: data.pet_type,
          origin: data.origin,
          description: data.description || "",
          gender: data.gender || "",
          birthdate: data.birthdate || "",
          weight: data.weight || "",
          height: data.height || "",
          health_status: data.health_status || "",
          rabies_vaccinated: data.rabies_vaccinated || false,
          trained: data.trained || false,
          spayed_neutered: data.spayed_neutered || false,
        });
        setImage(data.image_url || "");
      } catch (err) {
        console.error("Error fetching pet:", err);
      }
    }
    fetchPet();
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
      setMessage("✅ Pet updated successfully!");
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err) {
      console.error("Update error:", err);
      setMessage("❌ Failed to update pet.");
    }
  };

  return (
    <div className="form-container">
      <h2>✏️ Edit Pet</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="auth-input" />
        <input name="breed" value={form.breed} onChange={handleChange} placeholder="Breed" className="auth-input" />
        <input type="number" name="age" value={form.age} onChange={handleChange} placeholder="Age" className="auth-input" />

        <select name="pet_type" value={form.pet_type} onChange={handleChange} className="auth-input">
          <option value="">Type</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Other">Other</option>
        </select>

        <select name="origin" value={form.origin} onChange={handleChange} className="auth-input">
          <option value="">Origin</option>
          <option value="Stray">Stray</option>
          <option value="Surrendered">Surrendered</option>
        </select>

        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="auth-textarea" />

        <input name="gender" value={form.gender} onChange={handleChange} placeholder="Gender" className="auth-input" />
        <input type="date" name="birthdate" value={form.birthdate} onChange={handleChange} className="auth-input" />
        <input name="weight" value={form.weight} onChange={handleChange} placeholder="Weight" className="auth-input" />
        <input name="height" value={form.height} onChange={handleChange} placeholder="Height" className="auth-input" />
        <input name="health_status" value={form.health_status} onChange={handleChange} placeholder="Health Status" className="auth-input" />

        <div className="form-check my-2">
          <input type="checkbox" checked={form.rabies_vaccinated} name="rabies_vaccinated" onChange={handleChange} />
          <label className="form-check-label">Rabies Vaccinated</label>
        </div>

        <div className="form-check my-2">
          <input type="checkbox" checked={form.trained} name="trained" onChange={handleChange} />
          <label className="form-check-label">Trained</label>
        </div>

        <div className="form-check my-2">
          <input type="checkbox" checked={form.spayed_neutered} name="spayed_neutered" onChange={handleChange} />
          <label className="form-check-label">Spayed/Neutered</label>
        </div>

        <label>Change Image</label>
        <input type="file" accept="image/*" onChange={handleImage} className="auth-input" />
        {image && (
          <img src={image} alt="Preview" style={{ maxWidth: "200px", marginTop: "10px", borderRadius: "8px" }} />
        )}

        <button type="submit" className="auth-btn">Update Pet</button>
        {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
      </form>
    </div>
  );
}

export default EditPet;
