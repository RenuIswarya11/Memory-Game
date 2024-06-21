import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import './Card.css';

const cardBackAnimationUrl = '/animations/Animation - 1718963252701.json'; // Update with your actual animation URL

function Card({ card, handleChoice, flipped }) {
  const handleClick = () => {
    handleChoice(card);
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className={flipped ? 'flipped' : ''}>
        {flipped ? (
          <Player
            autoplay
            loop
            src={card.src} // Front side animation
            className="animation"
          />
        ) : (
          <Player
            autoplay
            loop
            src={cardBackAnimationUrl} // Back side animation
            className="animation"
          />
        )}
      </div>
    </div>
  );
}

export default Card;
