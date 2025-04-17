import { useState } from "react";
import API from "../services/api";

function Feedback() {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const userId = localStorage.getItem("userId");

  const submit = async () => {
    try {
      await API.post("/feedback", {
        user_id: userId,
        pet_id: 1, // Optional: You can make this dynamic later
        text,
        rating
      });
      alert("Feedback submitted!");
      setText(""); setRating(5);
    } catch (err) {
      console.error(err);
      alert("Failed to submit feedback.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>We'd love your feedback!</h2>
      <textarea
        className="form-control my-2"
        rows={4}
        placeholder="Your thoughts..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select
        className="form-select"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      >
        {[1,2,3,4,5].map(r => (
          <option key={r} value={r}>{r} Star{r > 1 && "s"}</option>
        ))}
      </select>
      <button className="btn btn-primary mt-3" onClick={submit}>Submit</button>
    </div>
  );
}
export default Feedback;
