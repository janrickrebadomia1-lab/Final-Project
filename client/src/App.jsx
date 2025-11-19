import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserDashboard from './pages/UserDashboard';
import BloodReq from './pages/users/BloodReq';
import About from './pages/users/About'; // import the About page
import AdminDashboard from './pages/admin/AdminDashboard';
import Login from './pages/admin/Login'
import './App.css';

function App() {  
    
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserDashboard />} />
        <Route path="/bloodreq" element={<BloodReq />} />
        <Route path="/about" element={<About />} /> {/* About route */}
        <Route path="/admindashboard" element={<AdminDashboard/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
