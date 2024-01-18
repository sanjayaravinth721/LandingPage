import React, { useEffect, useState } from "react";
import DoctorsAPI from "./DoctorsAPI";

const ConsultationBookingForm = ({ onCityChange }: any) => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    age: "",
    city:  "",
    company: "",
    chiefComplaints: "",
    previousExperience: "",
  });

  const [submittedForms, setSubmittedForms] = useState<any[]>([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmittedForms((prevForms) => [...prevForms, formData]);
    setIsFormSubmitted(true);

    setTimeout(() => {
      setIsFormSubmitted(false);
    }, 3000);

    setFormData({
      name: "",
      phoneNumber: "",
      age: "",
      city: "",
      company: "",
      chiefComplaints: "",
      previousExperience: "",
    });
  };

  function handleChange(event: any) {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === "city") {
      onCityChange(value);
    }
  }

  useEffect(() => {
    let urlCity = window.location.pathname.split('/').pop();
    urlCity = urlCity?.replace('%20', ' ');
  
    if (urlCity) {
      const newCity = urlCity;
  
      const isCityFoundInDoctorsAPI = DoctorsAPI.some(doctor => doctor.city === newCity);
  
      if (!isCityFoundInDoctorsAPI) {
        window.location.href = "/";
      } else if (newCity !== formData.city) {
        setFormData((prevData: any) => ({ ...prevData, city: newCity }));
      }
    }
  }, []);
  
  
  


  return (
    <div className="consultation-form-container container">
      <h2 className="mb-2 display-5 fw-bold text-secondary">
                Consultation Booking Form
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number:
          </label>
          <input
            type="tel"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age:
          </label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            City:
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="company" className="form-label">
            Company:
          </label>
          <input
            type="text"
            className="form-control"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="chiefComplaints" className="form-label">
            Chief Complaints:
          </label>
          <textarea
            className="form-control"
            id="chiefComplaints"
            name="chiefComplaints"
            value={formData.chiefComplaints}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <div
            style={{
              display: parseInt(formData.age, 10) < 40 ? "none" : "block",
            }}
          >
            <label htmlFor="previousExperience" className="form-label">
              Previous Experience with Physiotherapy:
            </label>
            <textarea
              className="form-control"
              id="previousExperience"
              name="previousExperience"
              value={formData.previousExperience}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
        {isFormSubmitted && (
          <div className="alert alert-success" role="alert">
            Form submitted successfully!
          </div>
        )}
      </form>
    </div>
  );
};

export default ConsultationBookingForm;
