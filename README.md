# SkyCast - Find My Weather
## Date: 21-07-25
## Objective:
To build a responsive single-page application using React that allows users to enter a city name and retrieve real-time weather information using the OpenWeatherMap API. This project demonstrates the use of Axios for API calls, React Router for navigation, React Hooks for state management, controlled components with validation, and basic styling with CSS.
## Tasks:

#### 1. Project Setup
Initialize React app.

Install necessary dependencies: npm install axios react-router-dom

#### 2. Routing
Set up BrowserRouter in App.js.

Create two routes:

/ – Home page with input form.

/weather – Page to display weather results.

#### 3. Home Page (City Input)
Create a controlled input field for the city name.

Add validation to ensure the input is not empty.

On valid form submission, navigate to /weather and store the city name.

#### 4. Weather Page (API Integration)
Use Axios to fetch data from the OpenWeatherMap API using the city name.

Show temperature, humidity, wind speed, and weather condition.

Convert and display temperature in both Celsius and Fahrenheit using useMemo.

#### 5. React Hooks
Use useState for managing city, weather data, and loading state.

Use useEffect to trigger the Axios call on page load.

Use useCallback to optimize form submit handler.

Use useMemo for temperature conversion logic.

#### 6. UI Styling (CSS)
Create a responsive and clean layout using CSS.

Style form, buttons, weather display cards, and navigation links.

## Programs:


### CityInput.js:
```
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function CityInput() {

  const [enteredCity , setEnteredCity ] = useState("");
  const [errorCity , setErrorCity ] = useState(false);
  const goTo = useNavigate();

  const handleSubmitCity = useCallback((e)=>{
    e.preventDefault();

    if(enteredCity.trim() === ""){
      setErrorCity(true)
    }
    else{
      setErrorCity(false)
      goTo("/weather", { state: { userCity : enteredCity } });
    }
  },[enteredCity , goTo])

  return (
    <div className="mainBox">
      <h2>SkyCast - Find My Weather</h2>

      <form onSubmit={handleSubmitCity}>
        <input
          type="text"
          placeholder="Enter city name"
          value={enteredCity}
          onChange={(e)=>setEnteredCity(e.target.value)}
        />
        <button type="submit">Check Weather</button>
      </form>

      {errorCity && <p>City name is required!</p>}

    </div>
  );
}

export default CityInput;

```
### WeatherOutput.js:
```
import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function WeatherOutput() {

  const { state } = useLocation();
  const cityNow = state?.userCity;
  const goBack = useNavigate();

  const [climate, setClimate] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(true);

  useEffect(()=>{
    if(!cityNow){
      goBack("/");
      return;
    }

    const getWeatherData = async () => {
      try{
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityNow}&appid=2f07def66e4adafa624f927461efa78c&units=metric`);
        setClimate(response.data);
        setLoadingWeather(false);
      }
      catch(err){
        console.log("Weather API error", err);
        setLoadingWeather(false);
      }
    }

    getWeatherData();
  },[cityNow, goBack])


  const tempCelsius = useMemo(()=>{
    return climate ? (climate.main.temp - 273.15).toFixed(2) : "";
  },[climate]);

  const tempFahrenheit = useMemo(()=>{
    return climate ? ((climate.main.temp - 273.15) * 9/5 + 32).toFixed(2) : "";
  },[climate]);

  if(loadingWeather){
    return <p>Loading weather data...</p>
  }

  if(!climate){
    return <p>Weather info not available.</p>
  }

  return (
    <div className="infoBox">
      <h3>Weather in {cityNow}</h3>

      <div className="card">
        <p><b>Temperature:</b> {tempCelsius} °C / {tempFahrenheit} °F</p>
        <p><b>Humidity:</b> {climate.main.humidity} %</p>
        <p><b>Wind Speed:</b> {climate.wind.speed} m/s</p>
        <p><b>Condition:</b> {climate.weather[0].description}</p>
      </div>

      <button onClick={()=>goBack("/")}>Go Back</button>
    </div>
  );
}

export default WeatherOutput;
```

### App.js:
```
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
```

### App.css:
```
.mainBox {
  text-align: center;
  background-color: #fff3e0;
  border: 2px solid #ffcc80;
  width: 500px;
  margin: 60px auto;
  padding: 30px;
  border-radius: 10px;
}

.infoBox {
  text-align: center;
  background-color: #f3e5f5;
  border: 2px solid #ce93d8;
  width: 500px;
  margin: 60px auto;
  padding: 30px;
  border-radius: 10px;
}

input {
  padding: 10px;
  font-size: 16px;
  width: 70%;
  border-radius: 5px;
  border: 1px solid #999;
}

button {
  margin-top: 15px;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  background-color: #ffab91;
  cursor: pointer;
}

.card {
  text-align: left;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  margin-top: 20px;
  border-radius: 8px;
}

.footer {
  position: absolute;
  font-weight: bold;
  bottom: 10px;
  left: 10px;
  color: #555;
}
```
## Output:

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/67bd7dfd-a10a-4574-816a-804710edfd1b" />


<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/90ff8d75-104d-4208-b007-741e969eb6d1" />


## Result:
A responsive single-page application using React that allows users to enter a city name and retrieve real-time weather information using the OpenWeatherMap API has been built successfully. 
