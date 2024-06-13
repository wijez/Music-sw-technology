import React from 'react';
import { useCart } from './cartProvide';

const ProductList = ({tracks}) => {
  const { addToCart } = useCart();
  return (
    <div>
      {tracks.map(track => (
        <div key={track.id}>
          <h3>{track.title}</h3>
          <p>{track.artist}</p>
          <button onClick={() => addToCart(track)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
