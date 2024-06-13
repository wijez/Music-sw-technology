// import React from 'react';
// import { useCart } from './cartProvide';

// const Cart = () => {
//   const { cart } = useCart();
//   console.log("cart", cart)
//   const totalTracks = cart.length;

//   const tracksByName = cart.reduce((counts, item) => {
//     counts[item.title] = (counts[item.title] || 0) + 1;
//     return counts;
//   }, {});
//   // const totalTracks = cart.reduce((total, item) => total + 1, 0);


//   return (
//     <>
//     <div id='cart-content'>
//     <div className='cart-container'>
//     <h2 className='cart-title'>Cart</h2>
//       {/* {cart.length > 0 ? (

//         <>
//         <p>Total tracks in cart: {totalTracks}</p>
//           <ul className='cart-list'>
//           {cart.map((item, index) => (
//             <li className='cart-member' key={index}>
//               {item.title} by {item.artist}
//             </li>
//           ))}
//         </ul>
//       </> */}
//       {totalTracks > 0 ? (
//         <>
//           <p>Total tracks in cart: {totalTracks}</p>
//           <ul className='cart-list'>
//             {Object.keys(tracksByName).map((trackName, index) => (
//               <li className='cart-member' key={index}>
//                 {trackName} ({tracksByName[trackName]})
//               </li>
//             ))}
//           </ul>
//         </>
//       ) : (
//         <p>Your cart is empty.</p>
//       )}
//     </div>
//     </div>
//     </>
//   );
// };

// export default Cart;

import React from 'react';
import { useCart } from './cartProvide';

const Cart = () => {
  const { cart } = useCart();
  console.log("cart", cart);
  const totalTracks = cart.length;

  const tracksByName = cart.reduce((counts, item) => {
    counts[item.title] = (counts[item.title] || 0) + 1;
    return counts;
  }, {});

  return (
    <>
      <div id='cart-content'>
        <div className='cart-container'>
          <h2 className='cart-title'>Cart</h2>
          {totalTracks > 0 ? (
            <>
              <p>Total tracks in cart: {totalTracks}</p>
              <ul className='cart-list'>
                {cart.map((item, index) => (
                  <li className='cart-member' key={index}>
                    {item.title} by {item.artist} <br/>
                    {item.money} <br />
                    {item.release} <br/>
                    Added at: {new Date(item.addedAt).toLocaleString()}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;

