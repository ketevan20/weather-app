import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const details = [
    "Feels Like",
    "Humidity",
    "Wind Speed",
    "Precipitation"
]

const LoadingSkeleton = () => {
    return (
        <SkeletonTheme baseColor='#26253e' highlightColor='#3c3b5e'>
            <div className='w-full h-175 flex flex-col lg:flex-row gap-8 text-white'>
                <div className='flex-1 flex flex-col gap-12'>
                    <div className='flex-[2.5] flex flex-col gap-8'>
                        <div className='w-full h-full bg-[rgba(38,37,64,1)] rounded-[20px] overflow-hidden relative'><Skeleton className="absolute -top-1 h-full" /></div>
                        <div className='grid grid-cols-2 sm:grid-cols-4  gap-6 justify-between'>
                            {details.map((detail, i) => (
                                <div key={i} className='w-full bg-[rgba(38,37,64,1)] rounded-lg border border-[rgba(60,59,94,1)] p-5 flex flex-col gap-6'>
                                    <p className='text-[rgba(212,211,217,1)] text'>{detail}</p>
                                    <Skeleton />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex-1 flex gap-5 flex-col'>
                        <p>Daily forecast</p>
                        <div className='flex-1 grid grid-cols-3 sm:grid-cols-7 gap-4 justify-between'>
                            {Array.from({ length: 7 }).map((_, i) => (
                                <div key={i} className='w-full h-full bg-[rgba(38,37,64,1)] overflow-hidden rounded-xl border border-[rgba(60,59,94,1)]'>
                                    <Skeleton className="absolute -top-1 h-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='w-full lg:w-1/3 bg-[rgba(38,37,64,1)] rounded-[20px] p-6 flex flex-col gap-4'>
                    <div className='flex justify-between gap-4 items-center'>
                        <p>Hourly forecast</p>
                        <button className='bg-[rgba(60,59,94,1)] rounded-lg px-4 py-2 flex gap-3 items-center'>– <img src='/images/icon-dropdown.svg' /></button>
                    </div>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className='bg-[rgba(48,47,74,1)] h-15 rounded-lg overflow-hidden border border-[rgba(60,59,94,1)]'>
                            <Skeleton className="absolute -top-1 h-full" />
                        </div>
                    ))}
                </div>
            </div>
        </SkeletonTheme>
    )
}

export default LoadingSkeleton