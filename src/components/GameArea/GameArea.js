import Bird from '../Bird/Bird';
import './GameArea.css'
import GameBackground from '../../texture/background.png'
import { useState, useEffect, useRef } from 'react';
import ScoreBar from '../ScoreBar/ScoreBar';

function GameArea() {
  const [birds, setBirds] = useState([]);
  const [score, setScore] = useState(0);
  const isFirstRender = useRef(true);

  const spawnBird = () => {
    const newBird = {
      id: Date.now(),
      top: Math.random() * 66,
      left: Math.random() * 100
    };
    setBirds(prevBirds => [...prevBirds, newBird]);
  }

  useEffect(() => {
    if (isFirstRender.current) {
      spawnBird();
      isFirstRender.current = false;
    }
  }, []);

  return (
    <div>
      <div className='game'>
        <div className='game-field'>
          <div className='spawn-area'>
            {birds.map(bird => (
              <Bird
                setBirds={setBirds}
                createNewBird={spawnBird}
                setScore={setScore}
                score={score}
                key={bird.id}
                style={{
                  position: 'absolute',
                  top: `${bird.top}%`,
                  left: `${bird.left}%`
                }}
              />
            ))}
          </div>
        </div>
        <img className="game-background" src={GameBackground} alt="background" />
      </div>
    </div>
  )
}

export default GameArea;
