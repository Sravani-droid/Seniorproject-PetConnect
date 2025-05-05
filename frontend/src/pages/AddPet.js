import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/FormPage.css";

function AddPet() {
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
    dapp: false,
    lepto: false,
    bordetella: false,
    fvrcp: false,
    good_with_dogs: false,
    good_with_cats: false,
    good_with_kids: false,
  });

  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const shelterId = localStorage.getItem("userId");

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
      await API.post("/add_pet", {
        ...form,
        age: parseInt(form.age),
        image_url: image,
        shelter_id: shelterId,
      });
      alert("✅ Pet added successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add pet.");
    }
  };

  // Debug visibility
  console.log("Pet type is:", form.pet_type);

  return (
    <div className="form-container">
      <h2>➕ Add a New Pet</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="auth-input" />
        <input name="breed" value={form.breed} onChange={handleChange} placeholder="Breed (e.g. Labrador Mix)" className="auth-input" />
        <input type="number" name="age" value={form.age} onChange={handleChange} placeholder="Age" className="auth-input" />

        <select name="pet_type" value={form.pet_type} onChange={handleChange} className="auth-input">
          <option value="">Species</option>
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
        <input name="weight" value={form.weight} onChange={handleChange} placeholder="Weight (lbs)" className="auth-input" />
        <input name="height" value={form.height} onChange={handleChange} placeholder="Height (inches)" className="auth-input" />
        <input name="health_status" value={form.health_status} onChange={handleChange} placeholder="Health Status" className="auth-input" />

        {/* Conditional Dog Vaccines */}
        {form.pet_type === "Dog" && (
          <>
            <div className="form-check"><input type="checkbox" name="dapp" onChange={handleChange} checked={form.dapp} /> DAPP – Core vaccine for dogs</div>
            <div className="form-check"><input type="checkbox" name="lepto" onChange={handleChange} checked={form.lepto} /> Lepto – Prevents leptospirosis</div>
            <div className="form-check"><input type="checkbox" name="bordetella" onChange={handleChange} checked={form.bordetella} /> Bordetella – Kennel cough protection</div>
          </>
        )}

        {/* Conditional Cat Vaccine */}
        {form.pet_type === "Cat" && (
          <div className="form-check">
            <input type="checkbox" name="fvrcp" onChange={handleChange} checked={form.fvrcp} /> FVRCP – Protects cats from 3 core viruses
          </div>
        )}

        {/* Shared checkboxes */}
        <div className="form-check"><input type="checkbox" name="rabies_vaccinated" onChange={handleChange} checked={form.rabies_vaccinated} /> Rabies Vaccinated</div>
        <div className="form-check"><input type="checkbox" name="trained" onChange={handleChange} checked={form.trained} /> Trained</div>
        <div className="form-check"><input type="checkbox" name="spayed_neutered" onChange={handleChange} checked={form.spayed_neutered} /> Spayed/Neutered</div>

        <div className="form-check"><input type="checkbox" name="good_with_dogs" onChange={handleChange} checked={form.good_with_dogs} /> Good With Dogs</div>
        <div className="form-check"><input type="checkbox" name="good_with_cats" onChange={handleChange} checked={form.good_with_cats} /> Good With Cats</div>
        <div className="form-check"><input type="checkbox" name="good_with_kids" onChange={handleChange} checked={form.good_with_kids} /> Good With Kids</div>

        <label>Upload Image</label>
        <input type="file" accept="image/*" onChange={handleImage} className="auth-input" />
        {image && <img src={image} alt="preview" style={{ maxWidth: "200px", margin: "10px 0", borderRadius: "8px" }} />}

        <button type="submit" className="auth-btn">Add Pet</button>
      </form>
    </div>
  );
}

export default AddPet;

