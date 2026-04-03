import { useEffect, useState } from "react";
import { CoordsType, UnitType } from "../types/weather";
import axios from "axios";

export function useWeather(coords: CoordsType | null, unit: UnitType | null) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [weatherData, setWeatherData] = useState<any | null>(null);

    useEffect(() => {
        const url =
            `https://api.open-meteo.com/v1/forecast?` +
            `latitude=${coords?.lat}&longitude=${coords?.lon}` +
            `&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation,weather_code` +
            `&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation_probability,precipitation,weather_code` +
            `&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,precipitation_probability_max,weather_code` +
            `&timezone=auto&forecast_days=7` +
            `&temperature_unit=${unit?.temperature}` +
            `&wind_speed_unit=${unit?.windSpeed}` +
            `&precipitation_unit=${unit?.precipitation}`;
        const fetchWeather = async () => {
            setLoading(true);
            try {
                const res = await axios.get(url);
                setWeatherData(res.data);
                console.log(res.data);
            } catch (err) {
                setError('We couldn’t connect to the server (API error). Please try again in a few moments.');
            } finally {
                setLoading(false);
            }
        }

        fetchWeather();
    }, [coords, unit])

    return { loading, error, weatherData };
}