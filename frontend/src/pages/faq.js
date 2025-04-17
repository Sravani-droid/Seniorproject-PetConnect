function FAQ() {
    const faqs = [
      { question: "How do I adopt a pet?", answer: "Register, browse pets, and contact the shelter." },
      { question: "Can I post pets?", answer: "Only shelters can post adoptable pets." },
      { question: "Is PetConnect free?", answer: "Yes! It's built for educational purposes." }
    ];
  
    return (
      <div className="container mt-4">
        <h2>Frequently Asked Questions</h2>
        <ul className="list-group">
          {faqs.map((faq, i) => (
            <li key={i} className="list-group-item">
              <strong>{faq.question}</strong><br />
              {faq.answer}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  export default FAQ;
  