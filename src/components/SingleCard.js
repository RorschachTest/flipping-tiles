import "./SingleCard.css"

export function SingleCard({ card, handleClick, flipped }) {

  return (
    <div className="card">
      <div className={flipped? "flipped": ""}>
        <img className="front" alt="card front" src={card.src} />
        <img className="back" alt="card back" src="/img/cover.png" onClick={() => handleClick(card)} />
      </div>
    </div>
  )
}