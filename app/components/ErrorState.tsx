import React from 'react'

const ErrorState = () => {
  return (
    <div className='w-full pt-10 flex flex-col gap-6 items-center'>
      <img src="/images/icon-error.svg" alt="error icon" className='w-10.5 ' />
      <h1 className='text-white h1'>Something went wrong</h1>
      <p className='text text-[rgba(212,211,217,1)]'>We couldn’t connect to the server (API error). Please try again in a few moments.</p>
      <button className='bg-[#262540] px-4 py-3 rounded-lg flex items-center gap-2.5 text-white'><img src="/images/icon-retry.svg" alt="refresh icon" /> Retry</button>
    </div>
  )
}

export default ErrorState