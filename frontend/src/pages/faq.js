import "./FormPage.css";

function FAQ() {
  return (
    <div className="form-container">
      <h2>❓ Frequently Asked Questions</h2>
      <div className="faq-item">
        <h4>How do I adopt a pet?</h4>
        <p>Browse pets, login, and contact the shelter through PetConnect.</p>
      </div>
      <div className="faq-item">
        <h4>Can I donate without an account?</h4>
        <p>No, you need to be logged in to donate.</p>
      </div>
      {/* Add more questions as needed */}
    </div>
  );
}

export default FAQ;

  