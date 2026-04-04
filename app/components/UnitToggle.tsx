import React, { useEffect, useState } from 'react'
import { UnitType } from '../types/weather';

interface UnitToggleProps {
  unit: UnitType;
  setUnit: (unit: UnitType) => void;
}

const UnitToggle = ({ unit, setUnit }: UnitToggleProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const isImperial = unit.temperature === 'fahrenheit' || unit.windSpeed === 'mph' || unit.precipitation === 'inch';

  const toggleToImperial = () => {
    if(isImperial) {
      setUnit({
        temperature: 'celsius',
        windSpeed: 'kmh',
        precipitation: 'mm',
      });
    } else {
      setUnit({
        temperature: 'fahrenheit',
        windSpeed: 'mph',
        precipitation: 'inch',
      });
    }
    setShowDropdown(false);
    setSelectedIndex(-1);
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, 6));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        switch (selectedIndex) {
          case 0:
            toggleToImperial();
            break;
          case 1:
            setUnit({
              ...unit,
              temperature: 'celsius',
            });
            break;
          case 2:
            setUnit({
              ...unit,
              temperature: 'fahrenheit',
            });
            break;
          case 3:
            setUnit({
              ...unit,
              windSpeed: 'kmh',
            });
            break;
          case 4:
            setUnit({
              ...unit,
              windSpeed: 'mph',
            });
            break;
          case 5:
            setUnit({
              ...unit,
              precipitation: 'mm',
            });
            break;
          case 6:
            setUnit({
              ...unit,
              precipitation: 'inch',
            });
            break;
          default:
            break;
        };
        setShowDropdown(false);
        setSelectedIndex(-1);
        break;
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className='relative text-white'>
      <button onClick={() => { setShowDropdown(!showDropdown); setSelectedIndex(-1) }} onKeyDown={(e) => handleKeyDown(e)} className='outline-0 py-3 px-4 bg-[rgba(38,37,64,1)] hover:bg-[rgba(48,47,74,1)] flex gap-2.5 items-center rounded-lg text-white'>
        <img src="/images/icon-units.svg" alt="units icon" />
        <p>Units</p>
        <img src="/images/icon-dropdown.svg" alt="dropdown icon" />
      </button>
      {showDropdown && (
        <div className='absolute z-200 right-0 min-w-55 mt-2.5 px-2 py-1.5 bg-[rgba(38,37,64,1)] border border-[rgba(60,59,94,1)] rounded-xl flex flex-col gap-1'>
          <button onClick={toggleToImperial} className={`px-2 py-2.5 text-left hover:bg-[rgba(48,47,74,1)] rounded-lg ${selectedIndex === 0 ? 'bg-[rgba(48,47,74,1)]' : ''}`}>Switch to {!isImperial ? 'Imperial' : 'Metric'}</button>

          <div className='flex flex-col gap-1'>
            <p className='text-[rgba(172,172,183,1)] px-2 py-2.5 mb-1'>Temperature</p>
            <div onClick={() => {setUnit({...unit, temperature: 'celsius'}); setShowDropdown(false)}} className={`px-2 py-2.5 hover:bg-[rgba(48,47,74,1)] rounded-lg ${selectedIndex === 1 || unit.temperature === 'celsius' ? 'bg-[rgba(48,47,74,1)]' : ''}`}>
              Celsius (°C)
            </div>
            <div onClick={() => {setUnit({...unit, temperature: 'fahrenheit'}); setShowDropdown(false)}} className={`px-2 py-2.5 hover:bg-[rgba(48,47,74,1)] rounded-lg ${selectedIndex === 2 || unit.temperature === 'fahrenheit' ? 'bg-[rgba(48,47,74,1)]' : ''}`}>
              Fahrenheit (°F)
            </div>
          </div>

          <div className='w-full h-px bg-[rgba(60,59,94,1)]'></div>

          <div className='flex flex-col gap-1'>
            <p className='text-[rgba(172,172,183,1)] px-2 py-2.5 mb-1'>Wind Speed</p>
            <div onClick={() => {setUnit({...unit, windSpeed: 'kmh'}); setShowDropdown(false)}} className={`px-2 py-2.5 hover:bg-[rgba(48,47,74,1)] rounded-lg ${selectedIndex === 3 || unit.windSpeed === 'kmh' ? 'bg-[rgba(48,47,74,1)]' : ''}`}>
              km/h
            </div>
            <div onClick={() => {setUnit({...unit, windSpeed: 'mph'}); setShowDropdown(false)}} className={`px-2 py-2.5 hover:bg-[rgba(48,47,74,1)] rounded-lg ${selectedIndex === 4 || unit.windSpeed === 'mph' ? 'bg-[rgba(48,47,74,1)]' : ''}`}>
              mph
            </div>
          </div>

          <div className='w-full h-px bg-[rgba(60,59,94,1)]'></div>

          <div className='flex flex-col gap-1'>
            <p className='text-[rgba(172,172,183,1)] px-2 py-2.5 mb-1'>Precipitation</p>
            <div onClick={() => {setUnit({...unit, precipitation: 'mm'}); setShowDropdown(false)}} className={`px-2 py-2.5 hover:bg-[rgba(48,47,74,1)] rounded-lg ${selectedIndex === 5 || unit.precipitation === 'mm' ? 'bg-[rgba(48,47,74,1)]' : ''}`}>
              Millimeters (mm)
            </div>
            <div onClick={() => {setUnit({...unit, precipitation: 'inch'}); setShowDropdown(false)}} className={`px-2 py-2.5 hover:bg-[rgba(48,47,74,1)] rounded-lg ${selectedIndex === 6 || unit.precipitation === 'inch' ? 'bg-[rgba(48,47,74,1)]' : ''}`}>
              Inches (in)
            </div>
          </div>

        </div>
      )}
    </div>
  )
}

export default UnitToggle