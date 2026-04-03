import axios from "axios";
import { useEffect, useState } from "react";
import { Suggestion } from "../types/weather";

export function useLocation(location: string) {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=8&language=en`
        const fetchLocation = async () => {
            try {
                setLoading(true)
                const res = await axios.get(url);
                setSuggestions(res.data.results || []);
            } catch (err) {
                console.error('Error fetching location suggestions:', err);
                setSuggestions([]);
            } finally {
                setLoading(false);
            }
        }

        if (location.trim().length > 2) 
            fetchLocation();
        else {
            console.log(location)
            setSuggestions([]);
        }

    }, [location])

    return { suggestions, loading };
}