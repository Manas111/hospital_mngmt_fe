// components/HospitalForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addHospital } from '../api/hospitalsApi';
import './hospital.css';
const HospitalForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    imageUrl: '',
    specialities: [],
    rating: 0,
    description: '',
    doctorsCount: 0,
    departmentsCount: 0
  });
  
  const [error, setError] = useState('');

  const specialitiesList = [
    'Cardiology', 'Neurology', 'Oncology', 'Orthopedics', 
    'Pediatrics', 'Dermatology', 'Ophthalmology', 'Gynecology'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSpecialityChange = (speciality) => {
    if (formData.specialities.includes(speciality)) {
      setFormData({
        ...formData,
        specialities: formData.specialities.filter(item => item !== speciality)
      });
    } else {
      setFormData({
        ...formData,
        specialities: [...formData.specialities, speciality]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.city) {
      setError('Name and City are required fields');
      return;
    }
    
    try {
      await addHospital(formData);
      navigate('/');
    } catch (error) {
      setError('Failed to add hospital. Please try again.');
      console.error('Error adding hospital:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Hospital</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Hospital Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City *</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Specialities</label>
          <div className="specialities-container">
            {specialitiesList.map(speciality => (
              <div key={speciality} className="speciality-item">
                <input
                  type="checkbox"
                  id={speciality}
                  checked={formData.specialities.includes(speciality)}
                  onChange={() => handleSpecialityChange(speciality)}
                />
                <label htmlFor={speciality}>{speciality}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating (0-5)</label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="0"
            max="5"
            step="0.1"
            value={formData.rating}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="doctorsCount">Number of Doctors</label>
          <input
            type="number"
            id="doctorsCount"
            name="doctorsCount"
            min="0"
            value={formData.doctorsCount}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="departmentsCount">Number of Departments</label>
          <input
            type="number"
            id="departmentsCount"
            name="departmentsCount"
            min="0"
            value={formData.departmentsCount}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-button">Add Hospital</button>
      </form>
    </div>
  );
};

export default HospitalForm;