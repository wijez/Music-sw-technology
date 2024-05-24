// import React from 'react'

// export default function Home() {
//   return (
//     <div>Home</div>
//   )
// }
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./home.css";
import AdminDashboard from "../components/dashboard/adminDashboard";
import Crossbar from "../components/track/crossBar";
import UserDashboard from "../components/dashboard/userDashboard";
import SeekBar from "../components/seekBar";
import SearchBar from "../components/searchBar/searchBar";
import LoginForm from "../components/login/loginForm";
import SignUp from "../components/login/signup";

export default function Home() {
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8000/track/tracks/")
      .then((response) => {
        setTracks(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the tracks!", error);
      });
  }, []);

  const previousTrack = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? tracks.length - 1 : prevIndex - 1
    );
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === tracks.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (tracks.length === 0) return null;

  const handleCardClick = (index) => {
    setCurrentTrackIndex(index);
  };

  const randomTrack = () => {
    const randomIndex = Math.floor(Math.random() * tracks.length);
    setCurrentTrackIndex(randomIndex);
  };

  
  return (
    <Router>
      <Crossbar />
      <SearchBar />
      <div className="home">
        <Routes>
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route
            path="/"
            element={
              <UserDashboard
                tracks={tracks}
                previousTrack={previousTrack}
                nextTrack={nextTrack}
                handleCardClick={handleCardClick}
              />
            }
          />
        </Routes>
      </div>
      <SeekBar
        track={tracks[currentTrackIndex]}
        randomTrack={randomTrack}
        previousTrack={previousTrack}
        nextTrack={nextTrack}
      />
    </Router>
  );
}
