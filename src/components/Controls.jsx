import React, { useState } from 'react';

const Controls = ({ playerBalance, startNewGame }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [showPopup, setShowPopup] = useState(true);

  const handleStartGame = () => {
    if (selectedDifficulty === '') {
      alert('Please select a difficulty level');
      return;
    }

    if (!autoPlay && playerBalance < 2) {
      alert('Insufficient balance. Please add more points.');
      return;
    }

    startNewGame(selectedDifficulty);
    setShowPopup(false);
  };

  return (
    <div className="controls">
      <div>
        <label htmlFor="difficulty">Select Difficulty:</label>
        <select
          id="difficulty"
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
        >
          <option value="">-- Select --</option>
          <option value="normal">Normal</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="impossible">Impossible</option>
        </select>
      </div>
      <button onClick={handleStartGame}>Start Game</button>
      {showPopup && (
        <div className="popup">
          <p>Each game will cost 2 points from your balance.</p>
          <button onClick={() => setShowPopup(false)}>OK</button>
        </div>
      )}
    </div>
  );
};

export default Controls;
