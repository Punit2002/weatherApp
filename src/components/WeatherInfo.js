import React from "react";

const WeatherInfo = ({ weather }) => {
  const {
    name,
    sys: { country },
    weather: [{ description, icon }],
    main: { temp, humidity },
    wind: { speed },
    clouds: { all: cloudiness },
  } = weather;

  return (
    <div className="user-info-container active">
      <div className="name">
        <p>{name}</p>
        <img src={`https://flagcdn.com/144x108/${country.toLowerCase()}.png`} alt="Country Flag" />
      </div>
      <p>{description}</p>
      <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="Weather Icon" />
      <p>{temp} °C</p>
      <div className="parameter-container">
        <div className="parameter">
          <img src="/assets/wind.png" alt="Wind Speed" />
          <p>Wind Speed</p>
          <p>{speed} m/s</p>
        </div>
        <div className="parameter">
          <img src="/assets/humidity.png" alt="Humidity" />
          <p>Humidity</p>
          <p>{humidity}%</p>
        </div>
        <div className="parameter">
          <img src="/assets/cloud.png" alt="Cloudiness" />
          <p>Clouds</p>
          <p>{cloudiness}%</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
