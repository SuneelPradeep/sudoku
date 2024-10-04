import { useEffect, useState } from "react"
import {  getDeepCopy, firstSudoku } from "./utils/generateRandomSudoku";
import Actions from "./components/Actions";
import Matrix from "./components/Matrix";
import Titles from "./components/Titles";

function App() {

  const [initialSudoku,setInitialSudoku ] = useState(getDeepCopy(firstSudoku) || [])
  const [sudokuArr,setSudokuArr] = useState(getDeepCopy(firstSudoku) || [])
  const [showError,setShowError] = useState({text : '',color:'text-white',error:false,row :'', col :''})
  const [position,setPosition] = useState({row :'', col :'',started :false})
  const [currentLevel,setCurrentLevel] = useState({level : parseInt(localStorage.getItem('level')) ,completed : false} || {level :1, completed :false})
  const [location,setLocation] = useState(localStorage.getItem('col') || '')
  
  const handleSudoku = (e,row,col)=>{
    let value = (e.target.value).replace(/[^1-9]/g,'') || -1;
   let grid = getDeepCopy(sudokuArr)
   
    if(value  === -1 || (value  >=1 && value <=9)) {grid[row][col] = value }
    
    setSudokuArr(grid)
    setPosition({row,col,started:true})
   
  }

  
  const  getReverseGeoLocation = async (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    let res  = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,{
    method :"GET"
  })
   if(res){
    let data = await res.json()
    console.log('oooh the data is',data);
    
    setLocation(data?.city)
    localStorage.setItem('col',data?.city)
   }
  //console.log('res is',await res.json());
  
}
  
  function error() {
  //  console.log("Unable to retrieve your location");
  }
   
  useEffect(()=>{
    //console.log('is navigator working',navigator);
    
    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(getReverseGeoLocation, error);
    } else {
      //console.log("Geolocation not supported");
    
    }
    // if(navigator?.mediaDevices){
    //   navigator.mediaDevices.getUserMedia({
    //     video : true
    //   })
    // }
   },[])
 

  return (
   <div className=' mb-6 mt-2 bg-[#282c34] grid min-h-screen  justify-center align-center text-center'>
     <Titles showError={showError} currentLevel={currentLevel} location={location} />
    <Matrix sudokuArr={sudokuArr} handleSudoku ={handleSudoku} initialSudoku={initialSudoku} showError={showError} />
      <Actions sudokuArr={sudokuArr} initialSudoku={initialSudoku} setSudokuArr={setSudokuArr} setInitialSudoku={setInitialSudoku} showError={showError} setShowError={setShowError} position={position}  setPosition={setPosition} currentLevel={currentLevel} setCurrentLevel={setCurrentLevel} />
   </div>
  )
}

export default App
