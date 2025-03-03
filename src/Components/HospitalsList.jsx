// components/HospitalsList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHospitals, deleteHospital } from '../api/hospitalsApi';
import './hospital.css';
const HospitalsList = () => {
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const data = await getHospitals();
        setHospitals(data);
        setFilteredHospitals(data);
        
        // Extract unique cities
        const uniqueCities = [...new Set(data.map(hospital => hospital.city))];
        setCities(uniqueCities);
        
        setIsLoading(false);
      } catch (error) {
        setError('Failed to fetch hospitals');
        setIsLoading(false);
        console.error('Error fetching hospitals:', error);
      }
    };

    fetchHospitals();
  }, []);

  useEffect(() => {
    if (selectedCity) {
      setFilteredHospitals(
        hospitals.filter(hospital => 
          hospital.city.toLowerCase() === selectedCity.toLowerCase()
        )
      );
    } else {
      setFilteredHospitals(hospitals);
    }
  }, [selectedCity, hospitals]);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleDeleteHospital = async (id) => {
    if (window.confirm('Are you sure you want to delete this hospital?')) {
      try {
        await deleteHospital(id);
        setHospitals(hospitals.filter(hospital => hospital._id !== id));
      } catch (error) {
        setError('Failed to delete hospital');
        console.error('Error deleting hospital:', error);
      }
    }
  };

  if (isLoading) return <div className="loading">Loading hospitals...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="hospitals-list-container">
      <h2>Hospitals Directory</h2>
      
      <div className="filter-container">
        <label htmlFor="cityFilter">Filter by City:</label>
        <select
          id="cityFilter"
          value={selectedCity}
          onChange={handleCityChange}
        >
          <option value="">All Cities</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
      
      {filteredHospitals.length === 0 ? (
        <div className="no-hospitals">
          {selectedCity 
            ? `No hospitals found in ${selectedCity}` 
            : 'No hospitals available'}
        </div>
      ) : (
        <div className="hospitals-grid">
          {filteredHospitals.map(hospital => (
            <div key={hospital._id} className="hospital-card">
              <div className="hospital-image">
                {hospital.imageUrl ? (
                  <img src={hospital.imageUrl} alt={hospital.name} />
                ) : (
                  <div className="placeholder-image">No Image</div>
                )}
              </div>
              <div className="hospital-info">
                <h3>{hospital.name}</h3>
                <p className="hospital-city">{hospital.city}</p>
                <div className="hospital-rating">
                  Rating: <span>{hospital.rating}</span> / 5
                </div>
                <div className="hospital-specialities">
                  {hospital.specialities.length > 0 ? (
                    <p>Specialities: {hospital.specialities.join(', ')}</p>
                  ) : (
                    <p>No specialities listed</p>
                  )}
                </div>
                <div className="hospital-actions">
                  <Link to={`/hospitals/${hospital._id}`} className="view-button">
                    View Details
                  </Link>
                  <Link to={`/edit-hospital/${hospital._id}`} className="edit-button">
                    Edit
                  </Link>
                  <button 
                    className="delete-button" 
                    onClick={() => handleDeleteHospital(hospital._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HospitalsList;