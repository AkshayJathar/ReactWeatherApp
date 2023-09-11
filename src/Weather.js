import React, { useState } from "react";
import "../src/weather.css";

const Weather = () => {
  const REACT_APP_API_KEY = "89fc080661889a0969f9f1bdfebb5dd7";
  const [name, setName] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null); // Add error state

  // Function to handle the search button click
  const handleSearchClick = () => {
    if (name.trim() !== "") {
      setError(null); // Clear any previous error messages

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${REACT_APP_API_KEY}&units=metric`
      )
        .then((response) => {
          if (!response.ok) {
            // Handle the case where the response is not OK (e.g., 404)
            throw new Error("City not found");
          }
          return response.json();
        })
        .then((result) => {
          setData(result);
          console.log(result);
        })
        .catch((error) => {
          setError("City not found"); // Set the error message
          console.error("Error fetching weather data:", error);
        });
    }
  };

  return (
    <>
      <div className="weatherbox">
        <input
          type="text"
          className="input"
          onChange={(e) => setName(e.target.value)}
        />
        <button className="button" onClick={handleSearchClick}>
          Search
        </button>
        <br />
        <img
          className="img2"
          src="https://cdn.pixabay.com/photo/2021/07/27/10/23/cloudy-6496471_1280.png"
          alt=""
        />
        {error && <p>{error}</p>} {/* Display the error message */}
        {data && !error && (
          <>
            <h1>Location -{data.name}</h1>
            <h1>Temp -{data.main.temp}&deg;C</h1>
            <h1>Humidity -{data.main.humidity}%</h1>
            <h1>Date - {new Date(data.dt * 1000).toLocaleDateString()}</h1>
          </>
        )}
      </div>
    </>
  );
};

export default Weather;
