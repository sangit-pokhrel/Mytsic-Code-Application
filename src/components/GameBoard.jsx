import React, { useState } from 'react';
import Floor from './Floor';
import Controls from './Controls';
import Modal from './Modal';
import { useGame } from './GameProvider';

const GameBoard = () => {
  // All state variables are defined here
  
  const {balance, setBalance} = useGame();
  
  const [remainingRounds, setRemainingRounds] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Define the number of floors and boxes for each floor based on difficulty level
  const difficultyLevels = {
    normal: { floors: 8, boxes: 4 },
    medium: { floors: 8, boxes: 3 },
    hard: { floors: 8, boxes: 3 },
    impossible: { floors: 8, boxes: 4 }
  };

  // Generate initial box contents for each floor based on difficulty level
  const generateBoxContents = (difficulty) => {
    const { boxes } = difficultyLevels[difficulty];
    const boxContents = Array.from({ length: boxes }, (_, index) => {
      if (index === 0) return 'bomb';
      return 'gem';
    });
    return boxContents;
  };

  // Initialize box contents for each floor
  const initialBoxContents = generateBoxContents('normal');
  const [boxContentsByFloor, setBoxContentsByFloor] = useState(Array.from({ length: 8 }, () => initialBoxContents));

  // Logic for handling box selection
  const handleBoxSelection = (boxContent) => {
    // If the game is over, do nothing
    if (gameOver) return;

    // Update player balance based on box content
    if (boxContent === 'gem') {
      setPlayerBalance(balance + 10); // Increase player balance by 10 for selecting a gem
      setCurrentFloor(currentFloor + 1); // Advance to the next floor
    } else if (boxContent === 'bomb') {
      setGameOver(true); // End the game if a bomb is selected
    }

    // Update remaining rounds if auto-play is active
    if (autoPlay && remainingRounds > 0) {
      setRemainingRounds(remainingRounds - 1);
    }
  };

  // Logic for starting a new game
  const startNewGame = () => {
    // Reset game state variables
    setBalance(0);
    setCurrentFloor(1);
    setRemainingRounds(0);
    setAutoPlay(false);
    setGameOver(false);
    // Regenerate initial box contents for each floor
    setBoxContentsByFloor(Array.from({ length: 8 }, () => generateBoxContents('normal')));
  };

  return (
    <div className="game-board">
      {/* Render Floors */}
      {boxContentsByFloor.map((boxContents, index) => (
        <Floor
          key={index}
          floorNumber={index + 1}
          boxes={boxContents}
          handleBoxSelection={handleBoxSelection}
        />
      ))}

      {/* Render Controls */}
      <Controls
        playerBalance={balance}
        currentFloor={currentFloor}
        remainingRounds={remainingRounds}
        autoPlay={autoPlay}
        setAutoPlay={setAutoPlay}
        startNewGame={startNewGame}
      />

      {/* Render Modal */}
      {gameOver && (
        <Modal
          message="Game Over! You hit a bomb."
          startNewGame={startNewGame}
        />
      )}
    </div>
  );
};

export default GameBoard;
