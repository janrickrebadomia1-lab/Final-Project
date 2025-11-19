import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from './users/Home';
import BloodReq from './users/BloodReq';  

function UserDashboard() {
  // Set initial tab to 0 (Home)
  const [activeTab, setActiveTab] = useState(0);

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <Home />;
      case 1:
        return <BloodReq />;
      default:
        return <Home />;
    }
  };

  return (
    <div className='main-content'>
      {/* Pass setActiveTab to Sidebar so it can change tabs */}
      <Sidebar setActiveTab={setActiveTab} />
      <div className='content'>
        <Header />
        {renderContent()}
        <Footer />
      </div>
    </div>
  );
}

export default UserDashboard;
