import BirdTexture from '../../texture/duck.png'
import BirdRevTexture from '../../texture/duck-rev.png'
import './Bird.css'
import { useEffect, useState } from 'react';

function Bird({ style, setBirds, createNewBird, setScore, score }) {
  const [position, setPosition] = useState({
    top: parseFloat(style.top),
    left: parseFloat(style.left),
    direction: Math.random() > 0.5 ? 'right' : 'left'
  });

  const MOVEMENT_DELAY = 100;
  const SPEED = 2;

  function hit() {
    setScore(score + 1)
    console.log(score)
    setBirds([]);
    createNewBird();
  }

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setPosition(prev => {
        let newLeft = prev.left;
        let newDirection = prev.direction;
        let newTop = prev.top - (Math.random() - 0.5) * SPEED;

        if (prev.direction === 'right') {
          newLeft += SPEED;
          if (newLeft > 95) newDirection = 'left';
        } else {
          newLeft -= SPEED;
          if (newLeft < 5) newDirection = 'right';
        }

        newTop = Math.max(5, Math.min(61, newTop));

        return {
          top: newTop,
          left: newLeft,
          direction: newDirection
        };
      });
    }, MOVEMENT_DELAY);

    return () => clearInterval(moveInterval);
  }, []);

  function getBirdTexture() {
    return position.direction === 'right' ? BirdTexture : BirdRevTexture;
  }

  return (
    <div
      className='bird-container no-select'
      onClick={hit}
      style={{
        ...style,
        top: `${position.top}%`,
        left: `${position.left}%`,
        transition: 'all 0.1s linear'
      }}
    >
      <img className='bird-texture' src={getBirdTexture()} alt="bird" draggable={false}/>
    </div>
  )
}

export default Bird;
