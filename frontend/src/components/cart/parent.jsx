import React, { useState } from "react";
import SongCard from "../track/songCard";
import Cart from "./cart"; 

export default function Parent() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (track) => {
 
    setCart([...cart, track]);
  };

  return (
    <div>
    <div className="song-list">
      {tracks.map((track) => (
        <SongCard key={track.id} track={track} handleAddToCart={handleAddToCart} />
      ))}
    </div>
    <div className="cart">
      <Cart cart={cart} />
    </div>
  </div>
  );
}
