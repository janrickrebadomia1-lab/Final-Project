const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // your password
  database: "bloodsync",
});

db.connect((err) => {
  if (err) console.error("DB connection error:", err);
  else console.log("MySQL connected...");
});

// ================= ADMIN LOGIN =================
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;

  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "admin123";

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password required" });
  }

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return res.json({ success: true });
  } else {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// ================= POST BLOOD REQUEST =================
app.post("/api/blood-request", (req, res) => {
  const {
    patientName,
    patientAge,
    patientGender,
    patientEmail,
    patientAddress,
    dateRequested,
    requestedBloodType,
    patientCondition,
    urgency,
    hospital,
    doctorName,
    additionalInfo
  } = req.body;

  if (!patientName || !patientAge || !patientGender || !patientEmail ||
      !patientAddress || !dateRequested || !requestedBloodType ||
      !patientCondition || !urgency || !hospital || !doctorName || !additionalInfo) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const sql = `
    INSERT INTO blood_requests
      (patientName, patientAge, patientGender, patientEmail, patientAddress,
       dateRequested, requestedBloodType, patientCondition,
       urgency, hospital, doctorName, additionalInfo)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      patientName,
      parseInt(patientAge),
      patientGender,
      patientEmail,
      patientAddress,
      dateRequested,
      requestedBloodType,
      patientCondition,
      urgency,
      hospital,
      doctorName,
      additionalInfo
    ],
    (err, result) => {
      if (err) {
        console.error("DB Insert Error:", err);
        return res.status(500).json({ success: false, message: "Database error" });
      }
      res.json({ success: true, message: "Blood request submitted!" });
    }
  );
});

// ================= GET ALL BLOOD REQUESTS =================
app.get("/api/blood-request", (req, res) => {
  const sql = "SELECT * FROM blood_requests ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Database error" });
    res.json(results);
  });
});

// Accept a blood request (add to donors)
app.post("/api/blood-request/accept/:id", (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM blood_requests WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "DB error" });
    if (results.length === 0) return res.status(404).json({ success: false, message: "Request not found" });

    const request = results[0];

    const donorSql = `
      INSERT INTO donors
        (name, age, gender, bloodType, email, hospital)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      donorSql,
      [request.patientName, request.patientAge, request.patientGender, request.requestedBloodType, request.patientEmail, request.hospital],
      (err2) => {
        if (err2) return res.status(500).json({ success: false, message: "DB error adding donor" });

        db.query("DELETE FROM blood_requests WHERE id = ?", [id], (err3) => {
          if (err3) return res.status(500).json({ success: false, message: "DB error deleting request" });
          res.json({ success: true, message: "Request accepted and added to donors" });
        });
      }
    );
  });
});

// Delete a blood request
app.delete("/api/blood-request/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM blood_requests WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ success: false, message: "DB error deleting request" });
    res.json({ success: true, message: "Request deleted" });
  });
});

// Get total donors
app.get("/api/donors", (req, res) => {
  db.query("SELECT COUNT(*) as total FROM donors", (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "DB error" });
    res.json(results[0]);
  });
});

// Start server
app.listen(8080, () => console.log("Server running on http://localhost:8080"));
