import './App.css'
import { useCallback, useEffect, useState } from 'react'
import { SingleCard } from './components/SingleCard'

const cardImages = [
  { "src": "/img/helmet-1.png" },
  { "src": "/img/potion-1.png" },
  { "src": "/img/ring-1.png" },
  { "src": "/img/scroll-1.png" },
  { "src": "/img/shield-1.png" },
  { "src": "/img/sword-1.png" },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [firstChoice, setFirstChoice] = useState(null)
  const [secondChoice, setSecondChoice] = useState(null)
  const [disableFlip, setDisableFlip] = useState(false)

  const shuffleCards = useCallback(() => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random(), matched: false, flipped: true }))

    setFirstChoice(null)
    setSecondChoice(null)
    setDisableFlip(false)
    setCards(shuffledCards)
    setTimeout(() => hideAllCards(), 1000)
    setTurns(0)
  }, [])

  const hideAllCards = () => {
    setCards(cards => 
      cards.map((card) => ({ ...card, flipped: false }))
    );
  }

  useEffect(() => {
    shuffleCards()
  }, [shuffleCards])
  
  // handle a choice
  const handleClick = (card) => {
    if (!disableFlip) {
      firstChoice ? setSecondChoice(card): setFirstChoice(card)
    }
  }

  // handle matched
  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisableFlip(true)
      if (firstChoice.src === secondChoice.src) {
        setCards((prevcards) => {
          return prevcards.map((prevcard) => {
            if ((prevcard.id === firstChoice.id) || (prevcard.id === secondChoice.id)) {
              return { ...prevcard, matched: true }
            } 
            else {
              return prevcard
            }
          })
        })
        resetCard()
      }
      else{
        setTimeout(() => resetCard(), 1000)
      }
    }
  }, [firstChoice, secondChoice])

  const resetCard = () => {
    setFirstChoice(null)
    setSecondChoice(null)
    setTurns((turns) => turns + 1)
    setDisableFlip(false)
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div>turns : {turns}</div>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card} 
            handleClick={handleClick}
            flipped={card===firstChoice || card===secondChoice || card.matched || card.flipped }
          />
        ))}
      </div>
    </div>
  );
}

export default App