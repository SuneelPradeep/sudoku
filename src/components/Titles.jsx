import React, { useState } from 'react'
import ProfilePicture from './ProfilePicture';

const Titles = ({currentLevel,showError,location}) => {
    
    
  return (
    <div>
        <div className='flex items-center justify-between gap-2'>
            
            
    <p className="text-xl mt-6  text-orange-300 "> ( Lvl = {currentLevel?.level ? currentLevel?.level : 1 })</p>
            {/* {location &&  <p className='text-xs text-gray-200 truncate z-10'> Top 1% 🎲 in <strong className='font-bold text-orange-400'>{location}</strong> </p> } */}
     
      <span className=''>
      <h3 className="flex flex-col md:flex-col lg:flex-row gap-2 items-center text-5xl text-white font-bold lg:mt-2 mt-8 md:mt-6 lg:mb-0 mb-2 ">
      Sudoku
    </h3>
    </span>
    <span className='flex flex-col justify-end items-end'>
    <ProfilePicture location={location} />
    {location &&  <p className='text-xs text-gray-200 truncate z-10'> Top 1% 🎲 in <strong className='font-bold text-orange-400'>{location}</strong> </p> }
    </span>
            
    </div>
    <p className={` my-2 ${showError?.color}`}>{showError?.text === '' ? '' : showError?.text} </p>
      
    </div>
  )
}

export default Titles
