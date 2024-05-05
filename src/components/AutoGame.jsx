import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGame } from "./GameProvider";
import { FaBomb, FaBox, FaGem } from "react-icons/fa";

const GamePage = ({ difficulty }) => {
  const {
    balance,
    setBalance,
    activeFloor,
    setActiveFloor,
    selectedDifficulty,
    currentFloor,
    setCurrentFloor,
  } = useGame();
  const [boxes, setBoxes] = useState([]);
  const [isRevealed, setIsRevealed] = useState(false);
  const [autoplayInterval, setAutoplayInterval] = useState(null); // Store the autoplay interval

  const navigate = useNavigate();

  useEffect(() => {
    // Start autoplay when the component mounts
    startAutoplay();
    
    // Cleanup function to stop autoplay when the component unmounts
    return () => {
      stopAutoplay();
    };
  }, []);

  // Function to start autoplay
  const startAutoplay = () => {
    const interval = setInterval(() => {
      // Trigger box click events automatically
      const randomIndex = Math.floor(Math.random() * boxes.length);
      handleBoxClick(randomIndex);
    }, 1000); // Interval time in milliseconds (adjust as needed)

    setAutoplayInterval(interval);
  };

  // Function to stop autoplay
  const stopAutoplay = () => {
    clearInterval(autoplayInterval);
  };

  const generateBoxes = () => {
    const boxes = [];
    for (let i = 1; i < 100; i++) {
      const boxClass =
        activeFloor === i ? "btn-danger" : "btn-secondary disabled";
      boxes.push(
        <button
          key={i}
          className={`btn ${boxClass} me-1`}
          onClick={() => handleFloorSelection(i)}
        >
          Floor {i}
        </button>
      );
    }
    return boxes;
  };

  
  console.log(boxes);
  const generateRandomBoxes = (difficulty) => {
    let numBoxes, numGems, numBombs;

    switch (difficulty) {
      case "normal":
        numBoxes = 4;
        numGems = 3;
        numBombs = 1;
        break;
      case "medium":
        numBoxes = 3;
        numGems = 2;
        numBombs = 1;
        break;
      case "hard":
        numBoxes = 3;
        numGems = 1;
        numBombs = 2;
        break;
      case "impossible":
        numBoxes = 4;
        numGems = 1;
        numBombs = 3;
        break;
      default:
        break;
    }

    const boxes = Array(numBoxes).fill("empty");

    // Place gems randomly
    for (let i = 0; i < numGems; i++) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * numBoxes);
      } while (boxes[randomIndex] !== "empty");
      boxes[randomIndex] = "gem";
    }

    // Place bombs randomly
    for (let i = 0; i < numBombs; i++) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * numBoxes);
      } while (boxes[randomIndex] !== "empty");
      boxes[randomIndex] = "bomb";
    }

    return boxes;
  };


  const handleBoxClick = (index) => {
    // Check if the game is already revealed
    if (isRevealed) {
      return; // Do nothing if the game is already revealed
    }
  

    const updatedBoxes = [...boxes];

    setIsRevealed(true);

    // Check if the clicked box is a gem or a bomb
    if (updatedBoxes[index] === "gem") {
      alert("Congratulations! You won.");

      setCurrentFloor(currentFloor + 1);
    } else if (updatedBoxes[index] === "bomb") {
      alert("Game Over!");

      // Redirect to another page or handle game over logic
    }

    // After checking the result, reveal all boxes
    setTimeout(() => {
      setIsRevealed(false);
      const updatedBoxes = [...generateRandomBoxes(selectedDifficulty)];
      setBoxes(updatedBoxes);
    }, 1000);
  };



  return (
    <div className="container-fluid h-100">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="game-page">
            <h1>User Balance : {balance}</h1>
            <h1>Current Floor : {currentFloor}</h1>

            <h1>Game Page</h1>
            <div className="tower align-center justify-center flex-row">
              {generateBoxes()}
            </div>
            {/* Render the generated boxes */}
            <div className="box-container">
              {boxes.map((box, index) => (
                <div key={index} onClick={() => handleBoxClick(index)}>
                  {/* Render the box content based on its type */}
                  {!isRevealed ? (
                    <FaBox />
                  ) : box === "gem" ? (
                    <FaGem />
                  ) : (
                    <FaBomb />
                  )}
                </div>
              ))}
            </div>
            <Link to="/another-page" className="mb-5">
              Go to Another Page
            </Link>
            <button onClick={stopAutoplay}>Stop Autoplay</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
