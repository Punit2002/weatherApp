export const getWeatherFromCoordinates = async (coordinates, apiKey) => {
    const { lat, lon } = coordinates;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch weather data.");
    }
    return await response.json();
  };
  
  export const getWeatherFromCity = async (city, apiKey) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch weather data.");
    }
    return await response.json();
  };
  