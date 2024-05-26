import axios from "axios";

import React, { useEffect, useState, useContext } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import AdminDashboard from "./components/dashboard/adminDashboard";
import Crossbar from "./components/track/crossBar";
import UserDashboard from "./components/dashboard/userDashboard";
import SeekBar from "./components/seekBar";
import SearchBar from "./components/searchBar/searchBar";
import LoginForm from "./components/login/loginForm";
import SignUp from "./components/login/signup";
import SongInfo from "./components/track/songInfo";
import SongCard from "./components/track/songCard.jsx"
import ProtectedRoute from "./components/authform/protectRouter";
import Cart from "./components/cart/cart.jsx";
import { UserProvider } from "./components/authform/useProvide.jsx";
import Parent from "./components/cart/parent.jsx";
import Homeshopping from "./components/shopping/home-shopping.jsx";
import { CartProvider } from './components/cart/cartProvide.jsx';
import ProductList from './components/cart/productList.jsx';
export default function App() {
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [userCurrent, setCurrentUser] = useState(null);
  const [cart, setCart] = useState([]);

  const addToCart = (track_id) => {
    const selectedTrack = tracks.find((track) => track.id === track_id);
    setCart([...cart, selectedTrack]);
  };
  


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    // Save user to localStorage
    localStorage.setItem("user", JSON.stringify(user));
  };

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

  if (tracks.length === 0 || userCurrent === undefined) return null; // Conditionally render null if tracks or user is not available

  const handleCardClick = (index) => {
    setCurrentTrackIndex(index);
  };

  const randomTrack = () => {
    const randomIndex = Math.floor(Math.random() * tracks.length);
    setCurrentTrackIndex(randomIndex);
  };
  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <CartProvider>   

    <UserProvider>
      <Router>
        <Crossbar user={userCurrent} onLogout={handleLogout} tracks={tracks}  />

        <SearchBar />
        <div className="App">
          <Routes>
        
            <Route path="/product" element={<ProductList  tracks={tracks}/>} />
            <Route path="/cart" element={<Cart/>}/>
            <Route
              path="/info"
              element={
                <SongInfo
                  track={tracks[currentTrackIndex]}
                  tracks={tracks}
                  handleCardClick={handleCardClick}
                />
              }
            />
            <Route path="/parent" element={<Parent/>}/>
            <Route path="/register" element={<SignUp />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute user={userCurrent}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={<LoginForm onLoginSuccess={handleLogin} />}
            />
           
            <Route
              path="/"
              element={
                <UserDashboard
                  tracks={tracks}
                  previousTrack={previousTrack}
                  nextTrack={nextTrack}
                  handleCardClick={handleCardClick}
                  addToCart={addToCart}
                />  
              }
            />
          <Route path="/cart" element={<Homeshopping tracks={tracks}/>}/>
          </Routes>
         
        </div>
        <SeekBar
          track={tracks[currentTrackIndex]}
          randomTrack={randomTrack}
          previousTrack={previousTrack}
          nextTrack={nextTrack}
        />
      </Router>
    </UserProvider>
    </CartProvider>  
  );
}
