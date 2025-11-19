import React from "react";
import bloodsynclogo from '../assets/drop.jpg'


export default function AdminSidebar() {
  return (
    <div className="sidebar admin-sidebar">
      <div className="logo-img">
        <img src={bloodsynclogo} alt="Admin Logo" />
      </div>
      <ul>
        <li>
          <a href="/admindashboard">
            <i className="fas fa-tachometer-alt"></i> <span>Admin Panel</span>
          </a>
        </li>
        <li>
          <a href="/login" className="sign-out">
            <i className="fas fa-sign-out-alt"></i> <span>Sign Out</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
