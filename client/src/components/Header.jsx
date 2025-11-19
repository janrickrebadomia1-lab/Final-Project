import React from 'react'
import bloodsynclogo from '../assets/drop.jpg'

function Header() {
  return (
    <div>
        <header>
            <img src={bloodsynclogo} alt="BloodSync Logo" className="logo" />
            <h2>BLOODSYNC MANAGEMENT SYSTEM</h2>
        </header>
    </div>
  )
}

export default Header
