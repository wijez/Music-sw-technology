import React, {useState} from 'react'
import Cart from '../cart/cart';
import UserDashboard from '../dashboard/userDashboard';


export default function Homeshopping(tracks) {
  const [cart, setCart] = useState([]);

    const addToCart = (track_id) => {
    const selectedTrack = tracks.find((track) => track.id === track_id);
    setCart([...cart, selectedTrack]);
    }
  return (
    <div>
      <div>
      <UserDashboard
                  tracks={tracks}
                  previousTrack={previousTrack}
                  nextTrack={nextTrack}
                  handleCardClick={handleCardClick}
                  addToCart={addToCart}
                />  
      <Cart cart={cart} />  
    </div>
    </div>
  )
}
