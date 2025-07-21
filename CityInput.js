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
