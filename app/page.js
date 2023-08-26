"use client";
import React, { useRef, useState } from "react";

const WeatherForecast = () => {
  const [weatherData, setWeatherData] = useState(null);

  const latRef = useRef();
  const longref = useRef();

  const fetchData = async (e) => {
    e.preventDefault();

    const latitude = latRef.current.value;
    const longitude = longref.current.value;

    console.log(latitude, longitude);

    try {
      const res = await fetch(
        `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`
      );
      const data = await res.json();
      setWeatherData(data.properties.timeseries.splice(0, 30));
      
    } catch (error) {
      console.log("An error occured: ", error);
    }
  };

  

  return (
    <div id="root">
      <h1>Weather Forecast</h1>

      <form onSubmit={fetchData}>
        <label htmlFor="latitude">Latitude</label>
        <input
          type="text"
          name="latitude"
          className="latitude"
          required
          ref={latRef}
        />

        <label htmlFor="longitude">Longitude</label>
        <input
          type="text"
          name="longitude"
          className="longitude"
          required
          ref={longref}
        />

        <button type="submit">Get Forecast</button>
      </form>

        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Temperature (°C)</th>
              <th>Summary</th>
            </tr>
          </thead>
          
            {weatherData?.map((timestamp,index)=>(
              
              <tbody key={index}>
                <tr>
                  <td >{new Date(timestamp.time).toLocaleString()}</td>
                  <td >{timestamp.data.instant.details.air_temperature}</td>
                  <td>{timestamp.data.next_1_hours.summary.symbol_code}</td>
                </tr>
                
                
              </tbody>
              
            ))}
          
        </table>
      
    </div>
  );
};

export default WeatherForecast;
