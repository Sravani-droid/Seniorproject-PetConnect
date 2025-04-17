import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AddPet() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [petType, setPetType] = useState("");
  const [origin, setOrigin] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [health, setHealth] = useState("");
  const [rabies, setRabies] = useState(false);
  const [trained, setTrained] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const navigate = useNavigate();
  const shelterId = localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    

    e.preventDefault();
    

    try {
      await API.post("/add_pet", {
        name,
        breed,
        age: parseInt(age),
        pet_type: petType,
        origin,
        description,
        gender,
        birthdate,
        weight,
        height,
        health_status: health,
        rabies_vaccinated: rabies,
        image_url: previewUrl,
        trained,
        shelter_id: shelterId,
      });
      alert("Pet added successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Add pet error:", error);
      alert("Failed to add pet.");
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result); // base64 string
      };
      reader.readAsDataURL(file);
    }
  };
  

  return (
    <div className="container mt-4">
      <h2>Add a New Pet 🐶</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control my-2" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input className="form-control my-2" value={breed} onChange={(e) => setBreed(e.target.value)} placeholder="Breed" />
        <input className="form-control my-2" type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" />

        <select className="form-select my-2" value={petType} onChange={(e) => setPetType(e.target.value)}>
          <option value="">Select Type</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Other">Other</option>
        </select>

        <select className="form-select my-2" value={origin} onChange={(e) => setOrigin(e.target.value)}>
          <option value="">Select Origin</option>
          <option value="Stray">Stray</option>
          <option value="Surrendered">Surrendered</option>
        </select>

        <textarea className="form-control my-2" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />

        <label className="form-label">Upload Pet Image</label>
        <input
      
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="form-control my-2"
       />


        {/* Additional Fields */}
        <input className="form-control my-2" value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Gender (Male/Female)" />
        <label>Birthdate</label>
        <input
          type="date"
          className="form-control my-2"
          value={birthdate}
         onChange={(e) => setBirthdate(e.target.value)}
/>

        <input className="form-control my-2" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight (lbs)" />
        <input className="form-control my-2" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Height (inches)" />
        <input className="form-control my-2" value={health} onChange={(e) => setHealth(e.target.value)} placeholder="Health Status" />

        <div className="form-check my-2">
          <input className="form-check-input" type="checkbox" checked={rabies} onChange={() => setRabies(!rabies)} />
          <label className="form-check-label">Rabies Vaccinated</label>
        </div>

        <div className="form-check my-2">
          <input className="form-check-input" type="checkbox" checked={trained} onChange={() => setTrained(!trained)} />
          <label className="form-check-label">Trained</label>
        </div>

        <button className="btn btn-primary mt-3" type="submit">Add Pet</button>
      </form>
    </div>
  );
}

export default AddPet;
