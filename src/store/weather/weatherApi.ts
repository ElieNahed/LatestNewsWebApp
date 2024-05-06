// weatherApi.ts

import axios from 'axios';
import { WeatherData, ForecastData } from './type';

 const apiKey = import.meta.env.VITE_WEATHER_API;

export const fetchCurrentWeatherData = async () => {
    try {
        const response = await axios.get(process.env.WEATHER_API+`/current.json?key=${apiKey}&q=auto:ip`);
        console.log(response.data); // Log the response
        return response.data as WeatherData;
    } catch (error) {
        throw new Error('Error fetching weather data:' + error);
    }
};

export const fetchForecastData = async () => {
    try {
        const response = await axios.get(process.env.WEATHER_API+`/forecast.json?key=${apiKey}&q=auto:ip&days=3`);
        console.log(response.data); // Log the response
        return response.data.forecast.forecastday as ForecastData[];
    } catch (error) {
        throw new Error('Error fetching forecast data:' + error);
    }
};
