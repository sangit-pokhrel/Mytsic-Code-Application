import React from 'react';

const Modal = ({ message, startNewGame }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{message}</h2>
        <button onClick={startNewGame}>Start New Game</button>
      </div>
    </div>
  );
};

export default Modal;
