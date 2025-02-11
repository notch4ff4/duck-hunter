import './StatsMenu.css';
import BoberSeat from '../../texture/bober-seat.png';

function StatsMenu({ accuracy, minDelay, onRestart }) {
  return (
    <div className="stats-overlay">
      <div className="stats-menu">
        <img src={BoberSeat} alt="bober" className="stats-bober" />
        <h2>Игра окончена!</h2>
        <div className="stats-content">
          <p>Точность: {accuracy.toFixed(2)}%</p>
          <p>Самый быстрый выстрел: {minDelay}ms</p>
        </div>
        <button className="restart-button" onClick={onRestart}>
          Играть снова
        </button>
      </div>
    </div>
  );
}

export default StatsMenu;
