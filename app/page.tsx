'use client'
import { useEffect, useState } from 'react'
import Header from './components/Header'
import Title from './components/Title'
import SearchBar from './components/SearchBar'
import HourlyForecast from './components/HourlyForecast'
import DailyForecast from './components/DailyForecast'
import CurrentWeather from './components/CurrentWeather'
import WeatherDetails from './components/WeatherDetails'
import LoadingSkeleton from './components/LoadingSkeleton'
import { CoordsType, LocationType, Suggestion, UnitType } from './types/weather'
import { useWeather } from './hooks/useWeather'
import ErrorState from './components/ErrorState'
import UnitToggle from './components/UnitToggle'
import FavouriteLocations from './components/FavouriteLocations'

const page = () => {
  const [coords, setCoords] = useState<CoordsType>(() => {
    if (typeof window === 'undefined') {
      return { lat: 41.6938, lon: 44.8015 }
    }
    const stored = localStorage.getItem('coords')
    return stored ? JSON.parse(stored) : { lat: 41.6938, lon: 44.8015 }
  })

  const [unit, setUnit] = useState<UnitType>(() => {
    if (typeof window === 'undefined') {
      return {
        temperature: 'celsius',
        windSpeed: 'kmh',
        precipitation: 'mm',

      }
    }
    const stored = localStorage.getItem('unit')
    return stored ? JSON.parse(stored) : {
      temperature: 'celsius',
      windSpeed: 'kmh',
      precipitation: 'mm',
    }
  });

  const [location, setLocation] = useState<LocationType>(() => {
    if (typeof window === 'undefined') {
      return { country: 'Georgia', city: 'Tbilisi' }
    }
    const stored = localStorage.getItem('location')
    return stored ? JSON.parse(stored) : { country: 'Georgia', city: 'Tbilisi' }
  });

  const { loading, error, weatherData } = useWeather(coords, unit);

  const [favouriteLocations, setFavouriteLocations] = useState<any[]>(() => {
    if (typeof window === 'undefined') {
      return [];
    }
    const stored = localStorage.getItem('favouriteLocations')
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('favouriteLocations', JSON.stringify(favouriteLocations));
  }, [favouriteLocations])

  if (error) {
    return (
      <ErrorState />
    )
  }

  return (
    <div className='w-[90%] m-auto flex flex-col gap-16'>
      <div className='w-full flex justify-between items-center'>
        <Header />
        <div className='flex gap-4'>          
          <FavouriteLocations locations={favouriteLocations} setCoords={setCoords} setLocation={setLocation} handleDelete={setFavouriteLocations}/>
          <UnitToggle unit={unit} setUnit={setUnit} />
        </div>
      </div>
      <Title />
      <main className='flex flex-col gap-12'>
        <SearchBar setCoords={setCoords} handleLocationChange={setLocation}/>
        {
          !loading ?
            <div className='flex flex-col gap-8 lg:flex-row'>
              <div className='flex-1 flex flex-col gap-12'>
                <div className='flex-[2.5] flex flex-col gap-8'>
                  <CurrentWeather favourites={favouriteLocations} current={weatherData?.current} timezone={weatherData?.timezone} location={location} saveToFavourites={setFavouriteLocations} coords={coords}/>
                  <WeatherDetails current={weatherData?.current} unit={unit} />
                </div>
                <DailyForecast timezone={weatherData?.timezone} daily={weatherData?.daily} />
              </div>
              <HourlyForecast timezone={weatherData?.timezone} hourly={weatherData?.hourly} />
            </div> : <LoadingSkeleton />
        }
      </main>
    </div>
  )
}

export default page