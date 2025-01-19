import React, { useState } from "react";

const WeatherSearch = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      onSearch(city);
      setCity("");
    }
  };

  return (
    <form className="form-container active" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for City..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="btn" type="submit">
        <img src="./assets/search.png" alt="Search Icon" width="20" height="20" />
      </button>
    </form>
  );
};

export default WeatherSearch;
