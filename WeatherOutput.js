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
