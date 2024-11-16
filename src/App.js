import React, { useState, useEffect } from 'react';
import Circle from './components/Circle';

function App() {
  const [isButtonPressed, setIsButtonPressed] = useState(null);
  const [circleCount, setCircleCount] = useState(10);
  const [circles, setCircles] = useState([]);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [nextExpected, setNextExpected] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [clickedCircle, setClickedCircle] = useState(null);
  const [circleClickTimes, setCircleClickTimes] = useState({});
  const [autoPlayActive, setAutoPlayActive] = useState(false);
  const [statusMessage, setStatusMessage] = useState("LET'S PLAY");
  const [statusColor, setStatusColor] = useState('black');
  const animationDuration = 0.3;

  useEffect(() => {
    let timer;
    if (timerActive && !gameOver) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 0.1);
      }, 100);
    }
    return () => clearInterval(timer);
  }, [timerActive, gameOver]);

  useEffect(() => {
    if (autoPlayActive && !gameOver && timerActive) {
      const autoPlayTimer = setTimeout(() => {
        if (nextExpected <= circleCount) {
          handleCircleClick(nextExpected);
        }
      }, 500);
      return () => clearTimeout(autoPlayTimer);
    }
  }, [autoPlayActive, nextExpected, timerActive, gameOver]);

  const handleCircleClick = (id) => {
    if (id === nextExpected && !clickedCircle) {
      setClickedCircle(id);
      setCircleClickTimes((prevTimes) => ({
        ...prevTimes,
        [id]: time,
      }));
      setTimeout(() => {
        setCircles((prevCircles) => prevCircles.filter(circle => circle.id !== id));
        setNextExpected((prevNext) => prevNext + 1);
        setClickedCircle(null);
      }, animationDuration * 1000);
    } else if (id !== nextExpected) {
      setGameOver(true);
      setTimerActive(false);
      setStatusMessage('Game Over');
      setStatusColor('red');
      setAutoPlayActive(false);
    }
  };

  const handleButtonClick = (callback, buttonId) => {
    setIsButtonPressed(buttonId);
    setTimeout(() => setIsButtonPressed(null), 200);
    callback();
  };

  const handleRestart = () => {
    const newCircles = Array.from({ length: circleCount }, (_, index) => ({
      id: index + 1,
      position: {
        top: `${Math.random() * 90}%`,
        left: `${Math.random() * 90}%`,
      },
    })).sort((a, b) => b.id - a.id);

    setCircles(newCircles);
    setTime(0);
    setNextExpected(1);
    setGameOver(false);
    setClickedCircle(null);
    setCircleClickTimes({});
    setTimerActive(true);
    setStatusMessage("LET'S PLAY");
    setStatusColor('black');
    setAutoPlayActive(false);
  };

  useEffect(() => {
    if (circles.length === 0 && !gameOver && timerActive) {
      setTimerActive(false);
      setStatusMessage('ALL CLEARED');
      setStatusColor('green');
      setAutoPlayActive(false);
    }
  }, [circles, gameOver, timerActive]);

  const toggleAutoPlay = () => {
    setAutoPlayActive((prev) => !prev);
  };

  return (
    <div style={{
      padding: 20,
      textAlign: 'center',
      border: '2px solid #333',
      borderRadius: '15px',
      maxWidth: 460,
      maxHeight: 670,
      margin: '2px auto',
      backgroundColor: '#eaeaea',
    }}>
      <h2 style={{ color: statusColor }}>
        {statusMessage}
      </h2>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '10px',
        margin: '0 auto 20px',
        maxWidth: 450,
      }}>
        <div>
          Points:
          <input
            type="number"
            value={circleCount}
            onChange={(e) => setCircleCount(Number(e.target.value))}
            style={{ marginLeft: 30, width: 100 }}
          />
        </div>
        <div>
          Time: <span style={{ marginLeft: '30px' }}>{time.toFixed(1)}s</span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            style={{
              width: 80,
              backgroundColor: isButtonPressed === 'restart' ? '#d3d3d3' : 'white',
              cursor: 'pointer',
              border: '1px solid black',
              transition: 'background-color 0.2s ease',
            }}
            onClick={() => handleButtonClick(handleRestart, 'restart')}
          >
            {circles.length === 0 ? 'Start' : 'Restart'}
          </button>
          {timerActive && (
            <button
              style={{
                width: 110,
                backgroundColor: isButtonPressed === 'autoPlay' ? '#d3d3d3' : 'white',
                cursor: 'pointer',
                border: '1px solid black',
                transition: 'background-color 0.2s ease',
              }}
              onClick={() => handleButtonClick(toggleAutoPlay, 'autoPlay')}
            >
              {autoPlayActive ? 'Auto Play OFF' : 'Auto Play ON'}
            </button>
          )}
        </div>
      </div>
      <div
        style={{
          position: 'relative',
          width: 450,
          height: 500,
          border: '3px solid #333',
          borderRadius: '10px',
          margin: '20px auto',
          backgroundColor: '#f8f8f8',
        }}
      >
        {circles.map(circle => (
          <Circle
            key={circle.id}
            {...circle}
            onClick={handleCircleClick}
            isClicked={clickedCircle === circle.id}
            animationDuration={animationDuration}
            clickTime={circleClickTimes[circle.id]}
          />
        ))}
      </div>
    </div>
  );
}

export default App;



