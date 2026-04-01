import React from 'react'

const SearchBar = () => {
  return (
    <div className='m-auto flex gap-4 items-center'>
      <div className='min-w-100 bg-[rgba(38,37,64,1)] px-6 py-4 flex gap-4 rounded-xl'>
        <img src="/images/icon-search.svg" alt="Search" />
        <input type="text" className='w-full outline-0 text-white placeholder:text-[rgba(212,211,217,1)] caret-amber-50' placeholder='Search for a place...'/>
      </div>
      <button className='bg-[rgba(70,88,217,1)] hover:bg-[rgba(43,27,156,1)] text-white py-4 px-6 rounded-xl'>Search</button>
    </div>
  )
}

export default SearchBar