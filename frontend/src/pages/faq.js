import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function FAQ() {
  const navigate = useNavigate();

  const faqList = [
    {
      question: "How do I adopt a pet?",
      answer: "Register, browse available pets, and contact the shelter via PetConnect.",
    },
    {
      question: "Can I donate without an account?",
      answer: "No, you need to be logged in to make donations.",
    },
    {
      question: "Who can list pets on PetConnect?",
      answer: "Only users with the shelter role can add or manage pet listings.",
    },
    {
      question: "Is PetConnect free to use?",
      answer: "Yes! It's completely free — made for students, shelters, and pet lovers.",
    },
  ];

  return (
    <div className="form-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <h2>❓ Frequently Asked Questions</h2>
      {faqList.map((faq, index) => (
        <div key={index} style={{ marginBottom: "1rem" }}>
          <h4 style={{ color: "#facc15" }}>{faq.question}</h4>
          <p style={{ color: "#ddd" }}>{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}

export default FAQ;

  