import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from '../hooks/useLocation'
import { LocationType, Suggestion } from '../types/weather';

type SearchBarProps = {
  setCoords: (coords: { lat: number; lon: number }) => void;
  handleLocationChange: (location: LocationType) => void;
}

const SearchBar = ({ setCoords, handleLocationChange }: SearchBarProps) => {
  const [location, setLocation] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const { loading, suggestions } = useLocation(location);

  const handleSearch = (suggestion: Suggestion) => {
    setLocation('');
    setCoords({
      lat: suggestion.latitude,
      lon: suggestion.longitude,
    })
    setSelectedIndex(-1);
    handleLocationChange({
      country: suggestion.country,
      city: suggestion.name,
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
        break;

      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, -1));
        break;

      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSearch(suggestions[selectedIndex]);
        }
        break;
    }
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setLocation('');
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  useEffect(() => {
    if (selectedIndex >= 0 && dropdownRef.current) {
      const items = dropdownRef.current.querySelectorAll('button');
      items[selectedIndex]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex]);

  return (
    <div className='m-auto flex gap-4' ref={searchRef}>
      <div className='relative min-w-100 flex flex-col gap-2.5'>
        <div className='w-full bg-[rgba(38,37,64,1)] px-6 py-4 flex gap-4 rounded-xl'>
          <img src="/images/icon-search.svg" alt="Search" />
          <input ref={inputRef} onKeyDown={handleKeyDown} onChange={(e) => setLocation(e.target.value)} type="text" className='w-full outline-0 text-white placeholder:text-[rgba(212,211,217,1)] caret-amber-50' placeholder='Search for a place...' />
        </div>

        {loading && <div className="absolute left-0 right-0 mt-16 bg-[rgba(38,37,64,1)] rounded-xl p-2 text-white/60">
          Searching...
        </div>}

        {suggestions.length > 0 && location.trim() !== '' && (
          <div ref={dropdownRef} className="absolute left-0 right-0 mt-16 max-h-46 overflow-y-scroll custom-scrollbar bg-[rgba(38,37,64,1)] rounded-xl p-2 text-white flex flex-col gap-2">
            {suggestions.map((suggestion, index) => (
              <button onClick={() => handleSearch(suggestion)} key={suggestion.id} className={`text-left cursor-pointer px-4 py-3 rounded-lg transition-all hover:bg-[rgba(48,47,74,1)] border border-[rgba(38,37,64,1)] ${selectedIndex === index ? 'bg-[rgba(48,47,74,1)] border-[rgba(60,59,94,1)]' : ''
                }`}>
                {suggestion.name}, {suggestion.country}
              </button>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={() => {
          if (selectedIndex >= 0) {
            handleSearch(suggestions[selectedIndex]);
          }
        }}
        className='self-start bg-[rgba(70,88,217,1)] hover:bg-[rgba(43,27,156,1)] text-white py-4 px-6 rounded-xl'>Search</button>
    </div>
  )
}

export default SearchBar