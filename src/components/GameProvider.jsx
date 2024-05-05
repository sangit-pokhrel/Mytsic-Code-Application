import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";


// Create a context
const GameContext = createContext();

// Create a Provider component to wrap your components
export const GameProvider = ({ children }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("normal");
  const [balance, setBalance] = useState(10);
  const [activeFloor, setActiveFloor] = useState(1);
  const [currentFloor, setCurrentFloor] = useState(1);

  const navigate = useNavigate();

  const startGame = (selectedDifficulty) => {
    // Logic for starting the game
    // You can define your game logic here
    console.log(`Starting game with difficulty: ${selectedDifficulty}`);

    switch (selectedDifficulty) {
      case "normal":
        setBalance(balance - 1); // Deduct 1 point for easy difficulty
        break;
      case "medium":
        setBalance(balance - 2); // Deduct 2 points for medium difficulty
        break;
      case "hard":
        setBalance(balance - 3); // Deduct 3 points for hard difficulty
        break;
      case "impossible":
        setBalance(balance - 4); // Deduct 4 points for impossible difficulty
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
    navigate("/game"); // Redirect to the game page
  };


  const autoPlay = () => {
    if (selectedDifficulty === "") {
      alert("Please select a difficulty level");
      return;
    }
    startGame(selectedDifficulty);
    navigate("/autoplay"); // Redirect to the game page
  };

  const autoPlayLogic = (index) => {
    // Check if the game is already revealed
    if (isRevealed) {
      return; // Do nothing if the game is already revealed
    }
  
    const updatedBoxes = [...boxes]; 
  
    setIsRevealed(true);
  
    // Check if the clicked box is a gem or a bomb
    if (updatedBoxes[index] === "gem") {
      alert("Congratulations! You won.");
      setActiveFloor(activeFloor + 1);
      setCurrentFloor(currentFloor + 1);
    } else if (updatedBoxes[index] === "bomb") {
      alert("Game Over!");
      setActiveFloor(1);
      // Redirect to another page or handle game over logic
    }
  
    // After checking the result, reveal all boxes
    setTimeout(() => {
      setIsRevealed(false);
      const updatedBoxes = [...generateRandomBoxes(selectedDifficulty)]; 
      setBoxes(updatedBoxes);
    }, 1000);
  };

  
  const handleBoxClick = (index) => {
    
    // Check if the game is already revealed
    if (isRevealed) {
      return; // Do nothing if the game is already revealed
    }
    if (currentFloor === 8){
      alert("Congratulations! You won.");
      setCurrentFloor(1);
      setActiveFloor(1);
      navigate("/");
      
    }
  
    const updatedBoxes = [...boxes]; 
  
    setIsRevealed(true);
  
    // Check if the clicked box is a gem or a bomb
    if (updatedBoxes[index] === "gem") {
      
      
      alert("Congratulations! You won.");
      setActiveFloor(activeFloor + 1);
      setCurrentFloor(currentFloor + 1);
     

      
      
    } else if (updatedBoxes[index] === "bomb") {
      alert("Game Over!");
      setActiveFloor(1);

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
        handleBoxClick
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
