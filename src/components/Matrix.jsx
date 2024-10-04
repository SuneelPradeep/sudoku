

const Matrix = ({sudokuArr,handleSudoku,initialSudoku,showError}) => {
  return (
    <table className=" align-center mx-2  mb-16 lg:mb-4 md:mb-8 border-collapse bg-orange-300 border-4 border-orange-300">
        <tbody>
          {[0,1,2,3,4,5,6,7,8].map((row,rindex) =>(
            <tr key={rindex} className={ (row!==0 && (row+1) % 3 ===0) ? `border-b-4 border-black ` : ``} >
                {[0,1,2,3,4,5,6,7,8].map((col,cindex) =>(
                  <td key={cindex + rindex} className={ (col+1)% 3 ===0  ? `border-r-4 border-black` :   ``}>
                      <input onChange={(e)=>handleSudoku(e,row,col)} 
                      value={sudokuArr[row][col] === -1 ? '' : sudokuArr[row][col]} className={`border-2 border-black w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16  outline-none text-lg  text-center p-0 m-0 ${showError.error && showError.row === row && showError.col === col ? 'bg-red-500 font-bold' : ''}` }
                      disabled={initialSudoku[row][col] !== -1} />
                  </td>
                ))}
            </tr>
          )) }
          
        </tbody>
      </table>
  )
}

export default Matrix
