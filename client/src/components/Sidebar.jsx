import React from 'react';
import { NavLink } from 'react-router-dom';
import bloodsynclogo from '../assets/drop.jpg';

function Sidebar() {
  const menuItems = [
    { label: 'Home', to: '/' },
    { label: 'Request Form', to: '/bloodreq' },
    { label: 'About Us', to: '/about' },
  ];

  return (
    <div className="sidebar">
      <div className="logo-img">
        <img src={bloodsynclogo} alt="BloodSync" />
      </div>

      <ul>
        {menuItems.map((item, idx) => (
          <li key={idx}>
            <NavLink
              to={item.to}
              className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
