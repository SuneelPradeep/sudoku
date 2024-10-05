import React, { useState } from 'react'
import { defaultPic } from '../utils/generateRandomSudoku'

const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result); // This will be a Base64 string
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    });
  };
const ProfilePicture = ({location}) => {
    const [image,setImage] = useState(localStorage.getItem('dp')  ?  localStorage.getItem('dp') : defaultPic)
    
    const handleFile =  async(e)=>{
        const file = e.target.files[0]
        if(file){
            let blob = URL.createObjectURL(file)
            setImage(blob)
            let  base64data = await fileToBase64(file)
            
            localStorage.setItem('dp',base64data)
            
        }
    }
    const handleClick = ()=>{
        document.getElementById('fileInput').click()
    }

  return (
    <div className=' relative w-12 h-12 my-2 cursor-pointer bg-white overflow-hidden border border-gray-300' onClick={handleClick}>
        
            <figcaption>
            <img alt='dp' className="w-full h-full object-cover"  src={image} />  
            {location &&  <p className='text-white z-10'> Top 1% gamer in {location} </p> }
            </figcaption>
           
       <input type='file' capture='user' className='hidden' id='fileInput'  accept="image/*" onChange={handleFile}  />
        
    
        
    </div>
  )
}

export default ProfilePicture
