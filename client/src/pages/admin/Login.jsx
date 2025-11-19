import React, { useState } from "react";
import axios from "axios";
import "./login.css";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:8080/api/admin/login", {
        username,
        password,
      });

      if (response.data.success) {
        setMessage("Login successful! Redirecting...");
        // small delay before redirect
        setTimeout(() => {
          window.location.href = "/admindashboard";
        }, 1000);
      } else {
        setMessage("Access denied! Only admin can login.");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setMessage("Invalid username or password.");
      } else {
        setMessage("Server error. Try again later.");
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="sign-in">
        <form onSubmit={handleLogin}>
          <h1>LOGIN</h1>
          <p className={message ? "fade-in" : ""}>{message}</p>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>

      <div className="toggle-container">
        <div className="toggle-panel">
          <h1>BloodSync Management System</h1>
        </div>
      </div>
    </div>
  );
}
