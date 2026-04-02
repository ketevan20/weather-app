import React from 'react'

type WeatherDetailsProps = {
  current: any;
}

const WeatherDetails = ({ current }: WeatherDetailsProps) => {
  const details = [
    {"name": "Feels Like", "value": `${current?.apparent_temperature}°`},
    {"name": "Humidity", "value": `${current?.relative_humidity_2m}%`},
    {"name": "Wind Speed", "value": `${current?.wind_speed_10m} km/h`},
    {"name": "Precipitation", "value": `${current?.precipitation} mm`}
  ];

  return (
    <div className='flex items-center gap-6 justify-between'>
      {details.map((detail, i) => (
        <div key={i} className='flex-1 w-full h-full bg-[rgba(38,37,64,1)] rounded-lg border border-[rgba(60,59,94,1)] p-5 flex flex-col gap-6'>
          <p className='text-[rgba(212,211,217,1)] text'>{detail.name}</p>
          <p className='label text-white'>{detail.value}</p>
        </div>
      ))}
    </div>
  )
}

export default WeatherDetails