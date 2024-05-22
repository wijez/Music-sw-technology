import React, { useState, useEffect } from 'react';
import { getTracks, createTrack, updateTrack, deleteTrack } from '../../services/trackService';
import './trackManagement.css';

export default function TrackManagement() {
    const [tracks, setTracks] = useState([]);
    const [newTrack, setNewTrack] = useState({
        title: '',
        artist: '',
        album: '',
        genre: '',
        audio_file: null,
        image: null,
        favorites: ''
    });
    const [editingTrack, setEditingTrack] = useState(null);

    useEffect(() => {
        fetchTracks();
    }, []);

    const fetchTracks = () => {
        getTracks()
            .then(response => {
                setTracks(response.data);
            })
            .catch(error => {
                console.error('Error fetching tracks:', error);
            });
    };

    const handleDelete = (id) => {
        deleteTrack(id)
            .then(() => {
                setTracks(tracks.filter(track => track.id !== id));
            })
            .catch(error => {
                console.error('Error deleting track:', error);
            });
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setNewTrack({ ...newTrack, [name]: files[0] });
        } else {
            setNewTrack({ ...newTrack, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const trackData = { ...newTrack };
        const apiCall = editingTrack ? updateTrack(editingTrack.id, trackData) : createTrack(trackData);

        apiCall
            .then(response => {
                fetchTracks();
                setNewTrack({
                    title: '',
                    artist: '',
                    album: '',
                    genre: '',
                    audio_file: null,
                    image: null,
                    favorites: '',
                });
                setEditingTrack(null);
                console.log(`Track ${editingTrack ? 'updated' : 'added'} successfully!`);
            })
            .catch(error => {
                console.error(`Error ${editingTrack ? 'updating' : 'adding'} track:`, error);
                if (error.response) {
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                    console.error('Response headers:', error.response.headers);
                }
            });
    };

    const handleEdit = (track) => {
        setNewTrack({
            ...track,
            audio_file: null, // Reset file input
            image: null       // Reset file input
        });
        setEditingTrack(track);
    };

    return (
        <div className="track-management">
            <h2>Manage Tracks</h2>
            <ul>
                {tracks.map(track => (
                    <li key={track.id}>
                        {track.title} - {track.artist}
                        <button onClick={() => handleEdit(track)}>Edit</button>
                        <button onClick={() => handleDelete(track.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h3>{editingTrack ? 'Edit Track' : 'Add New Track'}</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={newTrack.title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="artist"
                    placeholder="Artist"
                    value={newTrack.artist}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="favorites"
                    placeholder="Favorites"
                    value={newTrack.favorites}
                    onChange={handleChange}
                />
                  <input
                    type="text"
                    name="artist"
                    placeholder="Artist"
                    value={newTrack.artist}
                    onChange={handleChange}
                    required
                />
                <select
                    name="genre"
                    value={newTrack.genre}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Genre</option>
                    <option value="RAP">Rap</option>
                    <option value="LOFI">Lofi</option>
                    <option value="CLASSICAL">Classical</option>
                    <option value="INDIE">Indie</option>
                    <option value="SOUL">Soul</option>
                    <option value="REMIX">Remix</option>
                </select>

                <label>
                    Audio File:
                    <input
                        type="file"
                        name="audio_file"
                        onChange={handleChange}
                        required={!editingTrack} // Only required for new tracks
                    />
                </label>
                <label>
                    Image:
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">{editingTrack ? 'Update Track' : 'Add Track'}</button>
            </form>
        </div>
    );
}
