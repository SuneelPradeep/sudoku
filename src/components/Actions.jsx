import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {firstSudoku, generateRandomSudoku, getDeepCopy } from '../utils/generateRandomSudoku'

const Actions = ({currentLevel,setCurrentLevel,position,setPosition,showError,setShowError, sudokuArr,setSudokuArr,setInitialSudoku,initialSudoku}) => {
  // //console.log('the position is',position)
  // //console.log('the showerro is',showError);
  
  
  const solver = (grid,row=0,col=0)=>{
    // //console.log('grid before solving',grid);
    
    // if current cell is already filled move ahead
    if(grid[row][col] !== -1){   
      let isLast = row>=8 && col>=8;
      if(!isLast){
      let [newRow,newCol] = getNext(row,col)
      return solver(grid,newRow,newCol)
      }
    }
  
    //in all numbers checking valid accordingly with the num then getting next row and col and recursive function
     for(let num=1;num<=9;num++){
      if(checkValid(grid,row,col,num)){
        // //console.log('insolver checkingvalid',[row,col],num,'grid row col is',grid[row][col],'check row is ',grid[row].indexOf(num),'check col is ', grid.map(row=>row[col]).indexOf(num),'changed grid is ',grid);
    
        grid[row][col] = num
        // get next row,col and repeate function 
        let [newRow,newCol] = getNext(row,col)
        if(!newRow && !newCol){
          return {solved :true ,grid : grid} ;
        }
        if(solver(grid,newRow,newCol)) {
          return {solved :true ,grid : grid} ;
        }  
      }
     }
  
     // //console.log('the final grid is',grid);
     
     // if its invalid fill with -1
     grid[row][col] = -1
     return false;
    
   }

  const getNext = (row,col)=>{
    // while col checks till 8 if exceeding 8 then adds 1 to row
    //if row reaches 8 and col reaches 8 next is [0,0]
    // if col doesnt reach 8 it increases col num
  return col !==8 ? [row,col+1] : row !==8 ?  [row+1,0]:[0,0]
  }
 
 const checkRow = (grid,row,num) => {
  // checks is number unique in  row or not 
  return grid[row].indexOf(num) === -1
}

const checkCol = (grid,col,num) =>{
  //checks unique col number by looping grid and finding col arr then finding indexOf any number missing
 return grid.map(row => row[col]).indexOf(num) === -1
}

const checkBox = (grid,row,col,num) =>{
  // gets start index of box 
  let boxArr = []
  let startRow = row - row%3
  let startCol = col - col%3;
  //running through loop to get the box values pushed to an array to find unique of them
  
  for(let i=0;i<3;i++){
    for(let j=0;j<3;j++){
      boxArr.push(grid[startRow +i][startCol + j])
    }
  }
  //checking box for unique values 
 return  boxArr.indexOf(num) === -1
}
const checkValid = (grid,row,col,num)=>{
  // if all variants true then we can move head 
  // num to be unique in row,col and 3x3 
  
    if(checkRow(grid,row,num) && checkCol(grid,col,num) && checkBox(grid,row,col,num)){
      return true
    }
    return false;
}

// const handleSolve = ()=>{
  
//   let grid = getDeepCopy(solvedGrid)
//   setSudokuArr(grid)
//   handleCheck()
//   setShowError({text : 'Congratulations!!! ', color :'text-green-500',error:false,row:position.row , col : position.col})     
//   setTimeout(()=>{
//     handleNewGame()
      
//    },2000)
   
//  }

const handleHint = () => {

  let current = [...sudokuArr]; let initial = [...initialSudoku]
  //console.log('in here the current initial is ',current,initial);
  
  let solved = solvedGrid;
  let res = {
    isComplete: false,
    isSolvable: true,
    value: '',
    hintRow: -1,
    hintCol: -1,
  };

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      // Check if the current cell is empty 
      if (current[i][j] === -1) {
     // If the solved grid has a value in the same position (no need but we did)
        if (solved[i][j] !== -1) {
          res.value = solved[i][j];
          res.hintRow = i;
          res.hintCol = j;

          // //console.log('the res in hint is',res, [res.hintRow,res.hintCol],res.value);
          
          // Update the copied array with the hint value
          current[i][j] = res.value;

          // You can now update the state
          //console.log('in here bro ',current,initial);
          
          setSudokuArr(current); // Update the state with the new grid
          setInitialSudoku(initial)
          //console.log('in here the current initial is222222222222 ',current,initial);
          return res; // Return the hint as soon as it's found
        }
      }
    }
  }
  handleCheck()
  return res; 
};

 const refereshData = ()=>{
 // setShowError({text : '',error:false,color:'text-blue-400',row:'',col:''}) 
   
  let nextLevel = currentLevel?.level  ||  1;
  localStorage.setItem('level',nextLevel+1)
  setCurrentLevel({level : nextLevel + 1, completed : false})

 }
 const handleNewGame = ()=>{
  let data = generateRandomSudoku();
  let newData = getDeepCopy(data)
  setSudokuArr(getDeepCopy(newData))
  setInitialSudoku(getDeepCopy(newData))
  setShowError({text : '',error:false,color:'text-blue-400',row:'',col:''}) 
    
  // setSolvedGrid(solver(newData)?.grid)
  refereshData()
 }
 const handleReset = ()=>{
  let oldData = getDeepCopy(initialSudoku)
     setSudokuArr(oldData)
 }
 const compareSudoku = (current,solved)=>{
  let res = { isComplete : true, isSolvable : true}

        for(let i=0;i<9;i++){
          for (let j = 0; j < 9; j++) {
            if(parseInt(current[i][j]) !== parseInt(solved[i][j])){
              
              if(parseInt(current[i][j]) !== -1){
                res.isSolvable = false;
              }
              res.isComplete = false;
            }
           
          }}
        
        return res;
 }
 const handleCheck = ()=>{
      let data = solvedGrid;
      // //console.log('the solved grid and others',solvedGrid,sudokuArr,initialSudoku,firstSudoku);
 
      let compare = compareSudoku (sudokuArr,data)
      //console.log('the compare is ',compare,data,sudokuArr,initialSudoku);
      
      if(compare.isComplete){
        setShowError({text : 'Congratulations !!! ', color :'text-green-500',error:false,row:position.row , col : position.col})
       setTimeout(()=>{
        handleNewGame()
       },2500)
        // refereshData()
      }
      else if(compare.isSolvable ){
        setShowError({text : 'You are in a correct path,keep solving' , color :'text-blue-200',error:false,row:position.row , col : position.col})
      }

      else if( !compare.isSolvable && showError?.text === '' || (JSON.stringify(initialSudoku) === JSON.stringify(sudokuArr))){
         setShowError({text :'',error:false,color:'text-blue-200',row:position.row , col : position.col})
      }
      else{
        setShowError({text :'You are in wrong path!!! Remove the last entry !!! ', color :'text-red-500',error:true,row:position.row , col : position.col})
      }
 }
 
//  const [ solvedGrid,setSolvedGrid] = useState(solver(getDeepCopy(initialSudoku))?.grid || initialSudoku )

   const solvedGrid = useMemo(()=>{
    let copyInitial = getDeepCopy(initialSudoku)
    const data = solver(getDeepCopy(copyInitial))
      return data?.grid
   },[initialSudoku]) 
// //console.log('the solved grid and others',solvedGrid,sudokuArr,initialSudoku,firstSudoku);
 
    
    useEffect(() => {
     // //console.log('here in useEffect 1 ');
      
      // if(position?.started){
      //  //console.log('here in useEffect 2222 ');
      
       // setPosition({row : position.row, col : position.col, started:false})
        
      // } 
      handleCheck();
    }, [sudokuArr]);

  return (

    <div className="grid grid-flow-col gap-4">
        <div className="w-fill h-16 text-white bg-orange-400 p-4 rounded-3xl hover:scale-105  hover:-translate-x-4 ease-in-out "onClick={handleCheck}  > Check</div>
      <div className="w-fill h-16 text-white bg-green-500 p-4 rounded-3xl hover:rotate-180 ease-in-out "onClick={handleHint} > Hint</div>
      <div className="w-fill h-16 text-white bg-red-500 p-4 rounded-3xl hover:scale-105 ease-in-out "onClick={handleReset}  > Reset</div>
      <button className={`w-fill h-16 text-white  p-4 rounded-3xl hover:scale-105  ease-in-out ${!currentLevel?.completed ? 'bg-gray-400' : 'bg-violet-500'}`} onClick={handleNewGame} disabled={!currentLevel?.completed}  > Next Level</button>      
      {/* <div className="w-fill h-16 text-white bg-violet-500 p-4 rounded-3xl hover:scale-110  ease-in-out "onClick={handleSolve}  > Solve</div>       */}
      
      </div>
  )
}

export default Actions
