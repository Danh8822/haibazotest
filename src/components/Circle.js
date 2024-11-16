import React from 'react';

const Circle = ({ id, position, onClick, isClicked, animationDuration, clickTime }) => (
  <div
    onClick={() => onClick(id)}
    style={{
      position: 'absolute',
      ...position,
      width: 50,
      height: 50,
      borderRadius: '50%',
      backgroundColor: isClicked ? 'red' : 'white',
      border: '2px solid black',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      cursor: 'pointer',
      transition: `background-color ${animationDuration}s ease`,
    }}
  >
    <span>{id}</span>
    {clickTime && (
      <span
        style={{
          color: 'white',
          fontSize: '10px',
          marginTop: '2px',
        }}
      >
        {clickTime.toFixed(1)}s
      </span>
    )}
  </div>
);

export default Circle;