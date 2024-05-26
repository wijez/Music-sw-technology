import React, { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaRegHeart, FaHeart, FaRandom } from "react-icons/fa";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import favoriteService from "../../services/favoriteService";

import "./seekBar.css";
import useLocalStorage from "use-local-storage";

export default function seekBar({ track, randomTrack, previousTrack, nextTrack, user }) {
    const [isRandom, setIsRandom] = useLocalStorage("random", false);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        setIsPlaying(false);
        checkFavorite();
    }, [track]);

    const checkFavorite = async () => {
        try {
            const response = await favoriteService.checkFavorite(track.id);
            setIsFavorite(response.data.is_favorite);
        } catch (error) {
            console.error('Error checking favorite:', error);
        }
    };

    const toggleFavorite = async () => {
        if (isFavorite) {
            try {
                const response = await favoriteService.deleteFavorite(track.id);
                setIsFavorite(false);
            } catch (error) {
                console.error('Error removing favorite:', error);
            }
        } else {
      
            try {
                const response = await favoriteService.addFavorite(track.id);
                setIsFavorite(true);
            } catch (error) {
                console.error('Error adding favorite:', error);
            }
        }
    };

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
                        {isFavorite ? (
                            <FaHeart onClick={toggleFavorite} />
                        ) : (
                            <FaRegHeart onClick={toggleFavorite} />
                        )}
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
