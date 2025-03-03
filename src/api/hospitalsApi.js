
const API_URL = 'https://hospital-mngmt-be.onrender.com/api';
export const getHospitals = async () => {
  try {
    const response = await fetch(`${API_URL}/hospitals`);
    if (!response.ok) {
      throw new Error('Failed to fetch hospitals');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    throw error;
  }
};

export const getHospitalsByCity = async (city) => {
  try {
    const response = await fetch(`${API_URL}/hospitals/city/${city}`);
    if (!response.ok) {
      throw new Error('Failed to fetch hospitals for this city');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching hospitals by city:', error);
    throw error;
  }
};

export const getHospitalById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/hospitals/${id}`);
    if (!response.ok) {
      throw new Error('Hospital not found');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching hospital:', error);
    throw error;
  }
};

export const addHospital = async (hospitalData) => {
  try {
    const response = await fetch(`${API_URL}/hospitals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hospitalData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add hospital');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error adding hospital:', error);
    throw error;
  }
};

export const updateHospital = async (id, hospitalData) => {
  try {
    const response = await fetch(`${API_URL}/hospitals/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hospitalData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update hospital');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating hospital:', error);
    throw error;
  }
};

export const deleteHospital = async (id) => {
  try {
    const response = await fetch(`${API_URL}/hospitals/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete hospital');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting hospital:', error);
    throw error;
  }
};