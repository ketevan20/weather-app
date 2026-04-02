import React from 'react'

type CurrentWeatherProps = {
  current: any;
  timezone: string;
  time?: string;
}

const CurrentWeather = ({current, timezone, time}: CurrentWeatherProps) => {
  return (
    <div className='w-full h-full bg-[url("/images/bg-today-large.svg")] bg-no-repeat bg-cover rounded-[20px] px-6 py-20 flex items-center justify-between text-white'>
      <div className='flex flex-col gap-3'>
        <h2 className='h2'>{timezone}</h2>
        <p>{time}</p>
      </div>
      <div className='flex items-center'>
        <img src="/images/icon-sunny.webp" alt="weather icon" className='w-30 h-30 object-cover'/>
        <h1 className='h1'>{current?.temperature_2m}°</h1>
      </div>
    </div>
  )
}

export default CurrentWeather