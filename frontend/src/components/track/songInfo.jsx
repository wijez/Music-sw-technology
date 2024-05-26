import React from "react";
import "./songInfo.css";
import UserDashboard from "../dashboard/userDashboard";

export default function SongInfo({ track, tracks,  handleCardClick }) {
  const handleClick = () => {
    handleCardClick(index);
  };

  return (
    <>
    <UserDashboard tracks={tracks}  handleCardClick={handleCardClick} />
      <div className="song-info-card">
        <img src={track.image} alt={track.title} className="cover-image" />
        <div className="song-info-info"> 
        <label htmlFor="">Song Name: {track.title}</label> 
        <label htmlFor="">Artist: {track.artist}</label>
        <label htmlFor="">Gener: {track.genre}</label>
        <label htmlFor="">Release: {track.release}</label>
        </div>
      </div>
    </>
  );
}
