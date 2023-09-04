import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import "./Board.css";
import "./Cell.css";

const Board = ({ nrows, ncols, chanceLightStartsOn }) => {
  const [hasWon, setHasWon] = useState(false);
  const [timer, setTimer] = useState(300);
  const [gameStatus, setGameStatus] = useState('playing');

  function createBoard () {
  let board = [];
  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      row.push(Math.random() < chanceLightStartsOn);
    }
    board.push(row);
  }
  return board;
};

const [board, setBoard] = useState(createBoard());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    return formattedTime;
  }

 function flipCellsAround(coord) {
    let newBoard = [...board];
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        newBoard[y][x] = !newBoard[y][x];
      }
    }

    flipCell(y, x); // flip initial cell
    flipCell(y, x - 1); // flip left
    flipCell(y, x + 1); // flip right
    flipCell(y - 1, x); // flip below
    flipCell(y + 1, x); // flip above

    let hasPlayerWon = newBoard.every((row) => row.every((cell) => !cell));;

    setBoard(newBoard);
    setHasWon(hasPlayerWon);
  }

  useEffect(() => {
    if (hasWon) {
      setGameStatus('won');
    } else if (timer === 0) {
      setGameStatus('lost');
    }
  }, [hasWon, timer]);

  const handleRetry = () => {
    setHasWon(false);
    setTimer(300);
    setGameStatus('playing');
  };

  function makeTable() {
  console.log('Entering makeTable()'); // Log that we're entering the function
  console.log('nrows:', nrows); // Log the value of nrows
  console.log('ncols:', ncols); // Log the value of ncols

    let tblBoard = [];
    for (let y = 0; y < nrows; y++) {
      let row = [];
      for (let x = 0; x < ncols; x++) {
        let coord = `${y}-${x}`;
        row.push(
          <Cell
            key={coord}
            isLit={board[y][x]}
            flipCellsAroundMe={() => flipCellsAround(coord)}
            nrows={nrows} // Pass nrows prop
            ncols={ncols} // Pass ncols prop
          />
        );
      }
      tblBoard.push(<tr key={y}>{row}</tr>);
    }
    return (
      <table className="Board">
        <tbody>{tblBoard}</tbody>
      </table>
    );
  }

  return (
    <div>
      {gameStatus === 'playing' && (
        <div>
          <div className='Board-title'>
            <div className='neon-orange'>Lights</div>
            <div className='neon-blue'>Out!</div>
          </div>
          {makeTable()}
          <div className='timer'>
          {formatTime(timer)}
        </div>
        </div>
      )}

      {gameStatus === 'won' && (
        <div>
          <div className='winner'>
            <div className='neon-orange'>You</div>
            <div className='neon-blue'>Won!</div>
          </div>
            <button className="button" onClick={handleRetry}>Retry</button>
        </div>
      )}

      {gameStatus === 'lost' && (
        <div>
          <div className='loser'>
            <div className='neon-orange'>You</div>
            <div className='neon-blue'>Lose!</div>
          </div>
            <button className="button" onClick={handleRetry}>Retry</button>
        </div>
      )}
    </div>
  );
};

export default Board;
