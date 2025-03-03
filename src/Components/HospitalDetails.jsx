// components/HospitalDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getHospitalById } from '../api/hospitalsApi';
import './hospital.css';

const HospitalDetails = () => {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHospitalDetails = async () => {
      try {
        const data = await getHospitalById(id);
        setHospital(data);
        setIsLoading(false);
      } catch (error) {
        setError('Failed to fetch hospital details');
        setIsLoading(false);
        console.error('Error fetching hospital details:', error);
      }
    };

    fetchHospitalDetails();
  }, [id]);

  if (isLoading) return <div className="loading">Loading hospital details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!hospital) return <div className="not-found">Hospital not found</div>;

  return (
    <div className="hospital-details-container">
      <div className="details-header">
        <h2>{hospital.name}</h2>
        <div className="header-actions">
          <Link to={`/edit-hospital/${hospital._id}`} className="edit-button">
            Edit Hospital
          </Link>
          <Link to="/" className="back-button">
            Back to List
          </Link>
        </div>
      </div>

      <div className="details-content">
        <div className="details-main">
          <div className="details-image">
            {hospital.imageUrl ? (
              <img src={hospital.imageUrl} alt={hospital.name} />
            ) : (
              <div className="placeholder-image">No Image Available</div>
            )}
          </div>
          
          <div className="details-info">
            <div className="info-item">
              <span className="info-label">City:</span>
              <span className="info-value">{hospital.city}</span>
            </div>
            
            <div className="info-item">
              <span className="info-label">Rating:</span>
              <span className="info-value">{hospital.rating} / 5</span>
            </div>
            
            <div className="info-item">
              <span className="info-label">Doctors:</span>
              <span className="info-value">{hospital.doctorsCount}</span>
            </div>
            
            <div className="info-item">
              <span className="info-label">Departments:</span>
              <span className="info-value">{hospital.departmentsCount}</span>
            </div>
          </div>
        </div>
        
        <div className="details-specialities">
          <h3>Specialities</h3>
          {hospital.specialities && hospital.specialities.length > 0 ? (
            <ul>
              {hospital.specialities.map(speciality => (
                <li key={speciality}>{speciality}</li>
              ))}
            </ul>
          ) : (
            <p>No specialities listed</p>
          )}
        </div>
        
        <div className="details-description">
          <h3>Description</h3>
          {hospital.description ? (
            <p>{hospital.description}</p>
          ) : (
            <p>No description available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalDetails;