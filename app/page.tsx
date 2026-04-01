'use client'
import React, { useState } from 'react'
import Header from './components/Header'
import Title from './components/Title'
import SearchBar from './components/SearchBar'
import HourlyForecast from './components/HourlyForecast'
import DailyForecast from './components/DailyForecast'
import CurrentWeather from './components/CurrentWeather'
import WeatherDetails from './components/WeatherDetails'
import LoadingSkeleton from './components/LoadingSkeleton'

const page = () => {
  const [loading, setLoading] = useState(false);

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
              <div className='flex flex-col gap-12'>
                <div className='flex flex-col gap-8'>
                  <CurrentWeather />
                  <WeatherDetails />
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