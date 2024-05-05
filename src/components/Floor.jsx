import React from 'react';
import Box from './Box';

const Floor = ({ floorNumber, boxes = [], handleBoxSelection }) => {
  return (
    <div className="floor">
      <h2>Floor {floorNumber}</h2>
      <div className="boxes">
        {boxes.map((box, index) => (
          <Box key={index} content={box} handleBoxSelection={handleBoxSelection} />
        ))}
      </div>
    </div>
  );
};

export default Floor;
