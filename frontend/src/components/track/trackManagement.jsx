import React, { useState, useEffect } from "react";
import {
  getTracks,
  createTrack,
  updateTrack,
  deleteTrack,
} from "../../services/trackService";
import "./trackManagement.css";

export default function TrackManagement() {
  const [tracks, setTracks] = useState([]);
  const [newTrack, setNewTrack] = useState({
    title: "",
    artist: "",
    album: "",
    release: "",
    genre: "",
    audio_file: null,
    image: null,
    favorites: "",
  });
  const [editingTrack, setEditingTrack] = useState(null);

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = () => {
    getTracks()
      .then((response) => {
        setTracks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tracks:", error);
      });
  };

  const handleDelete = (id) => {
    deleteTrack(id)
      .then(() => {
        setTracks(tracks.filter((track) => track.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting track:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setNewTrack({ ...newTrack, [name]: files[0] });
    } else {
      setNewTrack({ ...newTrack, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trackData = { ...newTrack };
    const apiCall = editingTrack
      ? updateTrack(editingTrack.id, trackData)
      : createTrack(trackData);

    apiCall
      .then((response) => {
        fetchTracks();
        setNewTrack({
          title: "",
          artist: "",
          album: "",
          release: "",
          genre: "",
          audio_file: null,
          image: null,
          favorites: "",
        });
        setEditingTrack(null);
        console.log(
          `Track ${editingTrack ? "updated" : "added"} successfully!`
        );
      })
      .catch((error) => {
        console.error(
          `Error ${editingTrack ? "updating" : "adding"} track:`,
          error
        );
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        }
      });
  };

  const handleEdit = (track) => {
    setNewTrack({
      ...track,
      audio_file: null,
      image: null,
    });
    setEditingTrack(track);
  };

  return (
    <div className="track-management">
      <div className="list">
        <ul className="list-track">
        {tracks.map((track) => (
          <li key={track.id}>
            {track.title} - {track.artist}
            <p>Created at: {track.created_at}</p>
            <p>Last updated at: {track.updated_at}</p>
            <div className="btn-track">
              <button onClick={() => handleEdit(track)}>Edit</button>
              <button onClick={() => handleDelete(track.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      </div>
      <div className="add">
      <h3 className="title-new-track">
        {editingTrack ? "Edit Track" : "Add New Track"}
      </h3>
      <form className="form-admin-track" onSubmit={handleSubmit}>
        <input
          className="form-to-track"
          type="text"
          name="title"
          placeholder="Title"
          value={newTrack.title}
          onChange={handleChange}
          required
        />
        <input
          className="form-to-track"
          type="text"
          name="artist"
          placeholder="Artist"
          value={newTrack.artist}
          onChange={handleChange}
          required
        />

        <input
          className="form-to-track"
          type="text"
          name="album"
          placeholder="Album"
          value={newTrack.album}
          onChange={handleChange}
          required
        />
        <input
          className="form-to-track"
          type="date"
          name="release"
          placeholder="Release"
          value={newTrack.release}
          onChange={handleChange}
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
            className="form-to-track"
            type="file"
            name="audio_file"
            onChange={handleChange}
            required={!editingTrack} 
          />
        </label>
        <label>
          Image:
          <input
            className="form-to-track"
            type="file"
            name="image"
            onChange={handleChange}
          />
        </label>
        <input
          className="form-to-track"
          type="text"
          name="favorites"
          placeholder="Favorites"
          value={newTrack.favorites}
          onChange={handleChange}
        />

        <button type="submit">
          {editingTrack ? "Update Track" : "Add Track"}
        </button>
      </form>
      </div>
    </div>
  );
}
