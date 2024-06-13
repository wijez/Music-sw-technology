import React, { useState } from 'react';
import axios from 'axios';

const FavoriteButton = ({ trackId }) => {
    const [isFavorited, setIsFavorited] = useState(false);

    const toggleFavorite = async () => {
        try {
            if (isFavorited) {
                await axios.delete(`/api/favorites/${trackId}/`);
            } else {
                await axios.post('/api/favorites/', { track_id: trackId });
            }
            setIsFavorited(!isFavorited);
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    return (
        <button onClick={toggleFavorite}>
            {isFavorited ? 'Unfavorite' : 'Favorite'}
        </button>
    );
};

export default FavoriteButton;

