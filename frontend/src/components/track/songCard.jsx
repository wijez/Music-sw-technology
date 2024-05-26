import React from "react";
import "./songCard.css";
import { useNavigate } from "react-router-dom";

export default function SongCard({ track, index, handleCardClick, addToCart}) {
  const navigate = useNavigate();

  const handleClick = () => {
    handleCardClick(index);
    navigate("/info");
  };
  

  
  return (
      <div className="song-card" onClick={handleClick}>
        <img src={track.image} alt={track.title} className="cover-image" />
        <div className="song-info">
          <h2>{track.title}</h2>
          <p>{track.artist}</p>
        </div>
        <button className="add-to-cart-button" onClick={() => addToCart(track)}>
            Add to Cart
          </button>
      </div>
  );
}
