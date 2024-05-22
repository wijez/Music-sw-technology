import React from "react";
import CrossBar from "../track/crossBar";
import SongCard from "../track/songCard";
import "./userDashboard.css";

export default function UserDashboard({ tracks, handleCardClick }) {
  return (
    <>
      <div className="user-dashboard">
        <h1>Music Library</h1>
        <div className="song-list">
          {tracks.map((track, index) => (
            <SongCard
              key={track.id}
              track={track}
              index={index}
              handleCardClick={handleCardClick}
            />
          ))}
        </div>
      </div>
      <CrossBar />
    </>
  );
}
