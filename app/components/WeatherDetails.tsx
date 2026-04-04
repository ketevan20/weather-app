import React from 'react'
import { UnitType } from '../types/weather';
import { motion } from 'motion/react';

type WeatherDetailsProps = {
  current: any;
  unit?: UnitType
}

const WeatherDetails = ({ current, unit }: WeatherDetailsProps) => {
  const details = [
    { "name": "Feels Like", "value": `${current?.apparent_temperature}°` },
    { "name": "Humidity", "value": `${current?.relative_humidity_2m}%` },
    { "name": "Wind Speed", "value": `${current?.wind_speed_10m} ${unit?.windSpeed === 'kmh' ? 'km/h' : 'mph'}` },
    { "name": "Precipitation", "value": `${current?.precipitation} ${unit?.precipitation === 'mm' ? 'mm' : 'in'}` }
  ];

  return (
    <div className='grid grid-cols-2 sm:grid-cols-4 gap-6 justify-between '>
      {details.map((detail, i) => (
        <motion.div
          key={i}
          variants={{ hover: { y: -5 } }}
          initial={{ y: 0 }}
          whileHover="hover"
          transition={{ duration: 0.3 }}
          className='relative overflow-hidden flex-1 w-full h-full bg-[rgba(38,37,64,1)] rounded-lg border border-[rgba(60,59,94,1)] p-5 flex flex-col gap-6'>
          <p className='text-[rgba(212,211,217,1)] text relative z-20'>{detail.name}</p>
          <p className='label text-white relative z-20'>{detail.value}</p>

          <motion.div
            variants={{ hover: { scaleY: 1 } }}
            initial={{ scaleY: 0 }}
            transition={{ duration: 0.3 }}
            style={{ originY: 1 }}
            className='absolute inset-0 bg-[rgba(60,59,94,1)]'></motion.div>
        </motion.div>
      ))}
    </div>
  )
}

export default WeatherDetails