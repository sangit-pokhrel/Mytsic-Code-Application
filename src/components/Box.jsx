import React from "react";

const Box = ({ content, handleBoxSelection, isActive }) => {
  const handleClick = () => {
    if (isActive) {
      handleBoxSelection(content);
    }
  };

  return (
    <button
      className={`box ${isActive ? "active" : "disabled"}`}
      onClick={handleClick}
      disabled={!isActive}
    >
      {content === "gem" && (
        <span role="img" aria-label="Gem">
          💎
        </span>
      )}
      {content === "bomb" && (
        <span role="img" aria-label="Bomb">
          💣
        </span>
      )}
      {content === "empty" && <span>-</span>}
    </button>
  );
};

export default Box;
