const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors")
const userRoutes = require("./routes/userRoutes")
const eventRoutes = require("./routes/eventRoutes")
const axios = require("axios")
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


mongoose.connect(process.env.MONGODB_URI).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(express.json());
app.use(cors())
app.use(userRoutes)
app.use(eventRoutes)
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.get("/weather/:location", async(req, res) => {
  try {
    const {location} = req.params
   
    const API_URL = `https://api.openweathermap.org/data/2.5/weather`;
    const API_KEY = process.env.WEATHER_API_KEY
  
      const {data} = await axios.get(API_URL, {
          params: {
            q: location,
            appid: API_KEY,
            units: "metric", // Change to 'imperial' for Fahrenheit
          },
        })
        res.status(200).json({weatherData: data})
  } catch (error) {
    res.status(500).json({message: error.message})
  }

})
