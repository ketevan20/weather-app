import React from 'react'
import { getWeatherIcon } from '../utils/weatherIcons';
type DailyForecastProps = {
  timezone: string;
  daily: any;
}
const DailyForecast = ({timezone, daily}: DailyForecastProps) => {
  const days = [];
  const timeZone = timezone;

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    const day = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      timeZone,
    }).format(date);
    days.push(day);
  }

  return (
    <div className='flex-1 flex gap-5 flex-col text-white'>
      <p>Daily forecast</p>
      <div className='flex-1 flex gap-4 justify-between'>
        {days.map((day, i) => (
          <div key={i} className='w-full h-full bg-[rgba(38,37,64,1)] py-4 px-2.5 overflow-hidden rounded-xl border border-[rgba(60,59,94,1)] flex flex-col gap-4'>
            <p className='text-center label'>{day}</p>
            <img src={getWeatherIcon(daily?.weather_code?.[i])} alt="weather" className='w-15 h-15 self-center'/>
            <div className='flex items-center justify-between gap-3 text'>
              <p>{parseInt(daily?.temperature_2m_max[i])}°</p>
              <p>{parseInt(daily?.temperature_2m_min[i])}°</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DailyForecast