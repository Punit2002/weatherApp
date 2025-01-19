import React, { useState, useEffect } from "react";
import WeatherTab from "./components/WeatherTab";
import WeatherInfo from "./components/WeatherInfo";
import WeatherSearch from "./components/WeatherSearch";
import GrantLocation from "./components/GrantLocation";
import LoadingScreen from "./components/LoadingScreen";
import { getWeatherFromCoordinates, getWeatherFromCity } from "./utils/weatherUtils";

const App = () => {
  const [userCoordinates, setUserCoordinates] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSearchTabActive, setIsSearchTabActive] = useState(false);

  let API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
  
  const handleLocationSuccess = (position) => {
    console.log("Location success:", position);
    if (position && position.coords) {
      const { latitude, longitude } = position.coords;
      const coordinates = { lat: latitude, lon: longitude };
      setUserCoordinates(coordinates);
      sessionStorage.setItem("user-coordinates", JSON.stringify(coordinates));
      fetchWeatherInfo(coordinates);
    } else {
      console.error("Location coordinates are not available.");
    }
  };

  const handleLocationError = (error) => {
    alert(`Error: ${error.message}`);
    console.error("Geolocation error:", error);
  };

  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleLocationSuccess, handleLocationError);
    } else {
      console.error("Geolocation is not supported by this browser.");
      alert("Geolocation is not supported by this browser.");
    }
  };

  const fetchWeatherInfo = async (coordinates) => {
    setLoading(true);
    try {
      const weather = await getWeatherFromCoordinates(coordinates, API_KEY );
      setWeatherData(weather);
    } catch (error) {
      console.error("Error fetching weather:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherForCity = async (city) => {
    setLoading(true);
    try {
      const weather = await getWeatherFromCity(city, API_KEY );
      setWeatherData(weather);
    } catch (error) {
      console.error("Error fetching weather for city:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTab = (tab) => {
    setIsSearchTabActive(tab === "search");
    if (tab === "user") {
      const savedCoordinates = sessionStorage.getItem("user-coordinates");
      if (savedCoordinates) {
        fetchWeatherInfo(JSON.parse(savedCoordinates));
      }
    }
  };

  useEffect(() => {
    const savedCoordinates = sessionStorage.getItem("user-coordinates");
    console.log("Saved Coordinates:", savedCoordinates); 
    if (savedCoordinates) {
      fetchWeatherInfo(JSON.parse(savedCoordinates));
    }
  }, []);

  return (
    <div className="wrapper">
      <h1>Weather App</h1>
      <WeatherTab activeTab={isSearchTabActive} onTabSwitch={toggleTab} />
      <div className="weather-container">
        {!userCoordinates ? (
          <GrantLocation onGrant={handleLocationRequest} />
        ) : (
          <>
            {loading && <LoadingScreen />}
            {!loading && weatherData && <WeatherInfo weather={weatherData} />}
          </>
        )}
        {isSearchTabActive && <WeatherSearch onSearch={fetchWeatherForCity} />}
      </div>
    </div>
  );
};

export default App;
