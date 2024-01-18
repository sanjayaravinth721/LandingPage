import React, { useState, useEffect } from 'react';
import DoctorsAPI from './DoctorsAPI';

interface Doctor {
  id: number;
  name: string;
  label: string;
  expertise: string;
  city: string;
}

function Testimonials({ patientCity }: any) {
  const doctorsPerPage = 3;

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [displayedDoctors, setDisplayedDoctors] = useState<Doctor[]>([]);

  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  useEffect(() => {
    const startIndex = (currentPage - 1) * doctorsPerPage;
    const endIndex = startIndex + doctorsPerPage;
    setDisplayedDoctors(filteredDoctors.slice(startIndex, endIndex));
  }, [currentPage, filteredDoctors]);

  const loadDoctors = () => {
    const doctorsInCity = DoctorsAPI.filter((doctor) => doctor.city === patientCity);
    setFilteredDoctors(doctorsInCity);
  };

  useEffect(() => {
    loadDoctors();
  }, [patientCity]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (page: any) => {
    setCurrentPage(page);
  };

  console.log('filteredDoctors:', filteredDoctors);
  console.log('currentPage:', currentPage);
  console.log('totalPages:', totalPages);

  return (
    <div className="testimonials-container">
      <h2 className="mb-4">Best Available Doctors</h2>      
      {filteredDoctors.length > 0 ? (
        <div className="doctors-list">
          {currentPage > 1 && (
            <button className="prevClickBtn" onClick={handlePrevPage}>
              &#9666;
            </button>
          )}
          {displayedDoctors.map((doctor: any) => (
            <div key={doctor.id} className="doctor-card">
              <img src="images/Doctor_Image.png" alt="Doctor" className="doctor-image" />
              <p className="doctor-name">Name: {doctor.name}</p>
              <p className="doctor-expertise">Expertise: {doctor.expertise}</p>
              <p className="doctor-city">City: {doctor.city}</p>
            </div>
          ))}
          {currentPage < totalPages && (
            <button className="nextClickBtn" onClick={handleNextPage}>
              &#9656;
            </button>
          )}
        </div>
      ) : (
        <p className='no-doctors-message'>
          {filteredDoctors.length === 0 ? 'No doctors available. Please enter a valid city.' : ''}
        </p>
      )}
      {totalPages > 1 && (
        <div className="pagination-dots">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`pagination-dot ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => handlePageClick(index + 1)}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Testimonials;
