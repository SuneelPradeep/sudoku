
export const generateRandomSudoku = () => {
    let grid = Array.from({ length: 9 }, () => Array(9).fill(-1));
    
    const fillGrid = (grid) => {
      // Recursive function to fill the grid
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (grid[i][j] === -1) {
            let numbers = Array.from({ length: 9 }, (_, index) => index + 1).sort(() => Math.random() - 0.5);
            for (let number of numbers) {
              if (isSafe(grid, i, j, number)) {
                grid[i][j] = number;
                if (fillGrid(grid)) {
                  return true;
                }
                grid[i][j] = -1; // Backtrack
              }
            }
            return false;
          }
        }
      }
      return true;
    };
  
    const isSafe = (grid, row, col, num) => {
      // Check if num is not in current row, column and 3x3 box
      for (let x = 0; x < 9; x++) {
        if (grid[row][x] === num || grid[x][col] === num || 
            grid[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + (x % 3)] === num) {
          return false;
        }
      }
      return true;
    };
  
    fillGrid(grid);
    
    // Remove some numbers to create the puzzle
    const removeNumbers = (grid) => {
      let attempts = 50; // Adjust the number of empty cells here
      while (attempts > 0) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        if (grid[row][col] !== -1) {
          grid[row][col] = -1;
          attempts--;
        }
      }
    };
  
    removeNumbers(grid);
    return grid;
  };

 export const firstSudoku = generateRandomSudoku()
 export const getDeepCopy  = (arr)=> { 
        return JSON.parse(JSON.stringify(arr))
      }
   export const sampleSudokuArr = [
      [5, 3, -1, -1, 7, -1, -1, -1, -1],
      [6, -1, -1, 1, 9, 5, -1, -1, -1],
      [-1, 9, 8, -1, -1, -1, -1, 6, -1],
      [8, -1, -1, -1, 6, -1, -1, -1, 3],
      [4, -1, -1, 8, -1, 3, -1, -1, 1],
      [7, -1, -1, -1, 2, -1, -1, -1, 6],
      [-1, 6, -1, -1, -1, -1, 2, 8, -1],
      [-1, -1, -1, 4, 1, 9, -1, -1, 5],
      [-1, -1, -1, -1, 8, -1, -1, 7, 9]
    ];

    // export function encode(str) {
    //   let data = JSON.stringify(str)
    //   return btoa(unescape(encodeURIComponent(data)));
    // }
    
    // // Function to decode from Base64
    // export function decode(encodedStr) {
    //   let data = decodeURIComponent(escape(atob(encodedStr)));
    //   return JSON.parse(data)
    // }
  //  export function encode(str) {
  //     return btoa(String.fromCharCode(...new TextEncoder().encode(str)));
  //   }
    
  //   // Custom Base64 Decoding
  //   export function decode(encodedStr) {
  //     const decodedStr = atob(encodedStr);
  //     return new TextDecoder().decode(new Uint8Array([...decodedStr].map(char => char.charCodeAt(0))));
  //   }
    export const defaultPic =  "data:image/jpeg;base64,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"

    
    // export const currentLevel = localStorage.getItem(('level'))