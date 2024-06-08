import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=5, ncols=5, chanceLightStartsOn=0.5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    return Array.from({length: nrows}).map(
        row => Array.from({length: ncols}).map(
            cell => Math.random() < chanceLightStartsOn
        )
    );
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every(row => row.every(cell => !cell))
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [x, y] = coord.split("-").map(Number);
      const flipCell = (x, y, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[x][y] = !boardCopy[x][y];
        }
      };

      const boardCopy = oldBoard.map(row => [...row])

      flipCell(x, y, boardCopy);
      flipCell(x, y - 1, boardCopy);
      flipCell(x, y + 1, boardCopy);
      flipCell(x - 1, y, boardCopy);
      flipCell(x + 1, y, boardCopy);

      return boardCopy
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  
  if (hasWon()){
    return <h2>You won!</h2>
  }

  let tblBoard = [];

  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(
          <Cell
              key={coord}
              isLit={board[y][x]}
              flipCellsAroundMe={evt => flipCellsAround(coord)}
          />,
      );
    }
    tblBoard.push(<tr key={y}>{row}</tr>);
  }

  return (
    <div className="Board">
      <tbody>{tblBoard}</tbody>
    </div>
  )
  // TODO
}

export default Board;
