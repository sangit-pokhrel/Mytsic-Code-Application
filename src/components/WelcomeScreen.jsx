import React, { useState } from "react";
import { useGame } from "./GameProvider";

const WelcomeScreen = () => {
  const {
    selectedDifficulty,
    setSelectedDifficulty,
    handleStartGame,
    balance,
    setCurrentFloor,
    setActiveFloor,
    autoPlay,
  } = useGame();
  const [roundsToPlay, setRoundsToPlay] = useState("");
  const [showDifficulty, setShowDifficulty] = useState(false);

  const handleAutoplay = () => {
    if (roundsToPlay === "") {
      alert("Please enter the number of rounds to play.");
      return;
    }

    const rounds = parseInt(roundsToPlay);
    for (let i = 0; i < rounds; i++) {
      if (balance <= 0) {
        setCurrentFloor(1);
        alert("You have no more balance left.");
        break;
      }
      autoPlay();
    }
  };

  const handleEnterRounds = () => {
    setShowDifficulty(true);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card mt-5">
            <div className="card-body">
              <h1 className="card-title">Welcome to Tower Quest!</h1>
              <p className="card-text">
                The goal of the game is to reach the top of the tower by selecting the
                correct box on each floor. If you select a box with a bomb, the game is
                over.
              </p>
              <p className="card-text">
                Each floor has one box with a gem, one box with a bomb, and the rest are
                empty. You can only select one box per floor.
              </p>
              <p className="card-text position-absolute top-0 end-0 mt-3 me-3">
                User Balance: {balance}
              </p>
              <div className="mb-3">
                <label htmlFor="difficulty" className="form-label">Select Difficulty:</label>
                <select
                  id="difficulty"
                  className="form-select"
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
              <button className="btn btn-primary me-2" onClick={handleStartGame}>Start Game</button>
              <hr />
              <div className="mb-3">
                <label htmlFor="rounds" className="form-label">Number of Rounds to Play:</label>
                <input
                  type="number"
                  id="rounds"
                  className="form-control"
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
                <div className="mb-3">
                  <label htmlFor="difficulty" className="form-label">Select Difficulty:</label>
                  <select
                    id="difficulty"
                    className="form-select"
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
              <button className="btn btn-primary" onClick={handleAutoplay}>Start Autoplay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
