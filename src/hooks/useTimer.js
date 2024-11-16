import { useEffect, useState } from 'react';

const useTimer = (timerActive, gameOver) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let timer;
    if (timerActive && !gameOver) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 0.1);
      }, 100);
    }
    return () => clearInterval(timer);
  }, [timerActive, gameOver]);

  return time;
};

export default useTimer;