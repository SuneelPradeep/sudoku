import React, { useState } from 'react'
import ProfilePicture from './ProfilePicture';

const Titles = ({currentLevel,showError,location}) => {
    
    
  return (
    <div>
        <div className='mx-4 flex items-center justify-between gap-2'>
  
      <h3 className="flex-1 gap-2 items-center text-5xl text-white font-bold lg:mt-2 md:mt-6 lg:mb-0 mb-2 ">
      Sudoku
    </h3>
    
    <span className='flex flex-col justify-end items-end'>
    <ProfilePicture location={location} />
    {location &&  <p className='text-xs text-gray-200 truncate z-10'> Top 1% 🎲 in <strong className='font-bold text-orange-400'>{location}</strong> </p> }
    <p className="text-lg text-orange-300 "> ( Lvl = {currentLevel?.level ? currentLevel?.level : 1 })</p>
      
    </span>
            
    </div>
    <p className={` my-2 ${showError?.color}`}>{showError?.text === '' ? '' : showError?.text} </p>
      
    </div>
  )
}

export default Titles
