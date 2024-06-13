import React, {useState} from 'react';
import './sum.css';
import { FaPlusCircle } from "react-icons/fa";

export default function Sum({ tracks }) {
  const [showGenres, setShowGenres] = useState(false);
  const totalGenres = tracks.reduce((acc, track) => {
    if (acc.hasOwnProperty(track.genre)) {
      acc[track.genre]++;
    } else {
      acc[track.genre] = 1;
    }
    return acc;
  }, {});

  const toggleShowGenres = () => {
    setShowGenres(!showGenres);
  };
  return (
    <>
      <FaPlusCircle  className="sum-button" onClick={toggleShowGenres} />
      {showGenres && (
        <div className='sum-container'>
          <div>
            <ul>
              {Object.keys(totalGenres).map((genre, index) => (
                <li key={index}>{genre}: {totalGenres[genre]}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
