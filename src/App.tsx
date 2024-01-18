import "./App.css";
import HeroImage from "./sections/HeroImage";
import ConsultationBookingForm from "./sections/ConsultationBookingForm";
import Testimonials from "./sections/Testimonials";
import { useEffect, useState } from "react";

function App() {
  const [patientCity, setPatientCity] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    let urlCity = window.location.pathname.split('/').pop();

    urlCity = urlCity?.replace('%20', ' ');

    console.log(urlCity);

    if (urlCity && urlCity !== patientCity) {
      setPatientCity(urlCity);
    }
    }, [patientCity]);

  const handleCityChange = (city: any) => {
    setPatientCity(city);
  };

  const toggleDarkTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div
      className={`landing-page-container ${isDarkTheme ? "dark-theme" : ""}`}
    >
      <div className="dark-theme-toggle" onClick={toggleDarkTheme}>
        <div className={`slider ${isDarkTheme ? "on" : "off"}`} />
      </div>
      
      <HeroImage />
      <ConsultationBookingForm onCityChange={handleCityChange} initialCity={patientCity} />
      <Testimonials patientCity={patientCity} />
    </div>
  );
}

export default App;
