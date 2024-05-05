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
    handleBoxClick,
    isRevealed,
    setIsRevealed,
    boxes,
    setBoxes,
    generateRandomBoxes,
  } = useGame();

  const navigate = useNavigate();
  // useEffect(() => {
  //   // Generate random boxes when component mounts or activeFloor changes
  //   if (activeFloor !== null) {
  //     // const randomBoxes = generateRandomBoxes(selectedDifficulty);
  //     setBoxes(randomBoxes);
  //   }
  // }, [activeFloor, selectedDifficulty]);

  const generateBoxes = () => {
    const numFloors = 8;
    const boxes = [];
    for (let i = 1; i <= numFloors; i++) {
      let boxClass;
      if (activeFloor === i) {
        boxClass = "btn-danger";
      } else if (i < activeFloor) {
        boxClass = "btn-success";
      } else {
        boxClass = "btn-secondary disabled";
      }
      boxes.push(
        <button
          key={i}
          className={`btn ${boxClass}`}
          onClick={() => handleFloorSelection(i)}
        >
          Level {i}
        </button>
      );
    }
    return boxes;
  };

  console.log(boxes);

  // const handleBoxClick = (index) => {

  //   // Check if the game is already revealed
  //   if (isRevealed) {
  //     return; // Do nothing if the game is already revealed
  //   }
  //   if (currentFloor === 8){
  //     alert("Congratulations! You won.");
  //     setCurrentFloor(1);
  //     setActiveFloor(1);
  //     navigate("/");

  //   }

  //   const updatedBoxes = [...boxes];

  //   setIsRevealed(true);

  //   // Check if the clicked box is a gem or a bomb
  //   if (updatedBoxes[index] === "gem") {

  //     alert("Congratulations! You won.");
  //     setActiveFloor(activeFloor + 1);
  //     setCurrentFloor(currentFloor + 1);

  //   } else if (updatedBoxes[index] === "bomb") {
  //     alert("Game Over!");
  //     setActiveFloor(1);

  //     // Redirect to another page or handle game over logic
  //   }

  //   // After checking the result, reveal all boxes
  //   setTimeout(() => {
  //     setIsRevealed(false);
  //   const updatedBoxes = [...generateRandomBoxes(selectedDifficulty)];
  //     setBoxes(updatedBoxes);
  //   }, 1000);
  // };

  const handleFloorSelection = (floorNumber) => {
    setActiveFloor(floorNumber);
    const randomBoxes = generateRandomBoxes(selectedDifficulty); // Call generateRandomBoxes only when floor is selected
    setBoxes(randomBoxes);
  };
  return (
    <div className="container-fluid h-100">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="game-page">
            <div className="d-flex flex-column align-items-end p-3">
              <div className="">
                <h6>User Balance: {balance}</h6>
              </div>
              <div>
                <h6>Current Floor: {currentFloor}</h6>
              </div>
            </div>
            <h1>Game Page</h1>
            <p>
              Game Rules: The goal of the game is to reach the top of the tower
              by selecting the correct box on each floor. If you select a box
              with a bomb, the game is over. Each floor has one box with a gem,
              one box with a bomb, and the rest are empty. You can only select
              one box per floor.
            </p>
            <div className="tower align-center justify-center flex-row">
              {generateBoxes()}
            </div>
            <p>Please Click Any Of The Boxes To Move Further</p>
            {/* Render the generated boxes */}
            <div className="box-container d-flex p-5">
              
              {boxes.map((box, index) => (
                <div key={index} onClick={() => handleBoxClick(index)} className="me-5 d-flex justify-content-center align-items-center">
                  {/* Render the box content based on its type */}
                  {!isRevealed ? (
                    <FaBox size={40} />
                  ) : box === "gem" ? (
                    <FaGem size={40}/>
                  ) : (
                    <FaBomb size={40} />
                  )}
                </div>
              ))}
            </div>
            <Link to="/" className="mb-5">
              Home page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
