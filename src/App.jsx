import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { useState } from "react";

function getCurrentActivePlayer(gameTurn) {
  let currentActive = "X";
  if (gameTurn.length > 0 && gameTurn[0].player == "X") {
    currentActive = "O";
  }
  return currentActive;
}

function App() {
  const [gameTurn, setGameTurn] = useState([]);
  const activePlayer = getCurrentActivePlayer(gameTurn);
  function handleSelectSquare(row, col) {
    setGameTurn((prevTurn) => {
      const player = getCurrentActivePlayer(prevTurn);
      const updatedTurns = [{ square: { row, col }, player }, ...prevTurn];
      return updatedTurns;
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player1" symbol="X" isActive={activePlayer == "X"} />
          <Player name="Player2" symbol="O" isActive={activePlayer == "O"} />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurn} />
      </div>
      <Log turns={gameTurn} />
    </main>
  );
}

export default App;
