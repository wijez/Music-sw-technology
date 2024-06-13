import React, { useState } from 'react';
import axios from 'axios';

const CartAddItemForm = () => {
    const [trackId, setTrackId] = useState('');
    const [quantity, setQuantity] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/cart/add_to_cart/', {
                track_id: trackId,
                quantity: quantity
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Enter Track ID" 
                value={trackId} 
                onChange={(e) => setTrackId(e.target.value)} 
            />
            <input 
                type="number" 
                placeholder="Quantity" 
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)} 
            />
            <button type="submit">Add to Cart</button>
        </form>
    );
};

export default CartAddItemForm;
