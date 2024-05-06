import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Creating a context to pass the data to mangae the game state efficiently . we can use redux or zustand to manage if there are too many state in the project but for this small project i will use context api to manage the state of the game
const GameContext = createContext();

// Creating a Provider component to wrap your components
export const GameProvider = ({ children }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("normal");
  const [balance, setBalance] = useState(10);
  const [activeFloor, setActiveFloor] = useState(1);
  const [currentFloor, setCurrentFloor] = useState(1);
  const [roundsToPlay, setRoundsToPlay] = useState("");
  const [autoDifficulty, setAutoDifficulty] = useState("");
  const [isRevealed, setIsRevealed] = useState(false);
  const [boxes, setBoxes] = useState([]);

  const navigate = useNavigate();

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

  const startGame = (selectedDifficulty) => {
    // Logic for starting the game
    // it will deduct the coins based on the difficulty level and to make it not reset everytime we either need to store in local storage cache or use api to store permanently . which can be done but thas what i wasnt assigned to do so i will just keep it in state and it will reset everytime we refresh the page 

    switch (selectedDifficulty) {
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
      default:
        break;
    }
  };

  const handleStartGame = () => {
    if (selectedDifficulty === "") {
      alert("Please select a difficulty level");
      return;
    }
    startGame(selectedDifficulty);
    navigate("/game"); 
  };

  const autoPlay = () => {
    if (selectedDifficulty === "") {
      alert("Please select a difficulty level");
      return;
    }
    startGame(selectedDifficulty);
    navigate("/autoplay"); 
  };

  const autoPlayLogic = (index) => {
    // Checking if the game is already revealed
    if (isRevealed) {
      return; 
    }

    const updatedBoxes = [...boxes];

    setIsRevealed(true);

    // Checking if the clicked box is a gem or a bomb and logic accordingly 
    if (updatedBoxes[index] === "gem") {
      toast.success(`Congrats on Moving to Level ${currentFloor + 1}`, {
        autoClose: 2000,
        onClose: () => {
          setCurrentFloor(currentFloor + 1);
        },
      });
    } else if (updatedBoxes[index] === "bomb") {
      toast.error(`Game Over!`, {
        autoClose: 2000,
        onClose: () => {
          setActiveFloor(1);
          setCurrentFloor(1);
        },
      });
    
    }

    // After checking the result, revealing all boxes
    setTimeout(() => {
      setIsRevealed(false);
      const updatedBoxes = [...generateRandomBoxes(selectedDifficulty)];
      setBoxes(updatedBoxes);
    }, 2000);
  };

  const handleBoxClick = (index) => {
    // Check if the game is already revealed
    if (isRevealed) {
      return; // Do nothing if the game is already revealed
    }
    if (currentFloor === 8 || currentFloor == roundsToPlay) {
      toast.success(`Congrats ! You completed The Quest`, {
        autoClose: 3000, // Close the toast after 1 second
        onClose: () => {
          setCurrentFloor(1);

          setActiveFloor(1);
          navigate("/");
        },
      });
    }

    const updatedBoxes = [...boxes];

    setIsRevealed(true);

    // Check if the clicked box is a gem or a bomb
    if (updatedBoxes[index] === "gem") {
      toast.success(
        `Congrats on Moving to Level ${activeFloor + 1 || currentFloor + 1}`,
        {
          autoClose: 2000,
          onClose: () => {
            setActiveFloor(activeFloor + 1);
            setCurrentFloor(currentFloor + 1);
          },
        }
      );
    } else if (updatedBoxes[index] === "bomb") {
      toast.error(`Game Over!`, {
        autoClose: 2000,
        onClose: () => {
          setActiveFloor(1);
          setCurrentFloor(1);
        },
      });
    }

    // After checking the result, reveal all boxes
    setTimeout(() => {
      setIsRevealed(false);
      const updatedBoxes = [...generateRandomBoxes(selectedDifficulty)];
      setBoxes(updatedBoxes);
    }, 2000);
  };

  return (
    <GameContext.Provider
      value={{
        selectedDifficulty,
        setSelectedDifficulty,
        handleStartGame,
        balance,
        setBalance,
        activeFloor,
        setActiveFloor,
        currentFloor,
        setCurrentFloor,
        autoPlay,
        autoPlayLogic,
        handleBoxClick,

        autoDifficulty,
        setAutoDifficulty,
        isRevealed,
        setIsRevealed,
        boxes,
        setBoxes,
        generateRandomBoxes,
        roundsToPlay,
        setRoundsToPlay,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Export a custom hook to use the context in your components
export const useGame = () => {
  return useContext(GameContext);
};
