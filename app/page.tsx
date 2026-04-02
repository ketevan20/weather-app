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
import { CoordsType, UnitType } from './types/weather'
import { useWeather } from './hooks/useWeather'
import ErrorState from './components/ErrorState'

const page = () => {
  const [coords, setCoords] = useState<CoordsType>({
    lat: 41.6938,
    lon: 44.8015,
  })
  const [unit, setUnit] = useState<UnitType>({
    temperature: 'celsius',
    windSpeed: 'kmh',
    Precipitation: 'mm',
  });

  const { loading, error, weatherData } = useWeather(coords, unit);

  if (error) {
    return (
      <ErrorState />
    )
  }

  return (
    <div className='w-[90%] m-auto flex flex-col gap-16'>
      <div className='w-full flex justify-between items-center'>
        <Header />
        <button className='bg-[#F23131] text-white px-4 py-2 rounded-lg'>Get Started</button>
      </div>
      <Title />
      <main className='flex flex-col gap-12'>
        <SearchBar />
        {
          !loading ?
            <div className='flex gap-8'>
              <div className='flex-1 flex flex-col gap-12'>
                <div className='flex-[2.5] flex flex-col gap-8'>
                  <CurrentWeather current={weatherData?.current} timezone={weatherData?.timezone} time={weatherData?.current?.time}/>
                  <WeatherDetails current={weatherData?.current} />
                </div>
                <DailyForecast />
              </div>
              <HourlyForecast />
            </div> : <LoadingSkeleton />
        }
      </main>
    </div>
  )
}

export default page