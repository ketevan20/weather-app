import React from 'react'
import { LocationType } from '../types/weather';
import { getWeatherIcon } from '../utils/weatherIcons';
import { motion } from 'motion/react';

type CurrentWeatherProps = {
  current: any;
  timezone: string;
  location?: LocationType;
}

const CurrentWeather = ({ current, timezone, location }: CurrentWeatherProps) => {
  const formatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: timezone, 
  }).format(new Date());


  return (
    <div className='w-full h-full bg-[url("/images/bg-today-large.svg")] bg-no-repeat bg-cover bg-center rounded-[20px] px-6 py-20 flex items-center justify-between text-white'>
      <div className='flex flex-col gap-3'>
        <h2 className='h2'>{location?.country}, {location?.city}</h2>
        <p>{formatted}</p>
      </div>
      <div className='flex-none flex items-center'>
        <motion.img initial={{ scale: 0 }} animate={{ scale: [1, 0.9, 1] }} transition={{duration: 2, repeat: Infinity}} src={getWeatherIcon(current?.weather_code)} alt="weather icon" className='w-30 h-30 object-cover' />
        <h1 className='h1'>{parseInt(current?.temperature_2m)}°</h1>
      </div>
    </div>
  )
}

export default CurrentWeather