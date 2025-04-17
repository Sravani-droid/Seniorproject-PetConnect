import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EditPet() {
  const { id } = useParams();
  const navigate = useNavigate();

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
  const [healthStatus, setHealthStatus] = useState("");
  const [rabiesVaccinated, setRabiesVaccinated] = useState(false);
  const [trained, setTrained] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchPet() {
      try {
        const response = await API.get(`/pets/${id}`);
        const pet = response.data;
        if (pet) {
          setName(pet.name);
          setBreed(pet.breed);
          setAge(pet.age);
          setPetType(pet.pet_type);
          setOrigin(pet.origin);
          setDescription(pet.description || "");
          setGender(pet.gender || "");
          setBirthdate(pet.birthdate || "");
          setWeight(pet.weight || "");
          setHeight(pet.height || "");
          setHealthStatus(pet.health_status || "");
          setRabiesVaccinated(pet.rabies_vaccinated || false);
          setTrained(pet.trained || false);
          setPreviewUrl(pet.image_url || "");
        }
      } catch (err) {
        console.error("Error fetching pet:", err);
      }
    }

    fetchPet();
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/update_pet/${id}`, {
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
        health_status: healthStatus,
        rabies_vaccinated: rabiesVaccinated,
        trained,
        image_url: previewUrl,
      });

      setMessage("✅ Pet updated successfully!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      console.error("Failed to update pet:", error);
      setMessage("❌ Update failed.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Pet</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control my-2" value={name} onChange={(e) => setName(e.target.value)} placeholder="Pet Name" />
        <input className="form-control my-2" value={breed} onChange={(e) => setBreed(e.target.value)} placeholder="Breed" />
        <input className="form-control my-2" type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" />
        <input className="form-control my-2" value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Gender" />
        <input className="form-control my-2" type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} placeholder="Birthdate" />
        <input className="form-control my-2" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight (e.g., 10 kg)" />
        <input className="form-control my-2" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Height (e.g., 40 cm)" />
        <input className="form-control my-2" value={healthStatus} onChange={(e) => setHealthStatus(e.target.value)} placeholder="Health Status" />

        <select className="form-select my-2" value={petType} onChange={(e) => setPetType(e.target.value)}>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Other">Other</option>
        </select>

        <select className="form-select my-2" value={origin} onChange={(e) => setOrigin(e.target.value)}>
          <option value="Stray">Stray</option>
          <option value="Surrendered">Surrendered</option>
        </select>

        <textarea className="form-control my-2" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />

        <div className="form-check my-2">
          <input className="form-check-input" type="checkbox" checked={rabiesVaccinated} onChange={() => setRabiesVaccinated(!rabiesVaccinated)} />
          <label className="form-check-label">Rabies Vaccinated</label>
        </div>

        <div className="form-check my-2">
          <input className="form-check-input" type="checkbox" checked={trained} onChange={() => setTrained(!trained)} />
          <label className="form-check-label">Trained</label>
        </div>

        <input className="form-control my-2" type="file" accept="image/*" onChange={handleFileChange} />
        {previewUrl && (
          <img src={previewUrl} alt="Preview" style={{ maxWidth: "300px", marginTop: "10px", borderRadius: "8px" }} />
        )}

        <button className="btn btn-primary mt-3" type="submit">Update Pet</button>
        <p className="mt-2">{message}</p>
      </form>
    </div>
  );
}

export default EditPet;
