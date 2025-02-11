import './ScoreBar.css'

function ScoreBar({ score }) {
  return (
    <div className="score-bar">
      <p>Очки: {score}</p> 
    </div>
  )
}

export default ScoreBar;
