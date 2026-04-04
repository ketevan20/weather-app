import React, { useEffect } from 'react'
import { getWeatherIcon } from '../utils/weatherIcons';
import { motion } from 'motion/react';

type HourlyForecastProps = {
  timezone: string;
  hourly: any;
}

const HourlyForecast = ({ timezone, hourly }: HourlyForecastProps) => {
  const [showdropdown, setShowDropdown] = React.useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = React.useState(0);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const currentHour = new Date().toLocaleString('en-US', { hour: 'numeric', hour12: false, timeZone: timezone }).padStart(2, '0');

  const todayStartIndex = selectedDayIndex === 0
    ? hourly.time.slice(0, 24).findIndex((t: string) => t.endsWith(`T${currentHour}:00`))
    : 0;

  const startIndex = selectedDayIndex * 24 + (todayStartIndex === -1 ? 0 : todayStartIndex);
  const endIndex = selectedDayIndex * 24 + 24;

  const selectedDayHours = hourly.time
    .slice(startIndex, endIndex)
    .map((time: string, i: number) => ({
      time,
      temperature: Math.round(hourly.temperature_2m[startIndex + i]),
      weatherCode: hourly.weather_code?.[startIndex + i],
    }));

  const formatHour = (isoTime: string) => {
    return new Date(isoTime).toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
      timeZone: timezone,
    });
  };

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: timezone }).format(date);
  });

  const handleDaySelect = (index: number) => {
    setSelectedDayIndex(index);
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='w-full lg:w-1/3 h-175 bg-[rgba(38,37,64,1)] rounded-[20px] text-white py-6 pl-6'>
      <div className='h-full overflow-y-auto custom-scrollbar'>
        <div ref={dropdownRef} className='flex justify-between gap-4 items-center mb-4 relative pr-6'>
          <p>Hourly forecast</p>
          <button
            onClick={() => setShowDropdown(!showdropdown)}
            className='bg-[rgba(60,59,94,1)] hover:bg-[rgba(48,47,74,1)] rounded-lg px-4 py-2 flex gap-3 items-center'
          >
            {days[selectedDayIndex]}
            <img src='/images/icon-dropdown.svg' />
          </button>
          {showdropdown && (
            <div className='absolute z-40 top-full right-0 mt-2 mr-6 bg-[rgba(38,37,64,1)] rounded-xl p-2 border border-[rgba(60,59,94,1)] flex flex-col gap-1'>
              {days.map((day, i) => (
                <p
                  key={i}
                  onClick={() => handleDaySelect(i)}
                  className={`px-2 py-2.5 hover:bg-[rgba(48,47,74,1)] rounded-lg cursor-pointer min-w-49 ${selectedDayIndex === i ? 'bg-[rgba(60,59,94,1)]' : ''}`}
                >
                  {day}
                </p>
              ))}
            </div>
          )}
        </div>
        {selectedDayHours.map((hour: any, i: number) => (
          <motion.div
            key={i}
            variants={{ hover: { x: 5 } }}
            initial={{ x: 0 }}
            whileHover="hover"
            transition={{ duration: 0.3 }}
            className='relative bg-[rgba(48,47,74,1)] mb-4 py-2.5 px-3 mr-6 min-h-15 rounded-lg overflow-hidden border border-[rgba(60,59,94,1)] flex items-center justify-between'>
            <div className='flex gap-2 items-center relative z-20'>
              <img src={getWeatherIcon(hour.weatherCode)} alt="weather icon" className='w-10 h-10 object-cover' />
              <p className='label'>{formatHour(hour.time)}</p>
            </div>
            <p className='label relative z-20'>{hour.temperature}°</p>

            <motion.div
              variants={{ hover: { scaleX: 1 } }}
              initial={{ scaleX: 0 }}
              transition={{ duration: 0.3 }}
              style={{ originX: 0 }}
              className='absolute inset-0 bg-[rgba(60,59,94,1)]'></motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default HourlyForecast