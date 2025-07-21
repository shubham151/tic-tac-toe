import { useState } from "react";

export default function Player({ name, symbol, isActive, onChangeName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  function handleEditClick() {
    setIsEditing((editing) => !editing);
    if (isEditing) onChangeName(symbol, playerName);
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let player = <span className="player-name">{playerName}</span>;
  let buttonCaption = "Edit";
  if (isEditing) {
    player = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
    buttonCaption = "Save";
  }

  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {player}
        <span className="player-symbol">{symbol}</span>
        <button onClick={handleEditClick}>{buttonCaption}</button>
      </span>
    </li>
  );
}
