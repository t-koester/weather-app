require('dotenv').config({ path: 'apikey.env' });
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');  

const app = express();
const PORT = 3000;

app.use(cors()); 

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("API_KEY ist nicht gesetzt!");
  process.exit(1);
}


app.get('/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: "Bitte 'city' als Query-Parameter angeben." });
  }

  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&lang=en`;
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: "Fehler bei der Wetter-API" });
    }
    const data = await response.json();
    res.json({
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
      city: data.location.name,
      country: data.location.country
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Serverfehler" });
  }
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
