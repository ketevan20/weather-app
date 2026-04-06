import React from 'react'
import { CoordsType, LocationType, Suggestion } from '../types/weather';
import { getWeatherIcon } from '../utils/weatherIcons';
import { motion } from 'motion/react';
import { LocateIcon, Star, StarsIcon } from 'lucide-react';

type CurrentWeatherProps = {
  current: any;
  timezone: string;
  location?: LocationType;
  saveToFavourites: (location: any) => void;
  coords: CoordsType;
  favourites: any;
}

const CurrentWeather = ({ current, timezone, location, saveToFavourites, favourites, coords }: CurrentWeatherProps) => {
  const formatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: timezone, 
  }).format(new Date());

  const handleFavouriteClick = () => {
    const newFavourite = { location, coords };
    if (!favourites.some((fav: any) => fav.location.city === location?.city && fav.location.country === location?.country)) {
      saveToFavourites((prev: any[]) => [...prev, newFavourite]);
    } else {
      saveToFavourites((prev: any[]) => prev.filter((fav: any) => !(fav.location.city === location?.city && fav.location.country === location?.country)));
    }
  }

  return (
    <div className='relative w-full h-full bg-[url("/images/bg-today-large.svg")] bg-no-repeat bg-cover bg-center rounded-[20px] px-6 py-20 flex flex-col sm:flex-row text-center sm:text-left items-center justify-between text-white'>
      <div className='flex flex-col gap-3'>
        <h2 className='h2'>{location?.country}, {location?.city}</h2>
        <p>{formatted}</p>
      </div>
      <div className='flex-none flex items-center gap-5'>
        <motion.img initial={{ scale: 0 }} animate={{ scale: [1, 0.9, 1] }} transition={{duration: 2, repeat: Infinity}} src={getWeatherIcon(current?.weather_code)} alt="weather icon" className='w-30 h-30 object-cover' />
        <h1 className='h1'>{parseInt(current?.temperature_2m)}°</h1>
      </div>
      <div className='absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4'>
        <div></div>
        <motion.button onClick={() => { handleFavouriteClick() }} initial={{ rotate: 0 }} animate={{ rotate: 360 }} whileHover={{scale: 1.2}} transition={{duration: 0.5}}><Star size={34} className={`${favourites.some((fav: any) => fav.location.city === location?.city && fav.location.country === location?.country) ? 'fill-yellow-400 text-yellow-400' : 'text-white'}`}/></motion.button>
      </div> 
    </div>
  )
}

export default CurrentWeather