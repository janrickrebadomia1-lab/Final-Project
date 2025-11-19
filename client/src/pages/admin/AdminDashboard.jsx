import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import axios from "axios";
import bloodsynclogo from '../../assets/drop.jpg';
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [totalDonors, setTotalDonors] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/blood-request");
      setRequests(res.data);
    } catch (err) {
      setError("Failed to fetch blood requests");
      console.error(err);
    }
  };

  const fetchTotalDonors = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/donors");
      setTotalDonors(res.data.total || 0);
    } catch (err) {
      setError("Failed to fetch total donors");
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchRequests();
      await fetchTotalDonors();
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleAccept = async (id) => {
    try {
      await axios.post(`http://localhost:8080/api/blood-request/accept/${id}`);
      await fetchRequests();
      await fetchTotalDonors();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/blood-request/${id}`);
      await fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-dashboard-container">
      <AdminSidebar />
      <div className="main-content">
        <header>
          <img src={bloodsynclogo} alt="BloodSync Logo" className="logo" />
          <h2>BLOODSYNC MANAGEMENT SYSTEM</h2>
        </header>

        <div className="dashboard-cards">
          <div className="card">
            <h3>Total Donors</h3>
            <p>{totalDonors}</p>
          </div>
          <div className="card">
            <h3>Pending Requests</h3>
            <p>{requests.length}</p>
          </div>
        </div>

        <div className="data-section">
          <h2>BLOOD REQUESTS</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>PATIENT'S NAME</th>
                  <th>AGE</th>
                  <th>GENDER</th>
                  <th>EMAIL</th>
                  <th>ADDRESS</th>
                  <th>DATE FILLED</th>
                  <th>BLOOD TYPE</th>
                  <th>CONDITION</th>
                  <th>URGENCY</th>
                  <th>HOSPITAL</th>
                  <th>DOCTOR'S NAME</th>
                  <th>NOTES</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((row) => (
                  <tr key={row.id}>
                    <td>{row.patientName}</td>
                    <td>{row.patientAge}</td>
                    <td>{row.patientGender}</td>
                    <td>{row.patientEmail}</td>
                    <td>{row.patientAddress}</td>
                    <td>{new Date(row.dateRequested).toLocaleDateString()}</td>
                    <td>{row.requestedBloodType}</td>
                    <td>{row.patientCondition}</td>
                    <td>{row.urgency}</td>
                    <td>{row.hospital}</td>
                    <td>{row.doctorName}</td>
                    <td>{row.additionalInfo}</td>
                    <td>
                      <button className="accept-btn" onClick={() => handleAccept(row.id)}>Accept</button>
                      <button className="delete-btn" onClick={() => handleDelete(row.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <footer>
            <p>© 2025 BloodSync. All Rights Reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
