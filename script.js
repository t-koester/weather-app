const input = document.querySelector(".input");
const searchButton = document.querySelector(".search");
const output = document.querySelector(".output");

async function fetchWeather(city) {
  const url = `http://localhost:3000/weather?city=${encodeURIComponent(city)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Fehler beim Abrufen der Wetterdaten");
  }
  const data = await response.json();
  return data; 
}

searchButton.addEventListener("click", async () => {
  const city = input.value.trim();
  if (!city) {
    output.textContent = "Bitte gib einen Stadtnamen ein.";
    return;
  }

  output.textContent = "Wetter wird geladen...";

  try {
    const weatherData = await fetchWeather(city);
    output.textContent = `In ${city} sind es ${weatherData.temperature}°C und ${weatherData.condition}.`;
  } catch (error) {
    output.textContent = "Fehler bei der Wetterabfrage.";
    console.error(error);
  }
});
