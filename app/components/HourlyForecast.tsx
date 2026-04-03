import React from 'react'

const HourlyForecast = () => {
  return (
    <div className='w-1/3 bg-[rgba(38,37,64,1)] rounded-[20px] p-6 flex flex-col gap-4 text-white'>
      <div className='flex justify-between gap-4 items-center'>
        <p>Hourly forecast</p>
        <button className='bg-[rgba(60,59,94,1)] rounded-lg px-4 py-2 flex gap-3 items-center'>– <img src='/images/icon-dropdown.svg' /></button>
      </div>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className='bg-[rgba(48,47,74,1)] h-15 rounded-lg overflow-hidden border border-[rgba(60,59,94,1)]'>
        </div>
      ))}
    </div>
  )
}

export default HourlyForecast