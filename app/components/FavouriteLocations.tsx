import React, { useEffect, useState } from 'react'
import { CoordsType, LocationType, Suggestion } from '../types/weather'
import { Fascinate } from 'next/font/google';
import { X } from 'lucide-react';

type FacouriteLocationsProps = {
    locations: any;
    setCoords: (coords: CoordsType) => void;
    setLocation: (location: LocationType) => void;
    handleDelete: (location: any) => void;
}

const FavouriteLocations = ({ locations, setCoords, setLocation, handleDelete }: FacouriteLocationsProps) => {
    const [showDropdown, setShowdropdown] = useState(false);

    const dropdownRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowdropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className='relative'>
            <button onClick={() => { setShowdropdown(!showDropdown) }} className='outline-0 py-3 px-4 bg-[rgba(38,37,64,1)] hover:bg-[rgba(48,47,74,1)] flex gap-2.5 items-center rounded-lg text-white'>
                <p>Favourites</p>
                <img src="/images/icon-dropdown.svg" alt="dropdown icon" />
            </button>
            {
                showDropdown && (
                    <div className='absolute z-200 right-0 min-w-55 w-max max-h-80 overflow-y-auto custom-scrollbar mt-2.5 px-2 py-1.5 bg-[rgba(38,37,64,1)] border border-[rgba(60,59,94,1)] rounded-xl flex flex-col gap-1'>
                        {locations.length > 0 ? locations.map((location: any, index: number) => (
                            <div onClick={() => { setCoords(location.coords); setLocation(location.location); setShowdropdown(false) }} key={index} className='text-left cursor-pointer px-4 py-3 rounded-lg transition-all hover:bg-[rgba(48,47,74,1)] border border-[rgba(38,37,64,1)] text-white flex items-center justify-between gap-8'>
                                {location.location.country}, {location.location.city}
                                <X onClick={() => { handleDelete((prev: any[]) => prev.filter((_: any, i: number) => i !== index)) }} size={12} />
                            </div>
                        )) : <p className='px-2 py-3 text-white/60'>Nothing yet.</p>}
                    </div>
                )
            }
        </div>
    )
}

export default FavouriteLocations