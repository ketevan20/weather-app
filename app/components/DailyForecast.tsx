import React from 'react'

const DailyForecast = () => {
  return (
    <div className='flex-1 flex gap-5 flex-col text-white'>
      <p>Daily forecast</p>
      <div className='flex-1 flex gap-4 justify-between'>
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className='w-full h-full bg-[rgba(38,37,64,1)] overflow-hidden rounded-xl border border-[rgba(60,59,94,1)]'>
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default DailyForecast