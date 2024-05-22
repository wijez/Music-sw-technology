import React, { useState } from 'react';
import axios from 'axios';
import './searchBar.css'

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8000/track/search/`, { params: { q: query } });
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div className='search-container'>
            <form onSubmit={handleSearch}>
                <input className='input-search'
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                />
                <button className='btn-search' type="submit">Search</button>
            </form>
            <ul>
                {results.map((track) => (
                    <li key={track.title}>{track.artist}: {track.album}: {track.title}</li>
                ))}
            </ul>
        </div>
    );
}


