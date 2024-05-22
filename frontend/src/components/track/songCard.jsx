import React from "react";
import "./songCard.css";

export default function SongCard({ track, index, handleCardClick }) {
  const handleClick = () => {
    handleCardClick(index);
    console.log(index);
  };

  return (
    <div className="song-card" onClick={handleClick}>
      <img  src={track.image} alt={track.title} className="cover-image" />
      <div className="song-info">
        <h2>{track.title}</h2>
        <p>{track.artist}</p>
      </div>
    </div>
  );
}
