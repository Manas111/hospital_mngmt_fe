import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HospitalForm from './Components/HospitalForm.jsx';
import HospitalsList from './components/HospitalsList';
import HospitalDetails from './components/HospitalDetails';
import EditHospital from './Components/EditHospital.jsx'
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <h1>Hospital Management System</h1>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/add-hospital">Add Hospital</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HospitalsList />} />
          <Route path="/add-hospital" element={<HospitalForm />} />
          <Route path="/hospitals/:id" element={<HospitalDetails />} />
          <Route path="/edit-hospital/:id" element={<EditHospital />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;