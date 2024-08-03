import React, {  useEffect, useState } from "react";
import axios from "axios";
import "./style.scss";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import host from "../../host";

const Weather = ({location}) => {

  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);



  const fetchWeatherData = async (location) => {
    try {
      setLoading(true);
      const {data} = await axios.get(`${host}/weather/${location}`)
        setLoading(false);
        console.log(data)
        setWeatherData(data.weatherData)
      
    } catch (error) {
      toast.error("Something went wrong!", { duration: 1000 });
      console.error(error)
      setWeatherData(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(location)
    if(location?.length > 0){
      fetchWeatherData(location);
    }
   
  }, [location])

  return (
    <div
      
      className={`data-container bg-gray-200 dark:bg-slate-700`}
    >
    
      {loading ? 
      <div className="h-[200px] flex items-center justify-center w-[100%]">
        <Loader />
      </div>
      :
      (
           <>
              <h2>
                {weatherData?.name}, {weatherData?.sys.country}
              </h2>
              <p>Temperature: {weatherData?.main.temp}°C</p>
              <p>Humidity: {weatherData?.main.humidity}%</p>
              <p>Wind Speed: {weatherData?.wind.speed} m/s</p>
              <p>Weather Condition: {weatherData?.weather[0].description}</p>
              </>
      )}
    </div>
  );
};

export default Weather;
