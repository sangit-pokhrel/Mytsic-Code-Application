import React from "react";
import { useState } from "react";
import { useGame } from "./GameProvider";

const WelcomeScreen = () => {
  const {
    selectedDifficulty,
    setSelectedDifficulty,
    handleStartGame,
    balance,
    setBalance,
    activeFloor,
    setActiveFloor,
    setCurrentFloor,
    currentFloor,
    autoPlay
  } = useGame();
  const [roundsToPlay, setRoundsToPlay] = useState("");
  const [showDifficulty, setShowDifficulty] = useState(false);

  switch (balance <= 0) {
    case "normal":
      setBalance(balance - 1);
      break;
    case "medium":
      setBalance(balance - 2);
      break;
    case "hard":
      setBalance(balance - 3);
      break;
    case "impossible":
      setBalance(balance - 4);
      break;
  }

  useState(() => {
    if (balance <= 0) {
      alert("You have no more balance left");
    }
    setCurrentFloor(1);
    setActiveFloor(1);
  }, [balance]);

  const handleAutoplay = () => {
    if (roundsToPlay === "") {
      // If no rounds are specified, consider infinite rounds
      autoPlay();
      
    } else {
      // Autoplay for the specified number of rounds
      const rounds = parseInt(roundsToPlay);
      for (let i = 0; i < rounds; i++) {
        if (balance <= 0) {
          // Reset the floor if the balance is insufficient
          setCurrentFloor(1);
          break;
        }
        autoPlay();
      }
    }
  };

  const handleEnterRounds = () => {
    setShowDifficulty(true);
  };

  return (
    <div className="welcome-screen">
      <h1>Welcome to Tower Quest!</h1>
      <p>
        The goal of the game is to reach the top of the tower by selecting the
        correct box on each floor. If you select a box with a bomb, the game is
        over.
      </p>
      <p>
        Each floor has one box with a gem, one box with a bomb, and the rest are
        empty. You can only select one box per floor.
      </p>
      <p>You can start the game by selecting a difficulty level below.</p>
      User Balance : {balance}
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
      <hr></hr>
      <div>
        <label htmlFor="rounds">Number of Rounds to Play:</label>
        <input
          type="number"
          id="rounds"
          value={roundsToPlay}
          onChange={(e) => {
            setRoundsToPlay(e.target.value);
            if (e.target.value !== "") {
              handleEnterRounds();
            } else {
              setShowDifficulty(false); 
            }
          }}
        />
      </div>
      {showDifficulty && (
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
      )}
      <button onClick={handleAutoplay}>Start Autoplay</button>
    </div>
  );
};

export default WelcomeScreen;
