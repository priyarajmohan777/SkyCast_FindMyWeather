import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CityInput from "./CityInput";
import WeatherOutput from "./WeatherOutput";
import "./App.css";

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<CityInput />} />
          <Route path="/weather" element={<WeatherOutput />} />
        </Routes>
      </Router>
      <div className="footer">Priya R, 212222040124</div>
    </div>
  );
}

export default App;
