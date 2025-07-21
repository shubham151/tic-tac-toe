import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combination";

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function getCurrentActivePlayer(gameTurn) {
  let currentActive = "X";
  if (gameTurn.length > 0 && gameTurn[0].player == "X") {
    currentActive = "O";
  }
  return currentActive;
}

function checkWinner(combinations, gameBoard) {
  for (const combination of combinations) {
    const first = gameBoard[combination[0].row][combination[0].col];
    const second = gameBoard[combination[1].row][combination[1].col];
    const third = gameBoard[combination[2].row][combination[2].col];

    if (first && first == second && first == third) {
      return first;
    }
  }

  return;
}

function App() {
  const [players, setPlayers] = useState({ X: "Player 1", O: "Player 2" });
  let gameBoard = [...initialBoard.map((inner) => [...inner])];
  const [gameTurn, setGameTurn] = useState([]);
  const activePlayer = getCurrentActivePlayer(gameTurn);

  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  const winner = checkWinner(WINNING_COMBINATIONS, gameBoard);
  const draw = gameTurn.length == 9;

  function handleSelectSquare(row, col) {
    setGameTurn((prevTurn) => {
      const player = getCurrentActivePlayer(prevTurn);
      const updatedTurns = [{ square: { row, col }, player }, ...prevTurn];
      return updatedTurns;
    });
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  function handleRestart() {
    setGameTurn([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="Player1"
            symbol="X"
            isActive={activePlayer == "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            name="Player2"
            symbol="O"
            isActive={activePlayer == "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || draw) && (
          <GameOver onRestart={handleRestart} winner={players[winner]} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurn} />
    </main>
  );
}

export default App;
