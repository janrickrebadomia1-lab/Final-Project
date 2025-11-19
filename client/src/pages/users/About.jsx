import React from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './About.css';

const About = () => {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="content-area">
        <Header />

        <div className="about-section">
          <div className="about-card">
            <h3>System Profile</h3>
            <p>
              <strong>BloodSync</strong> is a blood bank management system designed to improve how blood is donated, requested, and tracked. 
              It offers a user-friendly platform for both donors and recipients to ensure timely access to safe and sufficient blood supply.
            </p>
          </div>

          <div className="about-card">
            <h3>Purpose of the System</h3>
            <p>
              The main goal of BloodSync is to make blood donation more efficient through digital tracking and donor scheduling. 
              It ensures every drop counts by reducing waste and shortages.
            </p>
          </div>

          <div className="about-card">
            <h3>System Features & Information</h3>
            <ul>
              <li><i className="fas fa-check-circle"></i> User-friendly blood donation form with health checks</li>
              <li><i className="fas fa-check-circle"></i> Blood request system with confirmation emails</li>
              <li><i className="fas fa-check-circle"></i> Smart scheduling and reminders</li>
            </ul>
          </div>

          <div className="about-card">
            <h3>Contact Information</h3>
            <ul>
              <li><i className="fas fa-envelope"></i> Email: support@bloodsync.org</li>
              <li><i className="fas fa-phone-alt"></i> Phone: +63 912 345 6789</li>
              <li><i className="fas fa-map-marker-alt"></i> Address: San Carlos City, Negros Occidental, Philippines</li>
            </ul>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default About;
