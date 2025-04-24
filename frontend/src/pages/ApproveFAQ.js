import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Dashboard.css";

function ApproveFAQ() {
  const [pendingFaqs, setPendingFaqs] = useState([]);

  useEffect(() => {
    API.get("/pending_faqs")
      .then((res) => setPendingFaqs(res.data))
      .catch((err) => console.error("Failed to load FAQs", err));
  }, []);

  const approveFAQ = async (id) => {
    try {
      await API.post(`/approve_faq/${id}`);
      setPendingFaqs(pendingFaqs.filter(faq => faq.id !== id));
    } catch (err) {
      console.error("Approval error:", err);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>📋 Approve FAQs</h2>
      {pendingFaqs.length ? (
        pendingFaqs.map((faq) => (
          <div key={faq.id} className="pet-card">
            <div className="pet-info">
              <p>{faq.question}</p>
              <button className="auth-btn" onClick={() => approveFAQ(faq.id)}>Approve</button>
            </div>
          </div>
        ))
      ) : (
        <p>No pending questions.</p>
      )}
    </div>
  );
}

export default ApproveFAQ;