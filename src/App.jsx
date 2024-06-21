import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import './App.css';

const cardAnimations = [
  { src: '/animations/Animation - 1718959171372.json', matched: false },
  { src: '/animations/Animation - 1718960383057.json', matched: false },
  { src: '/animations/Animation - 1718960466058.json', matched: false },
  { src: '/animations/Animation - 1718960548133.json', matched: false },
  { src: '/animations/Animation - 1718960660787.json', matched: false },
  { src: '/animations/Animation - 1718960711109.json', matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardAnimations, ...cardAnimations]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setShowPopup(false);
  };

  const handleChoice = (card) => {
    if (!choiceOne) {
      setChoiceOne(card);
    } else {
      setChoiceTwo(card);
    }
  };

  useEffect(() => {
    const checkMatch = () => {
      if (choiceOne && choiceTwo) {
        if (choiceOne.src === choiceTwo.src && choiceOne.id !== choiceTwo.id) {
          setCards(prevCards =>
            prevCards.map(c =>
              c.id === choiceOne.id || c.id === choiceTwo.id
                ? { ...c, matched: true }
                : c
            )
          );
        }
        setTimeout(() => {
          setChoiceOne(null);
          setChoiceTwo(null);
        }, 1000);
      }
    };

    checkMatch();
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    const allMatched = cards.every(card => card.matched);
    if (allMatched && cards.length > 0) {
      setShowPopup(true);
      setTimeout(() => {
        shuffleCards();
      }, 3000); // 3 seconds delay before restarting the game
    }
  }, [cards]);

  useEffect(() => {
    const titleElement = document.querySelector('.glow-title');

    if (titleElement) {
      let colorIndex = 0;
      const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#8a2be2'];

      const intervalId = setInterval(() => {
        titleElement.style.color = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
      }, 500); // Change color every 0.5 seconds

      return () => clearInterval(intervalId); 
    }
  }, []);

  return (
    <div className="App">
      <h1 className="glow-title">Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
          />
        ))}
      </div>
      {showPopup && (
        <div className="popup">
          <p className="yay">Yay!</p>
        </div>
      )}
    </div>
  );
}

export default App;
