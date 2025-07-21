import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { useState } from "react";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurn, setGameTurn] = useState([]);
  function handleSelectSquare(row, col) {
    setActivePlayer((currentPlayer) => (currentPlayer == "X" ? "O" : "X"));
    setGameTurn((prevTurn) => {
      let currentActive = "X";
      if (prevTurn.length > 0 && prevTurn[0].player == "X") {
        currentActive = "O";
      }

      const updatedTurns = [
        { square: { row, col }, player: currentActive },
        ...prevTurn,
      ];

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
