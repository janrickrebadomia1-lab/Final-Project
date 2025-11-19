import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./BloodReq.css";

const BloodReq = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("http://localhost:8080/api/blood-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Server error");

      setSuccess(true);
      setError("");
      e.target.reset();
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error("Request error:", err);
      setError("Failed to submit request. Please try again.");
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="content-area">
        <Header />

        <div className="form-wrapper">
          <form className="blood-request-form" onSubmit={handleSubmit}>
            <h3>BLOOD REQUEST FORM</h3>

            <h4>PATIENT'S INFORMATION</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input type="text" name="patientName" required />
              </div>
              <div className="form-group">
                <label>Age *</label>
                <input type="number" name="patientAge" min="1" max="120" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Gender *</label>
                <select name="patientGender" required>
                  <option value="" disabled>Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input type="email" name="patientEmail" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Address *</label>
                <input type="text" name="patientAddress" required />
              </div>
              <div className="form-group">
                <label>Date Requested *</label>
                <input type="date" name="dateRequested" required />
              </div>
            </div>

            <h4>MEDICAL INFORMATION</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Blood Type Needed *</label>
                <select name="requestedBloodType" required>
                  <option value="" disabled>Select blood type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Condition/Diagnosis *</label>
                <input type="text" name="patientCondition" required />
              </div>
              <div className="form-group">
                <label>Urgency Level *</label>
                <select name="urgency" required>
                  <option value="" disabled>Select urgency</option>
                  <option value="emergency">Emergency</option>
                  <option value="urgent">Urgent</option>
                  <option value="regular">Regular</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Hospital/Facility *</label>
                <input type="text" name="hospital" required />
              </div>
              <div className="form-group">
                <label>Doctor's Name *</label>
                <input type="text" name="doctorName" required />
              </div>
            </div>

            <div className="form-group">
              <label>Additional Notes *</label>
              <textarea name="additionalInfo" rows="4" required></textarea>
            </div>

            <button type="submit" className="submit-btn">Submit Blood Request</button>

            {success && <p className="success-message">✓ Request submitted successfully!</p>}
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default BloodReq;
