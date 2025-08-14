const input = document.querySelector(".input");
const searchButton = document.querySelector(".search");
const output = document.querySelector(".output");

async function fetchWeather(city) {
  const url = `http://localhost:3000/weather?city=${encodeURIComponent(city)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Error");
  }
  const data = await response.json();
  return data; 
}

searchButton.addEventListener("click", async () => {
  const city = input.value.trim();
  if (!city) {
    output.textContent = "Please add the Name of the City!";
    return;
  }

  output.textContent = "Loading...";

  try {
    const weatherData = await fetchWeather(city);
    output.textContent = `In ${city} it is ${weatherData.temperature}°C with ${weatherData.condition}.`;
  } catch (error) {
    output.textContent = "Error";
    console.error(error);
  }
});
