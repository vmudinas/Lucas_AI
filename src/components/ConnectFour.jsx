import React, { useState } from 'react';
import '../styles/ConnectFour.css';

function ConnectFour() {
  // Initialize the 6x7 grid (6 rows, 7 columns) with null values
  const [grid, setGrid] = useState(Array(6).fill().map(() => Array(7).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState(1); // Player 1 starts
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  
  // Handle column click
  const handleColumnClick = (columnIndex) => {
    if (gameOver) return; // If game is over, do nothing
    
    // Create a deep copy of the grid
    const newGrid = grid.map(row => [...row]);
    
    // Find the lowest empty cell in the selected column
    let rowIndex = 5; // Start from the bottom row
    while (rowIndex >= 0 && newGrid[rowIndex][columnIndex] !== null) {
      rowIndex--;
    }
    
    // If column is full, do nothing
    if (rowIndex < 0) return;
    
    // Place the disc in the selected cell
    newGrid[rowIndex][columnIndex] = currentPlayer;
    
    // Update the grid
    setGrid(newGrid);
    
    // Check for win
    if (checkForWin(newGrid, rowIndex, columnIndex)) {
      setWinner(currentPlayer);
      setGameOver(true);
      return;
    }
    
    // Check for tie
    if (checkForTie(newGrid)) {
      setGameOver(true);
      return;
    }
    
    // Switch player
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  };
  
  // Reset the game
  const resetGame = () => {
    setGrid(Array(6).fill().map(() => Array(7).fill(null)));
    setCurrentPlayer(1);
    setWinner(null);
    setGameOver(false);
  };
  
  // Check for win
  const checkForWin = (grid, row, col) => {
    const player = grid[row][col];
    
    // Check horizontal
    let count = 0;
    for (let c = 0; c < 7; c++) {
      if (grid[row][c] === player) {
        count++;
        if (count >= 4) return true;
      } else {
        count = 0;
      }
    }
    
    // Check vertical
    count = 0;
    for (let r = 0; r < 6; r++) {
      if (grid[r][col] === player) {
        count++;
        if (count >= 4) return true;
      } else {
        count = 0;
      }
    }
    
    // Check diagonal (top-left to bottom-right)
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        if (
          grid[r][c] === player &&
          grid[r + 1][c + 1] === player &&
          grid[r + 2][c + 2] === player &&
          grid[r + 3][c + 3] === player
        ) {
          return true;
        }
      }
    }
    
    // Check diagonal (bottom-left to top-right)
    for (let r = 3; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        if (
          grid[r][c] === player &&
          grid[r - 1][c + 1] === player &&
          grid[r - 2][c + 2] === player &&
          grid[r - 3][c + 3] === player
        ) {
          return true;
        }
      }
    }
    
    return false;
  };
  
  // Check for tie
  const checkForTie = (grid) => {
    // Check if all cells are filled
    return grid.every(row => row.every(cell => cell !== null));
  };
  
  return (
    <div className="connect-four">
      <div className="game-info">
        {!gameOver ? (
          <div className="player-turn">
            Player {currentPlayer}'s turn
            <div className={`disc player-${currentPlayer}-disc`}></div>
          </div>
        ) : winner ? (
          <div className="winner">
            Player {winner} wins!
            <div className={`disc player-${winner}-disc`}></div>
          </div>
        ) : (
          <div className="tie">It's a tie!</div>
        )}
      </div>
      
      <div className="board">
        {/* Render columns */}
        {[0, 1, 2, 3, 4, 5, 6].map((columnIndex) => (
          <div 
            key={columnIndex} 
            className="column"
            onClick={() => handleColumnClick(columnIndex)}
          >
            {/* Render cells in each column */}
            {[0, 1, 2, 3, 4, 5].map((rowIndex) => (
              <div 
                key={`${rowIndex}-${columnIndex}`} 
                className="cell"
              >
                {grid[rowIndex][columnIndex] && (
                  <div className={`disc player-${grid[rowIndex][columnIndex]}-disc`}></div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <button className="reset-button" onClick={resetGame}>Reset Game</button>
    </div>
  );
}

export default ConnectFour;