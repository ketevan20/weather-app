import React from 'react'
import { getWeatherIcon } from '../utils/weatherIcons';
import { motion } from 'motion/react';

type DailyForecastProps = {
  timezone: string;
  daily: any;
}

const DailyForecast = ({ timezone, daily }: DailyForecastProps) => {
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
      <div className='flex-1 grid grid-cols-3 sm:grid-cols-7 gap-4 justify-between'>
        {days.map((day, i) => (
          <motion.div
            key={i}
            variants={{ hover: { y: -5 } }}
            initial={{ y: 0 }}
            whileHover="hover"
            transition={{ duration: 0.3 }}
            className='relative w-full h-full bg-[rgba(38,37,64,1)] py-4 px-2.5 overflow-hidden rounded-xl border border-[rgba(60,59,94,1)] flex flex-col gap-4'
          >
            <p className='text-center label relative z-20'>{day}</p>
            <motion.img
              initial={{ scale: 0 }}
              animate={{ scale: [1, 0.9, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.1 * i }}
              src={getWeatherIcon(daily?.weather_code?.[i])}
              alt="weather"
              className='w-15 h-15 self-center relative z-20'
            />
            <div className='flex items-center justify-between gap-3 text relative z-20'>
              <p>{parseInt(daily?.temperature_2m_max[i])}°</p>
              <p>{parseInt(daily?.temperature_2m_min[i])}°</p>
            </div>

            <motion.div
              variants={{ hover: { scaleY: 1 } }}
              initial={{ scaleY: 0 }}
              transition={{ duration: 0.3 }}
              style={{ originY: 1 }}
              className='absolute z-6 inset-0 bg-[rgba(60,59,94,1)]'
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default DailyForecast