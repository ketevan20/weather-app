export type UnitType = {
    temperature: 'celsius' | 'fahrenheit';
    windSpeed: 'kmh' | 'mph';
    precipitation: 'mm' | 'inch';
}

export type CoordsType = {
    lat: number;
    lon: number;
}

export type WeatherDataType = {
    
}

export type Suggestion = {
    id: number;
    name: string;
    country: string;
    country_code: string;
    latitude: number;
    longitude: number;
    admin1?: string;
};

export type LocationType = {
    country: string;
    city: string;
}