import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BagImg from '../../assets/bag.jpg';
import './Card.css';

function Home() {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(null);

  const bloodTypes = [
    { type: 'A+', ml: '450ml', desc: 'Type A+ is the universal plasma donor, compatible with A, AB, O, and B types. It is rare and valuable.' },
    { type: 'A-', ml: '450ml', desc: 'Type A- is compatible with A-, A+, AB-, and AB+ types. It is a rare blood type.' },
    { type: 'B+', ml: '450ml', desc: 'Type B+ can be transfused to B+ and AB+ blood types. It is common and valuable.' },
    { type: 'B-', ml: '450ml', desc: 'Type B- is a rare blood type, compatible with B-, B+, AB-, and AB+.' },
    { type: 'AB+', ml: '450ml', desc: 'Type AB+ is the universal plasma recipient, compatible with all other blood types.' },
    { type: 'AB-', ml: '450ml', desc: 'Type AB- can donate plasma to any blood type. It is compatible with AB-, AB+, A-, and A+.' },
    { type: 'O+', ml: '450ml', desc: 'Type O+ is compatible with all positive blood types, making it highly needed.' },
    { type: 'O-', ml: '450ml', desc: 'Type O- is the universal donor, compatible with all blood types in emergencies.' },
  ];

  const handleCardClick = (type) => {
    setActiveCard(activeCard === type ? null : type);
  };

  return (
    <section className="cards">
      {bloodTypes.map((bt) => (
        <div
          className={`card ${activeCard === bt.type ? 'active' : ''}`}
          key={bt.type}
          onClick={() => handleCardClick(bt.type)}
        >
          <img src={BagImg} alt={`${bt.type} blood bag`} />
          <div className="card-label">
            <h5>{bt.type}</h5>
            <p>{bt.ml}</p>
          </div>
          <div className="card-desc">{bt.desc}</div>
        </div>
      ))}
    </section>
  );
}

export default Home;
