import React, { useState, useEffect } from "react";
import "../css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStreetView } from "@fortawesome/free-solid-svg-icons";

const Tempapp = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("nagpur");

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=8d0045cdbd199873cb0dcbf06cf709fa`;
        const response = await fetch(url); //Sends a GET request to the API endpoint
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
          //throws an error with the HTTP status code.
        }
        const resJson = await response.json();  //convert to json
        const tempInCelsius = (kelvin) => (kelvin - 273.15).toFixed(2);  //Kelvin to Celsius
        setCity({
          temp: tempInCelsius(resJson.main.temp),
          //main property of the JSON response contains temperature-related data, including:
          temp_min: tempInCelsius(resJson.main.temp_min),
          temp_max: tempInCelsius(resJson.main.temp_max),
        });
      } catch (error) {
        console.error("Fetch error:", error);
        setCity(null);
      }
    };
    fetchApi(); //called to execute the API call whenever the search state changes.
  }, [search]); //search state changes, the useEffect hook runs 

  return (
    <>
      <div className="cloud cloud1"></div>
      <div className="cloud cloud4"></div>
      <div className="box">
        <div className="inputData">
          <input
            type="search"
            className="inputFeild"
            placeholder="Enter city name"
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        {!city ? (
          <p>No data found</p>
        ) : (
          <div>
            <div className="info">
              <h2 className="Location">
                <FontAwesomeIcon icon={faStreetView} /> {search}
              </h2>
              <h1 className="tmp">{city.temp}°C</h1>
              <h3 className="tempmin_max">
                Min: {city.temp_min}°C | Max: {city.temp_max}°C
              </h3>
            </div>
            <div className="wave-one"></div>
            <div className="wave-two"></div>
            <div className="wave-three"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default Tempapp;
