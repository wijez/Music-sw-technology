import React, { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaRegHeart, FaHeart, FaRandom } from "react-icons/fa";

import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";

import "./seekBar.css";
import useLocalStorage from "use-local-storage";

export default function ({ track, randomTrack, previousTrack, nextTrack }) {
  const [isRandom, setIsRandom] = useLocalStorage("random", false);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
  }, [track]);

  const playPauseHandler = () => {
    if (isPlaying) {
      audioRef?.current.pause();
    } else {
      audioRef?.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <div id="seekBar">
        <div className="song-info">
          <div className="img">
            <img src={track.image} alt={track.title} />
          </div>
          <div className="info">
            <p>{track.title}</p>
            <p>{track.artist}</p>
          </div>
          <div className="heart">
            <FaRegHeart onClick={() => {}} />
          </div>
        </div>
        <audio
          ref={audioRef}
          src={track?.audio_file}
          autoPlay
          onEnded={isRandom ? randomTrack : nextTrack}
        />
        <div className="container">
          <button
            className="random-play"
            onClick={() => setIsRandom(!isRandom)}
          >
            <FaRandom color={isRandom ? "#F00" : ""} />
          </button>
          <button onClick={previousTrack}>
            <IoPlaySkipBack />
          </button>
          <button className="btn-play" onClick={playPauseHandler}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={nextTrack}>
            <IoPlaySkipForward />
          </button>
        </div>
      </div>
    </>
  );
}
