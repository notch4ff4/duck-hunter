import Bird from '../Bird/Bird';
import './GameArea.css'
import GameBackground from '../../texture/background.png'
import { useState, useEffect, useRef } from 'react';
import ScoreBar from '../ScoreBar/ScoreBar';
import StatsMenu from '../StatsMenu/StatsMenu';

function GameArea() {
  const [birds, setBirds] = useState([]); // Массив птиц
  const [score, setScore] = useState(0); // Счет
  const [showStats, setShowStats] = useState(false);
  const [gameStats, setGameStats] = useState({ accuracy: 0, minDelay: 0 });
  const isFirstRender = useRef(true); // Первый рендер (нужен из-за особенностей работы useEffect)

  const spawnBird = () => { // Спавн птицы
    const newBird = {
      id: Date.now(),
      top: Math.random() * 66,
      left: Math.random() * 100
    };
    setBirds(prevBirds => [...prevBirds, newBird]);
  }

  const handleRestart = () => { // Перезапуск игры
    setScore(0);
    setShowStats(false);
    setBirds([]);
    spawnBird();

    localStorage.removeItem('lastHitTime');
    localStorage.removeItem('totalShots');
    localStorage.removeItem('totalHits');
    localStorage.removeItem('minDelay');
  };

  const handleShot = (e) => { // Обработка выстрела
    const isBirdHit = e.target.closest('.bird-container'); // Проверяем, куда был клик
    const totalShots = parseInt(localStorage.getItem('totalShots') || '0') + 1;
    localStorage.setItem('totalShots', totalShots.toString());

    if (isBirdHit) { // Если попали в птицу
      const currentTime = Date.now();
      const lastHitTime = localStorage.getItem('lastHitTime');
      const totalHits = parseInt(localStorage.getItem('totalHits') || '0') + 1;

      localStorage.setItem('totalHits', totalHits.toString()); // Обновляем количество попаданий
      localStorage.setItem('lastHitTime', currentTime.toString()); // Обновляем время последнего попадания

      if (lastHitTime) { // Если был хоть один выстрел
        const delay = currentTime - parseInt(lastHitTime); // Вычисляем задержку между выстрелами
        const minDelay = parseInt(localStorage.getItem('minDelay') || '999999'); // Минимальная задержка
        if (delay < minDelay) { // Если задержка меньше минимальной
          localStorage.setItem('minDelay', delay.toString()); // Обновляем минимальную задержку
        }
      }

      setScore(prevScore => { // Обновляем счет
        const newScore = prevScore + 1;
        if (newScore === 20) { // Если счет равен 20
          const accuracy = (totalHits / totalShots) * 100; // Вычисляем точность
          const minDelay = parseInt(localStorage.getItem('minDelay') || '0'); // Минимальная задержка
          setGameStats({ accuracy, minDelay }); // Обновляем статистику
          setShowStats(true); // Показываем статистику
        }
        return newScore; // Возвращаем новый счет
      });

      setBirds([]); // Очищаем массив птиц
      spawnBird(); // Спавним новую птицу
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      spawnBird();
      isFirstRender.current = false;
    }
  }, []);

  return (
    <div className="game-wrapper">
      <div className='game'>
        <div
          className='game-field'
          onClick={handleShot}
          style={{ cursor: `crosshair` }}
        >
          <ScoreBar score={score} />
          <div className='spawn-area'>
            {birds.map(bird => (
              <Bird
                key={bird.id}
                style={{
                  position: 'absolute',
                  top: `${bird.top}%`,
                  left: `${bird.left}%`
                }}
              />
            ))}
          </div>
          {showStats && (
            <StatsMenu
              accuracy={gameStats.accuracy}
              minDelay={gameStats.minDelay}
              onRestart={handleRestart}
            />
          )}
        </div>
        <img className="game-background" src={GameBackground} alt="background" />
      </div>
    </div>
  );
}

export default GameArea;
